import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Loader2, RotateCcw, Mic, Volume2, Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, Language } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const LegalChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Available system voices and user-selected voice
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Map language to voice locale codes
  const getVoiceLangCode = (lang: Language): string => {
    const langMap: Record<Language, string> = {
      en: "en-IN",
      hi: "hi-IN",
      mr: "mr-IN",
    };
    return langMap[lang] || "en-IN";
  };

  // Load available voices and set default/previous selection
  useEffect(() => {
    const load = () => {
      try {
        const vs = window.speechSynthesis.getVoices() || [];
        setVoices(vs);
        setVoicesLoaded(true);
        // Log available voices for debugging
        console.log(`Loaded ${vs.length} voices:`, vs.map(v => `${v.name} (${v.lang})`));
        
        // If user hasn't chosen a voice, pick best available for language
        if (!selectedVoiceURI) {
          const best = getBestVoiceForLanguage(language);
          if (best) {
            setSelectedVoiceURI(best.voiceURI || best.name || null);
            console.log(`Selected best voice for ${language}:`, best.name);
          }
        }
      } catch (e) {
        console.error("Failed to load voices:", e);
      }
    };

    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      try {
        window.speechSynthesis.onvoiceschanged = null;
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Get the best available voice for the language with stronger Indian-voice heuristics
  const getBestVoiceForLanguage = (lang: Language): SpeechSynthesisVoice | null => {
    const voiceLang = getVoiceLangCode(lang);
    const voices = window.speechSynthesis.getVoices();

    if (!voices.length) return null;

    const preferKeywordsByLang: Record<Language, string[]> = {
      en: ["India", "Indian", "en-IN", "Aditi", "Google", "Microsoft"],
      hi: ["hi-IN", "Hindi", "हिन्दी", "Aditi", "Google", "India", "Indian", "Microsoft"],
      mr: ["mr-IN", "Marathi", "मराठी", "Aditi", "Google", "India", "Indian", "Microsoft"],
    };

    const keywords = preferKeywordsByLang[lang] || [];

    // Helper to test name/uri/lang for keywords
    const matchesKeyword = (v: SpeechSynthesisVoice) => {
      const hay = `${v.name} ${v.voiceURI} ${v.lang}`.toLowerCase();
      return keywords.some((k) => hay.includes(k.toLowerCase()));
    };

    // 1) Try exact locale match and keyword-preferred voices
    const exact = voices.filter((v) => v.lang === voiceLang && matchesKeyword(v));
    if (exact.length) return exact[0];

    // 2) Any exact locale match
    const exactAny = voices.filter((v) => v.lang === voiceLang);
    if (exactAny.length) return exactAny[0];

    // 3) Keyword-preferred voices across locales
    const preferred = voices.filter(matchesKeyword);
    if (preferred.length) return preferred[0];

    // 4) Try language prefix match (hi-, mr-, en-)
    const prefix = voices.filter((v) => v.lang.split("-")[0] === lang);
    if (prefix.length) return prefix[0];

    // 5) For Marathi, try Hindi as fallback since similar language
    if (lang === "mr") {
      const hindi = voices.filter((v) => 
        v.lang.startsWith("hi") || 
        v.name.toLowerCase().includes("hindi") ||
        v.name.toLowerCase().includes("हिन्दी")
      );
      if (hindi.length) return hindi[0];
    }

    // 6) Any India-region voice
    const india = voices.filter((v) => v.lang.includes("IN"));
    if (india.length) return india[0];

    // 7) Fallback: prefer Google or Native names
    const google = voices.find((v) => v.name.toLowerCase().includes("google"));
    if (google) return google;
    const native = voices.find((v) => v.name.toLowerCase().includes("native"));
    if (native) return native;

    // 8) final fallback
    return voices[0] || null;
  };

  const suggestedQuestions = [
    "What are my rights as a tenant?",
    "How do I file a consumer complaint?",
    "What should I do if I'm scammed online?",
    "How do I get a police FIR registered?",
  ];

  // Load chat history for logged-in users
  const loadChatHistory = useCallback(async () => {
    if (!user) return;
    
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setMessages(
          data.map((msg) => ({
            id: msg.id,
            role: msg.role as "user" | "assistant",
            content: msg.content,
            timestamp: new Date(msg.created_at),
          }))
        );
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [user]);

  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Save message to database
  const saveMessage = async (role: "user" | "assistant", content: string) => {
    if (!user) return;
    
    try {
      await supabase.from("chat_messages").insert({
        user_id: user.id,
        role,
        content,
      });
    } catch (error) {
      console.error("Failed to save message:", error);
    }
  };
  // Clean text for speech synthesis - handle Devanagari punctuation
  const cleanTextForSpeech = (text: string): string => {
    let clean = text.replace(/```[\s\S]*?```/g, "");
    clean = clean.replace(/`+/g, "");
    clean = clean.replace(/\*+/g, "");
    // Remove common markdown
    clean = clean.replace(/#+\s*/g, "");
    clean = clean.replace(/[-_]+/g, "");
    // Handle Devanagari danda and double danda
    clean = clean.replace(/।।/g, "।");
    clean = clean.replace(/॥/g, "।");
    // Replace multiple spaces
    clean = clean.replace(/\s+/g, " ");
    return clean.trim();
  };

  const speakText = (text: string) => {
    try {
      if (!window.speechSynthesis) {
        toast({ title: "Not supported", description: "Speech synthesis is not supported in this browser.", variant: "destructive" });
        return;
      }

      // Load voices if not already loaded
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        // Voices are loaded asynchronously, wait a moment
        window.speechSynthesis.onvoiceschanged = () => {
          speakText(text);
        };
        return;
      }

      const voiceLang = getVoiceLangCode(language);
      const clean = cleanTextForSpeech(text);

      if (!clean) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(clean);
      
      // Prefer user-selected voice, otherwise pick best available
      let voiceToUse: SpeechSynthesisVoice | null = null;
      if (selectedVoiceURI && voices.length > 0) {
        voiceToUse = voices.find((v) => v.voiceURI === selectedVoiceURI) || voices.find((v) => v.name === selectedVoiceURI) || null;
      }
      if (!voiceToUse) {
        voiceToUse = getBestVoiceForLanguage(language);
      }
      if (voiceToUse) {
        utterance.voice = voiceToUse;
        console.log("Selected TTS voice:", voiceToUse.name, voiceToUse.lang, voiceToUse.voiceURI);
      } else {
        console.log("No preferred TTS voice found; using default.");
      }
      
      utterance.lang = voiceLang;
      
      // Optimized settings for Hindi and Marathi accent
      if (language !== "en") {
        utterance.rate = 0.8; // Slower for better clarity
        utterance.pitch = 1.1; // Slightly higher pitch for natural Indian accent
        utterance.volume = 1; // Full volume
      } else {
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
      }
      
      utteranceRef.current = utterance;
      setIsSpeaking(true);
      setIsPaused(false);

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utterance.onerror = (e) => {
        console.error("Speech synthesis error:", e);
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
        toast({ title: "Speech error", description: "Could not play audio.", variant: "destructive" });
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech synthesis failed:", e);
    }
  };

  const pauseSpeech = () => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.pause();
      setIsPaused(true);
    } catch (e) {
      console.error("Pause failed:", e);
    }
  };

  const resumeSpeech = () => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.resume();
      setIsPaused(false);
    } catch (e) {
      console.error("Resume failed:", e);
    }
  };

  const stopSpeech = () => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    } catch (e) {
      console.error("Stop failed:", e);
    }
  };

  const startRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Not supported", description: "Speech recognition is not supported in this browser.", variant: "destructive" });
      return;
    }

    try {
      const voiceLang = getVoiceLangCode(language);
      const recognition = new SpeechRecognition();
      recognition.lang = voiceLang;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognitionRef.current = recognition;
      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        recognition.stop();
        handleSend(transcript, true);
      };

      recognition.onerror = (err: any) => {
        console.error("Recognition error:", err);
        setIsRecording(false);
        toast({ title: "Recognition error", description: "Could not recognize speech. Try again.", variant: "destructive" });
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e) {
      console.error("Failed to start recognition:", e);
      setIsRecording(false);
    }
  };

  const stopRecognition = () => {
    try {
      const r = recognitionRef.current;
      if (r) r.stop();
    } finally {
      setIsRecording(false);
    }
  };

  const handleSend = async (messageText?: string, speak = false) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Save user message to database
    await saveMessage("user", textToSend);

    try {
      // Build conversation history for context
      const conversationHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const { data, error } = await supabase.functions.invoke("analyze-legal", {
        body: { 
          type: "chat", 
          content: textToSend,
          history: conversationHistory 
        },
      });

      if (error) throw error;

      if (data.error) {
        toast({
          title: "Chat Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      const assistantContent = data.result || "I apologize, but I couldn't process your request. Please try again.";
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Save assistant message to database
      await saveMessage("assistant", assistantContent);
      if (speak) speakText(assistantContent);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    // Delete chat history from database
    if (user) {
      try {
        await supabase
          .from("chat_messages")
          .delete()
          .eq("user_id", user.id);
      } catch (error) {
        console.error("Failed to clear chat history:", error);
      }
    }
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-foreground">Legal AI Assistant</h3>
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <p className="text-muted-foreground text-sm">
            Chat with our AI about any legal questions. Get guidance on Indian law topics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!voicesLoaded ? (
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading voices...
            </div>
          ) : voices.length === 0 ? (
            <div className="text-xs text-yellow-600 dark:text-yellow-500">
              No voices available. Try refreshing or switching browsers.
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-muted-foreground">Voice:</label>
                <select
                  value={selectedVoiceURI || ""}
                  onChange={(e) => setSelectedVoiceURI(e.target.value || null)}
                  className="text-xs rounded-md border border-border px-2 py-1 bg-background"
                  title="TTS voice - Select voice for text-to-speech"
                >
                  <option value="">Auto-select best voice</option>
                  {voices.map((v) => {
                    const isRecommended = 
                      v.lang === getVoiceLangCode(language) || 
                      (language === "mr" && v.lang.startsWith("hi"));
                    return (
                      <option 
                        key={v.voiceURI || v.name} 
                        value={v.voiceURI || v.name}
                        style={{
                          fontWeight: isRecommended ? "bold" : "normal"
                        }}
                      >
                        {isRecommended ? "⭐ " : ""}{v.name} ({v.lang})
                      </option>
                    );
                  })}
                </select>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const sample = (language === "hi")
                    ? "नमस्ते, मैं आपका कानूनी सहायक हूँ। यह आवाज़ परीक्षण है।"
                    : language === "mr"
                    ? "नमस्कार, मी तुमचा कायदेशीर सहाय्यक आहे. हे आवाज परीक्षण आहे."
                    : "Hello, I am your legal assistant. This is a voice test.";
                  speakText(sample);
                }}
                className="mt-4"
                title="Test the selected voice"
              >
                <Volume2 className="w-4 h-4 mr-1" />
                Test
              </Button>
            </>
          )}

          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1">
              <RotateCcw className="w-4 h-4" />
              New Chat
            </Button>
          )}
        </div>
      </div>

      {/* Chat Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">
                How can I help you today?
              </h4>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Ask me about tenant rights, consumer complaints, scams, FIRs, or any legal topic relevant to India.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    className="px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-accent" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.role === "assistant" && (
                        <div className="ml-2 flex items-center gap-1">
                          {!isSpeaking && (
                            <button
                              onClick={() => speakText(message.content)}
                              className="p-1 rounded-md hover:bg-accent/10"
                              title="Play"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          )}

                          {isSpeaking && !isPaused && (
                            <button
                              onClick={() => pauseSpeech()}
                              className="p-1 rounded-md hover:bg-accent/10"
                              title="Pause"
                            >
                              <Pause className="w-4 h-4" />
                            </button>
                          )}

                          {isSpeaking && isPaused && (
                            <button
                              onClick={() => resumeSpeech()}
                              className="p-1 rounded-md hover:bg-accent/10"
                              title="Resume"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          )}

                          {isSpeaking && (
                            <button
                              onClick={() => stopSpeech()}
                              className="p-1 rounded-md hover:bg-accent/10"
                              title="Stop"
                            >
                              <Square className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-accent-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="bg-secondary text-secondary-foreground rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Type your legal question..."
          disabled={isLoading}
          className="flex-1 h-12 rounded-xl border-2 border-border focus:border-accent"
        />
        <div className="flex items-center gap-2">
          <Button
            onClick={() => (isRecording ? stopRecognition() : startRecognition())}
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            className="h-12 w-12 rounded-xl"
            aria-pressed={isRecording}
            title={isRecording ? "Stop recording" : "Start voice input"}
            disabled={isLoading}
          >
            <Mic className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            variant="accent"
            size="icon"
            className="h-12 w-12 rounded-xl"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center mt-3">
        AI provides general guidance only. Consult a lawyer for legal advice.
      </p>
    </div>
  );
};

export default LegalChatbot;
