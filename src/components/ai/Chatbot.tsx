
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
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type Message = {
  role: "user" | "model";
  content: string;
  imageUrl?: string;
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
        let botMessage: Message = { 
            role: "model", 
            content: "Sorry, I can only provide information on the suggested topics for now.",
        };

        const pmKisanSuggestion = content.en.chatbot.suggestions[0];
        const dripIrrigationSuggestion = content.en.chatbot.suggestions[1];
        const turmericPriceSuggestion = content.en.chatbot.suggestions[2];

        if (messageText.includes(pmKisanSuggestion.substring(0,10)) || messageText.includes(content.ta.chatbot.suggestions[0].substring(0,10))) {
            const schemeImage = PlaceHolderImages.find(p => p.id === 'scheme-highlight-1');
            botMessage = {
                role: "model",
                content: "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central government scheme that provides income support of ₹6,000 per year to all landholding farmer families. This financial aid is disbursed in three equal installments of ₹2,000 every four months directly into their bank accounts. The scheme aims to supplement the financial needs of farmers in procuring various inputs to ensure proper crop health and appropriate yields, as well as for domestic needs.",
                imageUrl: schemeImage?.imageUrl
            }
        } else if (messageText.includes(dripIrrigationSuggestion.substring(0,10)) || messageText.includes(content.ta.chatbot.suggestions[1].substring(0,10))) {
            const dripImage = PlaceHolderImages.find(p => p.id === 'fact-2');
            botMessage = {
                role: "model",
                content: "Drip irrigation is a highly efficient micro-irrigation method that saves water and fertilizers by allowing water to drip slowly to the roots of plants, either from above the soil surface or buried below the surface. The goal is to place water directly into the root zone and minimize evaporation. In Tamil Nadu, the government provides significant subsidies to encourage its adoption, making it a key strategy for sustainable agriculture in water-scarce areas.",
                imageUrl: dripImage?.imageUrl
            }
        } else if (messageText.includes(turmericPriceSuggestion.substring(0,10)) || messageText.includes(content.ta.chatbot.suggestions[2].substring(0,10))) {
            const turmericImage = PlaceHolderImages.find(p => p.id === 'fact-1');
            botMessage = {
                role: "model",
                content: "The current market price for high-quality turmeric in the Erode market is approximately ₹17,500 per quintal. Prices can vary based on factors like grade, moisture content, and demand from both domestic and international buyers. Erode is one of the largest turmeric trading centers in the world, often setting the price benchmark for the spice.",
                imageUrl: turmericImage?.imageUrl
            }
        } else if (messageText.toLowerCase().includes('weather') || messageText.includes('வானிலை')) {
            const weatherImage = PlaceHolderImages.find(p => p.id === 'about-us-1');
            botMessage = {
                role: "model",
                content: "For the upcoming week in most parts of Tamil Nadu, the weather is expected to be partly cloudy with scattered showers. The maximum temperature will hover around 31-33°C, while the minimum temperature will be around 25-27°C. Humidity levels will remain relatively high, especially after rainfall. It's advisable to plan farming activities accordingly and protect crops from heavy downpours if forecasted.",
                imageUrl: weatherImage?.imageUrl
            }
        }

        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
    }, 1000);
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
                            <Bot className="w-10 h-10 text-primary animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold font-headline mb-2">{chatbotContent.welcomeTitle}</h2>
                        <p className="text-muted-foreground mb-8">{chatbotContent.welcomeMessage}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                            {chatbotContent.suggestions.map((suggestion, index) => (
                                <Button key={index} variant="outline" onClick={() => handleSuggestionClick(suggestion)} className="transition-transform hover:scale-105">
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
                            {message.imageUrl && (
                                <div className="mb-2">
                                    <Image src={message.imageUrl} alt="Chatbot image" width={300} height={200} className="rounded-md" />
                                </div>
                            )}
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

    