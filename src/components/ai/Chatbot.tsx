"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Send, Loader, User, Bot } from "lucide-react";
import { useState, useRef, useEffect, createContext, useContext, useMemo } from "react";
import { chat } from "@/ai/flows/chat-flow";
import { ScrollArea } from "../ui/scroll-area";
import type { ChatInput } from "@/ai/chat-schema";

type Message = {
  role: "user" | "model";
  content: string;
};

type ChatbotContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ChatbotContext = createContext<ChatbotContextType | null>(null);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};


export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  
  const contextValue = useMemo(() => ({ open, setOpen }), [open, setOpen]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const chatInput: ChatInput = {
        history: messages,
        message: input,
      };
      const response = await chat(chatInput);
      const botMessage: Message = { role: "model", content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting response from AI:", error);
      const errorMessage: Message = {
        role: "model",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatbotContext.Provider value={contextValue}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-screen max-h-screen w-screen max-w-none flex flex-col p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>AI Assistant</DialogTitle>
          </DialogHeader>
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
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
                ))}
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
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about farming in Tamil Nadu..."
                  className="flex-1"
                  disabled={loading}
                />
                <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ChatbotContext.Provider>
  );
}
