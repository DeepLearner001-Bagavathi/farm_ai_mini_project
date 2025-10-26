"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CloudSun, BarChart, ScrollText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

const icons: { [key: string]: React.ReactNode } = {
  weather: <CloudSun className="w-8 h-8 text-accent" />,
  market: <BarChart className="w-8 h-8 text-accent" />,
  schemes: <ScrollText className="w-8 h-8 text-accent" />,
};


export default function Home() {
  const { language } = useLanguage();
  const pageContent = content[language].homePage;
  const features = pageContent.features;

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-farm-1');
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold font-headline">{pageContent.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            {pageContent.hero.subtitle}
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/weather">{pageContent.hero.cta}</Link>
          </Button>
        </div>
      </section>

      <section id="features" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageContent.featuresTitle}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{pageContent.featuresSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {features.map((feature) => (
              <Card key={feature.id} className="text-center flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="p-4 bg-accent/20 rounded-full">
                    {icons[feature.id]}
                  </div>
                  <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="outline">
                    <Link href={feature.href}>{pageContent.learnMore}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
