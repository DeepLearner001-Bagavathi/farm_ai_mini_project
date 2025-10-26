'use server';

import {ai} from '@/ai/genkit';
import {generate} from 'genkit';
import {type ChatInput} from '@/ai/chat-schema';

export async function chat(input: ChatInput): Promise<string> {
  const history = input.history.map(m => ({
    role: m.role,
    content: [{text: m.content}],
  }));

  const response = await generate({
    model: 'googleai/gemini-1.5-flash-latest',
    system: "You are an expert AI assistant for farmers in Tamil Nadu, India. Your name is 'TN Agri Mitra'. You must answer questions about agriculture, government schemes, and market prices relevant to Tamil Nadu. You must respond in Tamil unless the user asks for English. Be friendly, helpful, and provide detailed, accurate information.",
    prompt: input.message,
    history,
  });

  return response.text();
}
