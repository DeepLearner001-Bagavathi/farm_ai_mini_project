
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
                content: "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central government scheme designed to provide direct income support to all landholding farmer families across India. The primary objective is to supplement the financial needs of Small and Marginal Farmers in procuring various inputs to ensure proper crop health and appropriate yields, commensurate with the anticipated farm income as well as for domestic needs. The scheme provides a payment of ₹6,000 per year, disbursed in three equal four-monthly installments of ₹2,000 each. This amount is transferred directly into the bank accounts of the beneficiaries through the Direct Benefit Transfer (DBT) mode, ensuring transparency and reducing leakages. All landholding farmer families, who have cultivable landholding in their names, are eligible to get benefits under the scheme. The definition of 'family' for the scheme is husband, wife, and minor children. The responsibility of identifying the eligible farmer families and uploading their data on the PM-KISAN portal rests with the State/UT Governments. Farmers can self-register through the Farmers Corner in the portal or through Common Service Centers (CSCs).",
                imageUrl: schemeImage?.imageUrl
            }
        } else if (messageText.includes(dripIrrigationSuggestion.substring(0,10)) || messageText.includes(content.ta.chatbot.suggestions[1].substring(0,10))) {
            const dripImage = PlaceHolderImages.find(p => p.id === 'fact-2');
            botMessage = {
                role: "model",
                content: "Drip irrigation is a highly efficient micro-irrigation method that revolutionizes water and nutrient management for crops. By allowing water to drip slowly and directly to the roots of plants, either from above the soil surface or buried below it, this system minimizes water loss through evaporation and runoff. It can achieve water savings of up to 70% compared to traditional flood irrigation. In Tamil Nadu, a state that often faces water scarcity, this is particularly crucial. The government actively promotes its adoption through the Pradhan Mantri Krishi Sinchayee Yojana (PMKSY), which aims to extend irrigation coverage ('Har Khet Ko Pani') and improve water use efficiency ('More Crop Per Drop'). Under this scheme, farmers can receive significant subsidies—often up to 90% for small and marginal farmers—on the cost of installing drip irrigation systems. This makes it a financially viable and sustainable solution for cultivating water-intensive crops like sugarcane, bananas, grapes, and various vegetables, leading to increased yields, better crop quality, and conservation of precious water resources.",
                imageUrl: dripImage?.imageUrl
            }
        } else if (messageText.includes(turmericPriceSuggestion.substring(0,10)) || messageText.includes(content.ta.chatbot.suggestions[2].substring(0,10))) {
            const turmericImage = PlaceHolderImages.find(p => p.id === 'fact-1');
            botMessage = {
                role: "model",
                content: "The turmeric market in Erode, known as 'Turmeric City', is one of the largest and most influential trading hubs for turmeric in the world, significantly impacting prices both domestically and internationally. The current market price for high-quality, 'bulb' variety turmeric in the Erode market is approximately ₹17,500 per quintal. However, prices are highly dynamic and fluctuate based on several factors. Key determinants include the grade of the turmeric (quality, color, and curcumin content), moisture levels (lower is better), and daily arrivals at the market. Furthermore, market sentiment, demand from North Indian states, export orders, and festive seasons can all cause prices to vary. For farmers, it's crucial to track daily prices from reliable sources like the Erode Turmeric Merchants Association or government agricultural marketing committees. By staying informed about these price trends and the factors influencing them, farmers can make better decisions on when to sell their produce to maximize their profits.",
                imageUrl: turmericImage?.imageUrl
            }
        } else if (messageText.toLowerCase().includes('weather') || messageText.includes('வானிலை')) {
            const weatherImage = PlaceHolderImages.find(p => p.id === 'about-us-1');
            botMessage = {
                role: "model",
                content: "For the upcoming week, most districts in Tamil Nadu can expect a mix of weather conditions, typical for this time of year. The forecast indicates partly cloudy skies with scattered thundershowers, especially during the afternoon and evening hours. The maximum temperature will generally range from 31°C to 33°C, while minimum temperatures are expected to be between 25°C and 27°C. Humidity levels will remain relatively high, often exceeding 75-80%, particularly after rainfall, which can increase the risk of fungal diseases for certain crops. Farmers are advised to plan their activities accordingly. It's a good time for land preparation and sowing for rain-fed crops. However, it's important to ensure proper drainage in fields to prevent waterlogging during heavy downpours. It would be wise to postpone pesticide or fertilizer application if heavy rain is forecasted to avoid it being washed away. Always protect newly harvested produce from potential rain.",
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
