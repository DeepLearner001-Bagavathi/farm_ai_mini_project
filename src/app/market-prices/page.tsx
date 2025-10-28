"use client";

import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";
import { MarketPricesTable } from "@/components/MarketPricesTable";

export default function MarketPricesPage() {
    const { language } = useLanguage();
    const pageContent = content[language].marketPricesPage;

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <h1 className="text-4xl font-bold font-headline">{pageContent.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageContent.subtitle}
        </p>
      </div>

      <MarketPricesTable />
    </div>
  );
}
