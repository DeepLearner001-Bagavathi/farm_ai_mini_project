'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { summarizeGovSchemes } from '@/ai/flows/summarize-gov-schemes';
import { Loader2 } from 'lucide-react';
import { schemesData } from '../schemes/page';

const formSchema = z.object({
  landSize: z.string().min(1, 'Land size is required.'),
  crops: z.string().min(1, 'Crops are required.'),
  income: z.string().min(1, 'Income is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function AssistantPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landSize: '',
      crops: '',
      income: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setSummary('');

    const farmerProfile = `Land Size: ${values.landSize} acres, Crops: ${values.crops}, Annual Income: ₹${values.income}`;
    const schemeDetails = schemesData
      .map((s) => `Title: ${s.title}\nDetails: ${s.content}`)
      .join('\n\n');

    try {
      const result = await summarizeGovSchemes({
        farmerProfile,
        schemeDetails,
      });
      setSummary(result.summary);
    } catch (error) {
      console.error('Error getting summary:', error);
      setSummary('Sorry, I was unable to get a summary at this time.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">AI Scheme Assistant</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Enter your details to find relevant government schemes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Your Farming Profile</CardTitle>
            <CardDescription>
              Provide some information about your farm.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="landSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land Size (in acres)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="crops"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crops Grown</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Paddy, Sugarcane" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="income"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Income (in Rupees)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 100000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Get Scheme Summary
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Personalized Scheme Summary</CardTitle>
            <CardDescription>
              Our AI will summarize the most relevant schemes for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {summary && !loading && (
              <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                {summary}
              </div>
            )}
            {!summary && !loading && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Your summary will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
