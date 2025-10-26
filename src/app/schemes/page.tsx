"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

export default function SchemesPage() {
    const { language } = useLanguage();
    const pageContent = content[language].schemesPage;

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">{pageContent.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageContent.subtitle}
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {pageContent.schemesData.map((scheme) => (
            <AccordionItem key={scheme.title} value={scheme.title}>
              <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">{scheme.title}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {scheme.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
