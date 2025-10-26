import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CloudSun, BarChart, ScrollText, Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <CloudSun className="w-8 h-8 text-accent" />,
    title: "Weather Forecast",
    description: "Stay ahead with accurate, real-time weather forecasts for your region.",
    href: "/weather",
  },
  {
    icon: <BarChart className="w-8 h-8 text-accent" />,
    title: "Market Prices",
    description: "Track live market prices for your produce to maximize your profits.",
    href: "/market-prices",
  },
  {
    icon: <ScrollText className="w-8 h-8 text-accent" />,
    title: "Government Schemes",
    description: "Discover and apply for beneficial government schemes and subsidies.",
    href: "/schemes",
  },
  {
    icon: <Bot className="w-8 h-8 text-accent" />,
    title: "AI Assistant",
    description: "Get personalized advice on schemes and farming practices.",
    href: "/assistant",
  },
];

export default function Home() {
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
          <h1 className="text-4xl md:text-6xl font-bold font-headline">Welcome to TN Agri Mitra</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Your AI-powered companion for smart and sustainable farming in Tamil Nadu.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/weather">Check Weather</Link>
          </Button>
        </div>
      </section>

      <section id="features" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Features</h2>
            <p className="mt-2 text-lg text-muted-foreground">Everything you need for modern agriculture.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="p-4 bg-accent/20 rounded-full">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="outline">
                    <Link href={feature.href}>Learn More</Link>
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
