
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CloudSun, BarChart, ScrollText, Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";
import { useChatbot } from "@/components/ai/Chatbot";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";


const icons: { [key: string]: React.ReactNode } = {
  weather: <CloudSun className="w-8 h-8 text-accent" />,
  market: <BarChart className="w-8 h-8 text-accent" />,
  schemes: <ScrollText className="w-8 h-8 text-accent" />,
  assistant: <Bot className="w-8 h-8 text-accent" />,
};


export default function Home() {
  const { language } = useLanguage();
  const { setOpen: setChatbotOpen } = useChatbot();
  const pageContent = content[language].homePage;
  const features = pageContent.features;
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-farm-1');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-1');
  const schemeImage = PlaceHolderImages.find(p => p.id === 'scheme-highlight-1');
  const ctaImage = PlaceHolderImages.find(p => p.id === 'cta-1');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-screen">
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
          <h1 className="text-4xl md:text-6xl font-bold font-headline animate-in fade-in duration-[2000ms]">{pageContent.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl animate-in fade-in duration-[2000ms] delay-500">
            {pageContent.hero.subtitle}
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 animate-in fade-in duration-[2000ms] delay-1000">
            <Link href="/weather">{pageContent.hero.cta}</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline animate-in fade-in slide-in-from-bottom-10 duration-700">{pageContent.featuresTitle}</h2>
            <p className="mt-2 text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100">{pageContent.featuresSubtitle}</p>
          </div>
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-sm md:max-w-xl lg:max-w-4xl mx-auto"
          >
            <CarouselContent>
              {features.map((feature, i) => (
                <CarouselItem key={feature.id} className="md:basis-1/2">
                  <div className="p-1 h-full">
                    <Card className="text-center flex flex-col hover:shadow-lg transition-shadow duration-300 h-full">
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
                        {feature.href ? (
                          <Button asChild variant="outline">
                            <Link href={feature.href}>{pageContent.learnMore}</Link>
                          </Button>
                        ) : (
                          <Button variant="outline" onClick={() => setChatbotOpen(true)}>
                            {pageContent.learnMore}
                          </Button>
                        )}
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            
          </Carousel>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 animate-in fade-in slide-in-from-left-20 duration-1000">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{pageContent.aboutSection.title}</h2>
                    <p className="text-muted-foreground mb-4">{pageContent.aboutSection.p1}</p>
                    <p className="text-muted-foreground">{pageContent.aboutSection.p2}</p>
                </div>
                <div className="order-1 md:order-2 animate-in fade-in slide-in-from-right-20 duration-1000">
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
      <section className="py-12 md:py-20 bg-secondary/30 overflow-hidden">
          <div className="container mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="animate-in fade-in slide-in-from-left-20 duration-1000">
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
                  <div className="animate-in fade-in slide-in-from-right-20 duration-1000">
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
          <div className="relative container mx-auto text-center text-primary-foreground animate-in fade-in duration-1000">
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
