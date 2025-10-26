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
    prompt: input.message,
    history,
  });

  return response.text();
}
