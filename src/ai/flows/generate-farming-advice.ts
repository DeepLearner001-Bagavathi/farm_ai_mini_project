'use server';

/**
 * @fileOverview AI-powered farming assistant providing tailored advice.
 *
 * - generateFarmingAdvice - A function that provides farming advice based on user input.
 * - GenerateFarmingAdviceInput - The input type for the generateFarmingAdvice function.
 * - GenerateFarmingAdviceOutput - The return type for the generateFarmingAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFarmingAdviceInputSchema = z.object({
  landDetails: z.string().describe('Details about the land, including size, soil type, and location.'),
  currentCrops: z.string().describe('Information about the crops currently being grown.'),
  concerns: z.string().describe('Specific concerns or challenges the farmer is facing.'),
});
export type GenerateFarmingAdviceInput = z.infer<typeof GenerateFarmingAdviceInputSchema>;

const GenerateFarmingAdviceOutputSchema = z.object({
  cropSelectionAdvice: z.string().describe('Tailored advice on optimal crop selection.'),
  pestControlAdvice: z.string().describe('Specific advice on pest control methods.'),
  farmingPracticesAdvice: z.string().describe('Recommendations for optimal farming practices.'),
});
export type GenerateFarmingAdviceOutput = z.infer<typeof GenerateFarmingAdviceOutputSchema>;

export async function generateFarmingAdvice(input: GenerateFarmingAdviceInput): Promise<GenerateFarmingAdviceOutput> {
  return generateFarmingAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFarmingAdvicePrompt',
  input: {schema: GenerateFarmingAdviceInputSchema},
  output: {schema: GenerateFarmingAdviceOutputSchema},
  prompt: `You are an AI Farming Assistant providing expert advice to farmers.

  Based on the provided information about the farmer's land, current crops, and concerns, offer tailored advice on:
  - Optimal crop selection
  - Effective pest control methods
  - Recommended farming practices

  Land Details: {{{landDetails}}}
  Current Crops: {{{currentCrops}}}
  Farmer Concerns: {{{concerns}}}

  Format your response clearly and concisely, providing actionable recommendations for the farmer.
  Ensure that the advice given is practical and suitable for Tamil Nadu's climate and agricultural conditions.
`,
});

const generateFarmingAdviceFlow = ai.defineFlow(
  {
    name: 'generateFarmingAdviceFlow',
    inputSchema: GenerateFarmingAdviceInputSchema,
    outputSchema: GenerateFarmingAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
