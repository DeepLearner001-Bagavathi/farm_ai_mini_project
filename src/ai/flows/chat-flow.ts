'use server';

import {ai} from '@/ai/genkit';
import {type ChatInput} from '@/ai/chat-schema';

const baseSystemPrompt = "You are an expert AI assistant for farmers in Tamil Nadu, India. Your name is 'TN Ulavan'. You must answer questions about agriculture, government schemes, and market prices relevant to Tamil Nadu. You must be friendly, helpful, and provide detailed, accurate information."

const languagePrompts = {
    ta: "You must respond in Tamil.",
    en: "You must respond in English."
}

export async function chat(input: ChatInput): Promise<string> {
  const history = input.history.map(m => ({
    role: m.role,
    content: [{text: m.content}],
  }));

  const systemPrompt = `${baseSystemPrompt} ${languagePrompts[input.language]}`;

  const response = await ai.generate({
    model: 'googleai/gemini-1.5-flash-latest',
    system: systemPrompt,
    prompt: input.message,
    history,
  });

  return response.text();
}
