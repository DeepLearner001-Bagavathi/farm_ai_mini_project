'use server';

/**
 * @fileOverview Summarizes government schemes for farmers.
 *
 * - summarizeGovSchemes - A function that summarizes the details and eligibility criteria of relevant government schemes.
 * - SummarizeGovSchemesInput - The input type for the summarizeGovSchemes function.
 * - SummarizeGovSchemesOutput - The return type for the summarizeGovSchemes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SummarizeGovSchemesInputSchema = z.object({
  schemeDetails: z
    .string()
    .describe('Detailed information about government schemes.'),
  farmerProfile: z
    .string()
    .describe('Profile of the farmer including details like land size, crops grown, income, etc.'),
});
export type SummarizeGovSchemesInput = z.infer<typeof SummarizeGovSchemesInputSchema>;

const SummarizeGovSchemesOutputSchema = z.object({
  summary: z.string().describe('A concise summary of relevant government schemes and their eligibility criteria for the farmer.'),
});
export type SummarizeGovSchemesOutput = z.infer<typeof SummarizeGovSchemesOutputSchema>;

export async function summarizeGovSchemes(input: SummarizeGovSchemesInput): Promise<SummarizeGovSchemesOutput> {
  return summarizeGovSchemesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeGovSchemesPrompt',
  input: {schema: SummarizeGovSchemesInputSchema},
  output: {schema: SummarizeGovSchemesOutputSchema},
  prompt: `You are an expert in government agricultural schemes. A farmer will provide their profile and details of government schemes. You will summarize the schemes that are relevant to the farmer, explaining the eligibility criteria, so that the farmer can quickly understand if they qualify and how to apply.

Farmer Profile: {{{farmerProfile}}}

Scheme Details: {{{schemeDetails}}}

Summary:`,
});

const summarizeGovSchemesFlow = ai.defineFlow(
  {
    name: 'summarizeGovSchemesFlow',
    inputSchema: SummarizeGovSchemesInputSchema,
    outputSchema: SummarizeGovSchemesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
