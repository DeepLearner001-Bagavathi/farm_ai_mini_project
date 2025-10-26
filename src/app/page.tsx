"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CloudSun, BarChart, ScrollText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";
import { useChatbot } from "@/components/ai/Chatbot";

const icons: { [key: string]: React.ReactNode } = {
  weather: <CloudSun className="w-8 h-8 text-accent" />,
  market: <BarChart className="w-8 h-8 text-accent" />,
  schemes: <ScrollText className="w-8 h-8 text-accent" />,
};


export default function Home() {
  const { language } = useLanguage();
  const { setOpen: setChatbotOpen } = useChatbot();
  const pageContent = content[language].homePage;
  const features = pageContent.features;

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-farm-1');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-1');
  const schemeImage = PlaceHolderImages.find(p => p.id === 'scheme-highlight-1');
  const ctaImage = PlaceHolderImages.find(p => p.id === 'cta-1');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
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
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/weather">{pageContent.hero.cta}</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
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

      {/* About Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{pageContent.aboutSection.title}</h2>
                    <p className="text-muted-foreground mb-4">{pageContent.aboutSection.p1}</p>
                    <p className="text-muted-foreground">{pageContent.aboutSection.p2}</p>
                </div>
                <div className="order-1 md:order-2">
                    {aboutImage && (
                        <Image 
                            src={aboutImage.imageUrl} 
                            alt={aboutImage.description} 
                            width={600} 
                            height={400} 
                            className="rounded-lg shadow-lg"
                            data-ai-hint={aboutImage.imageHint}
                        />
                    )}
                </div>
            </div>
        </div>
      </section>

      {/* Scheme Highlight Section */}
      <section className="py-12 md:py-20 bg-secondary/30">
          <div className="container mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                      {schemeImage && (
                          <Image 
                              src={schemeImage.imageUrl} 
                              alt={schemeImage.description} 
                              width={600} 
                              height={400} 
                              className="rounded-lg shadow-lg"
                              data-ai-hint={schemeImage.imageHint}
                          />
                      )}
                  </div>
                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{pageContent.schemeHighlight.title}</h2>
                      <p className="text-muted-foreground mb-6">{pageContent.schemeHighlight.description}</p>
                      <Button asChild>
                          <Link href="/schemes">{pageContent.schemeHighlight.cta}</Link>
                      </Button>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32">
          {ctaImage && (
              <Image 
                  src={ctaImage.imageUrl} 
                  alt={ctaImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={ctaImage.imageHint}
              />
          )}
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative container mx-auto text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageContent.cta.title}</h2>
              <p className="mt-4 text-lg max-w-3xl mx-auto">{pageContent.cta.description}</p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="mt-8"
                onClick={() => setChatbotOpen(true)}
              >
                {pageContent.cta.cta}
              </Button>
          </div>
      </section>

    </div>
  );
}
