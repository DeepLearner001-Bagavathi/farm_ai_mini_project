
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Send, Loader, User, Bot, X, Plus } from "lucide-react";
import { useState, useRef, useEffect, createContext, useContext, useMemo } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

type Message = {
  role: "user" | "model";
  content: string;
};

type ChatbotContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setInitialMessage: (message: string) => void;
};

const ChatbotContext = createContext<ChatbotContextType | null>(null);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string>("");

  const contextValue = useMemo(() => ({ 
      open, 
      setOpen, 
      setInitialMessage: (message: string) => {
        setInitialMessage(message);
        setOpen(true);
      }
    }), [open, setOpen]);

  return (
    <ChatbotContext.Provider value={contextValue}>
      <Chatbot initialMessage={initialMessage} setInitialMessage={setInitialMessage} />
      {children}
    </ChatbotContext.Provider>
  );
}

type ChatbotProps = {
    initialMessage: string;
    setInitialMessage: (message: string) => void;
};

export function Chatbot({ initialMessage, setInitialMessage }: ChatbotProps) {
  const { open, setOpen } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const chatbotContent = content[language].chatbot;

  useEffect(() => {
    if (initialMessage) {
      handleSuggestionClick(initialMessage);
      setInitialMessage(""); // Clear after setting
    }
  }, [initialMessage, setInitialMessage]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  
  const sendMessage = (messageText: string) => {
    if (!messageText.trim() || loading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Simulate a delay for the bot's response
    setTimeout(() => {
        const botMessage: Message = { role: "model", content: "I am your AI assistant." };
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
    }, 500);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
        onClick={() => setOpen(true)}
      >
        <Bot className="h-7 w-7" />
        <span className="sr-only">{chatbotContent.open}</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-full w-full h-full max-h-screen flex flex-col p-0">
          <DialogHeader className="p-4 border-b flex-row items-center justify-between">
            <DialogTitle>{chatbotContent.title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4 max-w-4xl mx-auto w-full">
                {messages.length === 0 && !loading ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
                        <div className="p-4 bg-secondary rounded-full mb-4">
                            <Bot className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold font-headline mb-2">{chatbotContent.welcomeTitle}</h2>
                        <p className="text-muted-foreground mb-8">{chatbotContent.welcomeMessage}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                            {chatbotContent.suggestions.map((suggestion, index) => (
                                <Button key={index} variant="outline" onClick={() => handleSuggestionClick(suggestion)}>
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-3 ${
                        message.role === "user" ? "justify-end" : ""
                        }`}
                    >
                        {message.role === "model" && (
                        <div className="p-2 bg-secondary rounded-full">
                            <Bot className="w-6 h-6 text-primary" />
                        </div>
                        )}
                        <div
                        className={`max-w-[75%] rounded-lg p-3 ${
                            message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                        >
                        <p className="text-sm">{message.content}</p>
                        </div>
                        {message.role === "user" && (
                        <div className="p-2 bg-secondary rounded-full">
                            <User className="w-6 h-6 text-primary" />
                        </div>
                        )}
                    </div>
                    ))
                )}
                {loading && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary rounded-full">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg p-3 flex items-center">
                        <Loader className="w-5 h-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-4xl mx-auto w-full">
                <Button type="button" variant="ghost" size="icon">
                  <Plus className="w-5 h-5" />
                  <span className="sr-only">Upload Photo</span>
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={chatbotContent.placeholder}
                  className="flex-1"
                  disabled={loading}
                />
                <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="sr-only">{chatbotContent.send}</span>
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
