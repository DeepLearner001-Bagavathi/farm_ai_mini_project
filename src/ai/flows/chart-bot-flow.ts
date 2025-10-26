'use server';
/**
 * @fileOverview A chart-generating AI bot for agricultural data.
 *
 * - chatWithBot - A function that handles the chat interaction and chart generation.
 * - ChatBotInput - The input type for the chatWithBot function.
 * - ChatBotOutput - The return type for the chatWithBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChatBotInputSchema = z.object({
  query: z.string().describe('The user\'s message to the chatbot.'),
});
export type ChatBotInput = z.infer<typeof ChatBotInputSchema>;

const ChartDataSchema = z.object({
    type: z.enum(["bar", "line", "pie"]).describe("The type of chart to display."),
    data: z.array(z.record(z.any())).describe("The data for the chart. An array of objects, where each object is a data point."),
    x_axis_key: z.string().describe("The key in the data objects to use for the x-axis."),
    y_axis_keys: z.array(z.string()).describe("The keys in the data objects to use for the y-axis values."),
}).optional();


const ChatBotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s text response to the user.'),
  chart: ChartDataSchema,
});
export type ChatBotOutput = z.infer<typeof ChatBotOutputSchema>;

export async function chatWithBot(input: ChatBotInput): Promise<ChatBotOutput> {
  return chartBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chartBotPrompt',
  input: {schema: ChatBotInputSchema},
  output: {schema: ChatBotOutputSchema},
  prompt: `You are an expert AI assistant for farmers in Tamil Nadu, specializing in agricultural data. Your name is "Agri Bot".

Respond to the user's query. If the query asks for data, statistics, or trends that can be visualized, you MUST generate relevant chart data.

- Your text response should be helpful and directly answer the user's question.
- If you generate a chart, briefly mention it in your response.
- The chart data should be plausible and relevant to Tamil Nadu agriculture.
- If the query is a greeting or casual conversation, just respond naturally without generating a chart.
- The x-axis should represent categories (like crop names, districts, months) and the y-axis should represent numerical values (like price, production amount).

Example query: "Show me the price of paddy in major markets"
Example response: "Here is a chart showing recent paddy prices in some major markets."
Example chart data:
{
  "type": "bar",
  "data": [
    { "market": "Thanjavur", "price": 2183 },
    { "market": "Madurai", "price": 2150 },
    { "market": "Tirunelveli", "price": 2200 }
  ],
  "x_axis_key": "market",
  "y_axis_keys": ["price"]
}


User Query: {{{query}}}`,
});

const chartBotFlow = ai.defineFlow(
  {
    name: 'chartBotFlow',
    inputSchema: ChatBotInputSchema,
    outputSchema: ChatBotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
