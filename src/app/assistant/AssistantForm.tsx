"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { GenerateFarmingAdviceOutput } from "@/ai/flows/generate-farming-advice";
import { handleGetAdvice } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trees, Bug, Wrench } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  landDetails: z.string().min(10, {
    message: "Please provide more details about your land (at least 10 characters).",
  }),
  currentCrops: z.string().min(5, {
    message: "Please tell us about your current crops (at least 5 characters).",
  }),
  concerns: z.string().min(10, {
    message: "Please describe your concerns (at least 10 characters).",
  }),
});

export default function AssistantForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateFarmingAdviceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landDetails: "",
      currentCrops: "",
      concerns: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setError(null);
    const response = await handleGetAdvice(values);
    if ("error" in response) {
      setError(response.error);
    } else {
      setResult(response);
    }
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Card>
        <CardHeader>
          <CardTitle>Your Farm's Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="landDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Land Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 5 acres of red soil land in Coimbatore, with access to canal irrigation."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your land size, soil type, location, and water sources.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentCrops"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Crops</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Currently growing paddy and turmeric."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List the crops you are currently cultivating.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="concerns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Concerns or Questions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Facing issues with pests in my paddy crop and low yield."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What specific challenges or questions do you have?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Generating Advice..." : "Get AI Advice"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-headline text-center lg:text-left">AI-Generated Recommendations</h2>
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
            <Card className="border-destructive bg-destructive/10">
                <CardHeader>
                    <CardTitle className="text-destructive">An Error Occurred</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{error}</p>
                </CardContent>
            </Card>
        )}

        {result ? (
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-full"><Trees className="w-6 h-6 text-accent" /></div>
                <CardTitle>Crop Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{result.cropSelectionAdvice}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-full"><Bug className="w-6 h-6 text-accent" /></div>
                <CardTitle>Pest Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{result.pestControlAdvice}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-full"><Wrench className="w-6 h-6 text-accent" /></div>
                <CardTitle>Farming Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{result.farmingPracticesAdvice}</p>
              </CardContent>
            </Card>
          </div>
        ) : !loading && !error && (
            <Card className="flex flex-col items-center justify-center text-center py-20 border-dashed">
                <CardContent>
                    <p className="text-muted-foreground">Your personalized advice will appear here after you submit your details.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
