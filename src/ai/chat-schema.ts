import {z} from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
  language: z.enum(['en', 'ta']),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;
