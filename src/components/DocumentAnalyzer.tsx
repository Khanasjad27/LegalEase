import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Shield, AlertCircle, Lightbulb, Sparkles, Loader2, Upload, Send, X, MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface DocumentResult {
  documentType: string;
  summary: string;
  keyTerms: { term: string; explanation: string }[];
  obligations: string[];
  rights: string[];
  concerns: string[];
  questions: string[];
  recommendation: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const DocumentAnalyzer = () => {
  const [documentText, setDocumentText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<DocumentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t("upload.fileTooLarge"),
        description: t("upload.fileTooLargeDesc"),
        variant: "destructive"
      });
      return;
    }

    // Check file type
    const allowedTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const isTextFile = file.name.endsWith('.txt') || file.type === 'text/plain';
    
    if (!isTextFile && !allowedTypes.includes(file.type)) {
      toast({
        title: t("upload.invalidFile"),
        description: t("upload.invalidFileDesc"),
        variant: "destructive"
      });
      return;
    }

    setFileName(file.name);

    // For text files, read directly
    if (isTextFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setDocumentText(text);
      };
      reader.readAsText(file);
    } else {
      // Try to auto-extract text from PDF/DOCX. If extraction fails, ask user to paste.
      try {
        const lower = file.name.toLowerCase();
        let extracted = "";
        if (lower.endsWith('.pdf') || file.type === 'application/pdf') {
          extracted = await tryExtractPdf(file);
        } else if (lower.endsWith('.docx') || lower.endsWith('.doc')) {
          extracted = await tryExtractDocx(file);
        }

        if (extracted && extracted.trim().length > 20) {
          setDocumentText(extracted);
          toast({ title: t("upload.extracted"), description: t("upload.extractedDesc") });
        } else {
          toast({ title: t("upload.pdfNotice"), description: t("upload.pdfNoticeDesc") });
        }
      } catch (err) {
        console.error('Auto-extract failed:', err);
        toast({ title: t("upload.pdfNotice"), description: t("upload.pdfNoticeDesc") });
      }
    }
  };

  // Attempt to extract text from a PDF using pdfjs-dist (dynamically imported).
  const tryExtractPdf = async (file: File) => {
    try {

      // Import pdfjs in a way that avoids Vite's static import analysis.
      // Build the path at runtime and use the `@vite-ignore` hint so the dev server
      // doesn't try to resolve it during build. If local import fails, fall back
      // to a CDN-hosted ES module.
      let pdfjsLib: any;
      try {
        // @ts-ignore
        pdfjsLib = await import(/* @vite-ignore */ ('pdfjs' + '-dist') + '/legacy/build/pdf.js');
      } catch (localErr) {
        console.warn('Local pdfjs import failed, falling back to CDN module', localErr);
        // Try CDN fallback
        // @ts-ignore
        pdfjsLib = await import(/* @vite-ignore */ 'https://unpkg.com/pdfjs-dist@3.9.179/legacy/build/pdf.js');
      }

      // Configure worker in a bundler-friendly way; prefer a local worker if available,
      // otherwise use the CDN worker.
      try {
        // @ts-ignore
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();
      } catch (e) {
        // Fallback to CDN
        // @ts-ignore
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        // @ts-ignore
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((it: any) => it.str).join(' ');
        fullText += '\n\n' + pageText;
      }
      return fullText;
    } catch (e) {
      console.error('PDF extract error:', e);
      // Re-throw so caller falls back to paste instruction
      throw e;
    }
  };

  // Attempt to extract text from DOCX using mammoth (dynamically imported).
  const tryExtractDocx = async (file: File) => {
    try {
      const mammoth = await import('mammoth');
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value || '';
    } catch (e) {
      console.error('DOCX extract error:', e);
      throw e;
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) {
      toast({
        title: t("upload.enterDocument"),
        description: t("upload.enterDocumentDesc"),
        variant: "destructive"
      });
      return;
    }

    if (documentText.length < 50) {
      toast({
        title: t("upload.tooShort"),
        description: t("upload.tooShortDesc"),
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setShowChat(false);
    setChatMessages([]);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-legal', {
        body: { type: 'document', content: documentText }
      });

      if (error) throw error;
      
      if (data.error) {
        toast({
          title: t("upload.analysisError"),
          description: data.error,
          variant: "destructive"
        });
        return;
      }

      setAnalysisResult(data.result);
    } catch (error) {
      console.error('Document analysis error:', error);
      toast({
        title: t("upload.error"),
        description: t("upload.errorDesc"),
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartChat = () => {
    setShowChat(true);
    setChatMessages([{
      role: "assistant",
      content: t("upload.chatWelcome")
    }]);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isSending) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsSending(true);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-legal', {
        body: { 
          type: 'document-chat', 
          content: userMessage,
          documentContext: documentText,
          analysisContext: analysisResult
        }
      });

      if (error) throw error;

      if (data.error) {
        toast({
          title: t("upload.chatError"),
          description: data.error,
          variant: "destructive"
        });
        return;
      }

      setChatMessages(prev => [...prev, { role: "assistant", content: data.result }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: t("upload.error"),
        description: t("upload.errorDesc"),
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleClearDocument = () => {
    setDocumentText("");
    setFileName(null);
    setAnalysisResult(null);
    setShowChat(false);
    setChatMessages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBackToAnalysis = () => {
    setShowChat(false);
  };

  // Chat view
  if (showChat && analysisResult) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleBackToAnalysis} className="text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("upload.backToAnalysis")}
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
              {fileName || t("upload.documentLoaded")}
            </span>
          </div>
        </div>

        <div className="bg-secondary/30 rounded-xl p-4 border border-border h-[400px] overflow-y-auto">
          <div className="space-y-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-background border border-border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-background border border-border rounded-2xl px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={t("upload.askAboutDocument")}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            disabled={isSending}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isSending || !chatInput.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">{t("upload.title")}</h3>
          <Sparkles className="w-6 h-6 text-accent" />
        </div>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          {t("upload.description")}
        </p>
      </div>

      <div className="bg-teal-soft/50 rounded-xl p-5 border border-teal/20">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-accent mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-foreground font-medium mb-1">{t("upload.disclaimer")}</p>
            <p className="text-xs text-muted-foreground">
              {t("upload.disclaimerDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* File Upload Area */}
      <div 
        className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-base font-medium text-foreground">{t("upload.uploadFile")}</p>
        <p className="text-sm text-muted-foreground mt-1">{t("upload.supportedFormats")}</p>
        {fileName && (
          <div className="mt-4 flex items-center justify-center gap-2 text-accent">
            <FileText className="w-5 h-5" />
            <span className="text-base">{fileName}</span>
            <button onClick={(e) => { e.stopPropagation(); handleClearDocument(); }}>
              <X className="w-5 h-5 hover:text-destructive" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground">{t("upload.orPaste")}</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Textarea
        placeholder={t("upload.placeholder")}
        value={documentText}
        onChange={(e) => setDocumentText(e.target.value)}
        className="min-h-[200px] text-base md:text-lg rounded-xl border-2 border-border focus:border-accent resize-none"
      />

      <Button 
        variant="accent" 
        size="lg" 
        className="w-full h-14 text-base md:text-lg"
        onClick={handleAnalyze}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t("upload.analyzing")}
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            {t("upload.analyze")}
          </>
        )}
      </Button>

      {/* Document Analysis Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-teal-soft/50 rounded-2xl p-6 md:p-8 border border-teal/20 space-y-6"
          >
            {/* Header */}
            <div className="flex items-start gap-3">
              <FileText className="w-7 h-7 text-accent mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground text-xl">{analysisResult.documentType}</h4>
                <p className="text-base text-muted-foreground mt-2">{analysisResult.summary}</p>
              </div>
            </div>

            {/* Two Column Layout for Large Screens */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-5">
                {analysisResult.keyTerms && analysisResult.keyTerms.length > 0 && (
                  <div className="bg-background/50 rounded-xl p-5">
                    <p className="text-base font-medium text-foreground mb-4">{t("upload.keyTerms")}</p>
                    <div className="space-y-4">
                      {analysisResult.keyTerms.map((item, index) => (
                        <div key={index} className="border-l-3 border-accent pl-4">
                          <p className="text-sm font-medium text-foreground">{item.term}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {analysisResult.rights && analysisResult.rights.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <p className="text-base font-medium text-green-800 mb-3">{t("upload.yourRights")}</p>
                    <ul className="list-disc list-inside text-sm text-green-700 space-y-2">
                      {analysisResult.rights.map((right, index) => (
                        <li key={index}>{right}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.questions && analysisResult.questions.length > 0 && (
                  <div className="bg-background/70 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <p className="text-base font-medium text-foreground mb-3">{t("upload.questionsToAsk")}</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                          {analysisResult.questions.map((question, index) => (
                            <li key={index}>{question}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                {analysisResult.obligations && analysisResult.obligations.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <p className="text-base font-medium text-blue-800 mb-3">{t("upload.yourObligations")}</p>
                    <ul className="list-disc list-inside text-sm text-blue-700 space-y-2">
                      {analysisResult.obligations.map((obligation, index) => (
                        <li key={index}>{obligation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.concerns && analysisResult.concerns.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-base font-medium text-amber-800 mb-3">{t("upload.concerns")}</p>
                        <ul className="list-disc list-inside text-sm text-amber-700 space-y-2">
                          {analysisResult.concerns.map((concern, index) => (
                            <li key={index}>{concern}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {analysisResult.recommendation && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                    <p className="text-base font-medium text-foreground mb-2">{t("upload.recommendation")}</p>
                    <p className="text-sm text-muted-foreground">{analysisResult.recommendation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Ask Questions Button - Full Width */}
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full h-14 text-base border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              onClick={handleStartChat}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {t("upload.askQuestions")}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          💡 {t("upload.reference")}{" "}
          <Link to="/templates" className="text-accent hover:underline">{t("upload.legalTemplates")}</Link>
          {" "}{t("upload.or")}{" "}
          <Link to="/topics" className="text-accent hover:underline">{t("upload.browseLegalTopics")}</Link>
        </p>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;
