import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Search, ArrowRight, AlertCircle, FileText, Shield, CheckCircle, XCircle, Lightbulb, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LegalChatbot from "@/components/LegalChatbot";
import DocumentAnalyzer from "@/components/DocumentAnalyzer";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

interface SearchResult {
  title: string;
  description: string;
  steps: string[];
  relevantLaw: string;
  urgencyLevel: "low" | "medium" | "high";
  seekProfessional: boolean;
  category: string;
}

interface ScanResult {
  isScam: boolean;
  confidence: "low" | "medium" | "high";
  scamType: string;
  redFlags: string[];
  analysis: string;
  advice: string;
  reportTo: string[];
}

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

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const commonSearches = [
    "Landlord not returning deposit",
    "Received a suspicious job offer",
    "How to file a consumer complaint",
    "Got scammed online",
    "Understanding my rental agreement",
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter your issue",
        description: "Describe what happened so we can help you find guidance.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setSearchResults(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-legal', {
        body: { type: 'search', content: searchQuery }
      });

      if (error) throw error;
      
      if (data.error) {
        toast({
          title: "Analysis Error",
          description: data.error,
          variant: "destructive"
        });
        return;
      }

      setSearchResults(data.result);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">AI-Powered Legal Search</h3>
          <Sparkles className="w-6 h-6 text-accent" />
        </div>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Describe what happened in your own words. Our AI will analyze your situation and provide personalized guidance.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="e.g., My landlord won't return my security deposit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isSearching && handleSearch()}
            className="pl-12 h-16 text-base md:text-lg rounded-xl border-2 border-border focus:border-accent"
          />
        </div>

        <Button 
          variant="accent" 
          size="lg" 
          className="w-full h-14 text-base md:text-lg"
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Get AI Guidance
            </>
          )}
        </Button>
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {searchResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-teal-soft/50 rounded-2xl p-6 md:p-8 border border-teal/20"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground text-lg">{searchResults.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{searchResults.description}</p>
                </div>
              </div>
              {searchResults.urgencyLevel && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(searchResults.urgencyLevel)}`}>
                  {searchResults.urgencyLevel.charAt(0).toUpperCase() + searchResults.urgencyLevel.slice(1)} Priority
                </span>
              )}
            </div>
            
            <div className="space-y-3 mb-4">
              <p className="text-sm font-medium text-foreground">Recommended Steps:</p>
              {searchResults.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </div>
              ))}
            </div>

            {searchResults.relevantLaw && (
              <div className="bg-background/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Relevant Law:</strong> {searchResults.relevantLaw}
                </p>
              </div>
            )}

            {searchResults.seekProfessional && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    This matter may require professional legal assistance. Consider consulting a lawyer for personalized advice.
                  </p>
                </div>
              </div>
            )}

            {searchResults.category && (
              <Link to={`/topics/${searchResults.category}`}>
                <Button variant="soft" size="sm" className="w-full">
                  Learn more about this topic
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-6 border-t border-border/50">
        <p className="text-sm text-muted-foreground mb-4 text-center">Common searches:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {commonSearches.map((search) => (
            <button
              key={search}
              onClick={() => {
                setSearchQuery(search);
                setSearchResults(null);
              }}
              className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScanTab = () => {
  const [message, setMessage] = useState("");
  const [analysisResult, setAnalysisResult] = useState<ScanResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!message.trim()) {
      toast({
        title: "Please paste a message",
        description: "Paste the suspicious message you want us to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-legal', {
        body: { type: 'scan', content: message }
      });

      if (error) throw error;
      
      if (data.error) {
        toast({
          title: "Analysis Error",
          description: data.error,
          variant: "destructive"
        });
        return;
      }

      setAnalysisResult(data.result);
    } catch (error) {
      console.error('Scan error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScamTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'lottery': '🎰 Lottery/Prize Scam',
      'job-fraud': '💼 Job Fraud',
      'phishing': '🎣 Phishing Attempt',
      'upi-fraud': '💳 UPI/Banking Fraud',
      'romance': '💕 Romance Scam',
      'impersonation': '🎭 Impersonation',
      'other': '⚠️ Suspicious Activity',
      'none': '✅ No Scam Detected'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">AI Scam Scanner</h3>
          <Sparkles className="w-6 h-6 text-accent" />
        </div>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Paste a suspicious message, email, or WhatsApp text. Our AI will analyze it for scam indicators.
        </p>
      </div>

      <div className="bg-secondary/30 rounded-xl p-5 border border-border">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            Our AI is trained to detect common Indian scams including lottery fraud, fake job offers, UPI scams, and phishing attempts.
          </p>
        </div>
      </div>

      <Textarea
        placeholder="Paste the message here...&#10;&#10;Example: 'Congratulations! You've won ₹50,000 in our lottery. Send ₹500 processing fee to claim your prize...'"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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
            Analyzing with AI...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Scan for Scams
          </>
        )}
      </Button>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-2xl p-6 md:p-8 border ${
              analysisResult.isScam 
                ? "bg-red-50 border-red-200" 
                : "bg-teal-soft/50 border-teal/20"
            }`}
          >
            <div className="flex items-start gap-3 mb-4">
              {analysisResult.isScam ? (
                <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
              ) : (
                <CheckCircle className="w-6 h-6 text-accent mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className={`font-semibold text-lg ${analysisResult.isScam ? "text-red-700" : "text-foreground"}`}>
                  {analysisResult.isScam ? "⚠️ Scam Detected" : "Analysis Complete"}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    analysisResult.confidence === 'high' ? 'bg-red-100 text-red-700' :
                    analysisResult.confidence === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {analysisResult.confidence.charAt(0).toUpperCase() + analysisResult.confidence.slice(1)} Confidence
                  </span>
                  {analysisResult.scamType && analysisResult.scamType !== 'none' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {getScamTypeLabel(analysisResult.scamType)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground">{analysisResult.analysis}</p>
            </div>

            {analysisResult.redFlags && analysisResult.redFlags.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-foreground">Red Flags Detected:</p>
                {analysisResult.redFlags.map((flag, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <AlertCircle className={`w-4 h-4 mt-0.5 shrink-0 ${analysisResult.isScam ? "text-red-500" : "text-amber-500"}`} />
                    <span className="text-foreground">{flag}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-background/70 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">What You Should Do:</p>
                  <p className="text-sm text-muted-foreground">{analysisResult.advice}</p>
                </div>
              </div>
            </div>

            {analysisResult.reportTo && analysisResult.reportTo.length > 0 && analysisResult.isScam && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-800 mb-2">Report This Scam To:</p>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                  {analysisResult.reportTo.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysisResult.isScam && (
              <Link to="/topics/scams-fraud" className="block mt-4">
                <Button variant="soft" size="sm" className="w-full">
                  Learn how to protect yourself from scams
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// UploadTab is now replaced by DocumentAnalyzer component
const tabVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const GetHelpContent = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("search");

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-navy-light py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                {t("page.title")}
              </h1>
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <p className="text-lg text-primary-foreground/80 mb-6">
              {t("page.subtitle")}
            </p>
            <div className="flex justify-center">
              <LanguageSelector />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 md:py-24 bg-background min-h-[80vh]">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 h-auto p-3 md:p-4 bg-secondary/50 backdrop-blur-sm rounded-2xl mb-12 border border-border/30">
                <TabsTrigger
                  value="search"
                  className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm md:text-base font-medium transition-all duration-200 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg data-[state=inactive]:hover:bg-secondary"
                >
                  <Search className="w-5 h-5" />
                  <span>{t("tab.search")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="scan"
                  className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm md:text-base font-medium transition-all duration-200 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg data-[state=inactive]:hover:bg-secondary"
                >
                  <Shield className="w-5 h-5" />
                  <span>{t("tab.scan")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="upload"
                  className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm md:text-base font-medium transition-all duration-200 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg data-[state=inactive]:hover:bg-secondary"
                >
                  <FileText className="w-5 h-5" />
                  <span>{t("tab.upload")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm md:text-base font-medium transition-all duration-200 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg data-[state=inactive]:hover:bg-secondary"
                >
                  <Bot className="w-5 h-5" />
                  <span>{t("tab.chat")}</span>
                </TabsTrigger>
              </TabsList>

              <div className="bg-card rounded-2xl p-6 md:p-10 shadow-card border border-border/50 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={tabVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <TabsContent value="search" className="mt-0" forceMount={activeTab === "search" ? true : undefined}>
                      {activeTab === "search" && <SearchTab />}
                    </TabsContent>
                    <TabsContent value="scan" className="mt-0" forceMount={activeTab === "scan" ? true : undefined}>
                      {activeTab === "scan" && <ScanTab />}
                    </TabsContent>
                    <TabsContent value="upload" className="mt-0" forceMount={activeTab === "upload" ? true : undefined}>
                      {activeTab === "upload" && <DocumentAnalyzer />}
                    </TabsContent>
                    <TabsContent value="chat" className="mt-0" forceMount={activeTab === "chat" ? true : undefined}>
                      {activeTab === "chat" && <LegalChatbot />}
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Trust Note */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              {t("trust.note")}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const GetHelp = () => {
  return <GetHelpContent />;
};

export default GetHelp;
