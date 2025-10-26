'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { chatWithBot, type ChatBotOutput } from '@/ai/flows/chart-bot-flow';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell } from 'recharts';

type Message = {
  sender: 'user' | 'bot';
  text: string;
  chart?: ChatBotOutput['chart'];
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00c49f"];

export function ChartBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || loading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await chatWithBot({ query: input });
      const botMessage: Message = { sender: 'bot', text: result.response, chart: result.chart };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage: Message = { sender: 'bot', text: 'Sorry, something went wrong.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderChart = (chartData: ChatBotOutput['chart']) => {
    if (!chartData || !chartData.data || chartData.data.length === 0) return null;

    const { type, data, x_axis_key, y_axis_keys } = chartData;

    return (
        <div className="my-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
                {type === 'bar' && (
                    <BarChart data={data}>
                        <XAxis dataKey={x_axis_key} stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip wrapperClassName="!bg-background !border-border" cursor={{fill: 'hsl(var(--muted))'}} />
                        <Legend />
                        {y_axis_keys.map((key, index) => (
                            <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} radius={[4, 4, 0, 0]} />
                        ))}
                    </BarChart>
                )}
                {type === 'line' && (
                     <LineChart data={data}>
                        <XAxis dataKey={x_axis_key} stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip wrapperClassName="!bg-background !border-border" />
                        <Legend />
                        {y_axis_keys.map((key, index) => (
                             <Line key={key} type="monotone" dataKey={key} stroke={COLORS[index % COLORS.length]} />
                        ))}
                    </LineChart>
                )}
                {type === 'pie' && (
                    <PieChart>
                         <Pie data={data} dataKey={y_axis_keys[0]} nameKey={x_axis_key} cx="50%" cy="50%" outerRadius={80} label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip wrapperClassName="!bg-background !border-border" />
                        <Legend />
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="rounded-full w-14 h-14 shadow-lg">
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </div>
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-full max-w-sm h-[60vh] flex flex-col shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart2 className="h-6 w-6 text-primary" />
              <CardTitle className="m-0">Agri Bot</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  {msg.sender === 'bot' && msg.chart && renderChart(msg.chart)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                  <div className="p-3 rounded-lg bg-secondary flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Agri Bot is thinking...</span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="flex w-full items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about crops, prices..."
                disabled={loading}
              />
              <Button onClick={handleSend} disabled={loading || input.trim() === ''}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
