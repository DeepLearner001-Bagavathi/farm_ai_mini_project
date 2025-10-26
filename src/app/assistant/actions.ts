"use server";

import { generateFarmingAdvice, type GenerateFarmingAdviceInput, type GenerateFarmingAdviceOutput } from "@/ai/flows/generate-farming-advice";

export async function handleGetAdvice(
  input: GenerateFarmingAdviceInput
): Promise<GenerateFarmingAdviceOutput | { error: string }> {
  try {
    // Add a delay to simulate a real API call and show loading state
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const advice = await generateFarmingAdvice(input);
    return advice;
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate advice. The AI model may be temporarily unavailable. Please try again later." };
  }
}
