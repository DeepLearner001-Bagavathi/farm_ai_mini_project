"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudLightning } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";
import { useState } from "react";
import { cn } from "@/lib/utils";

const icons: { [key: string]: React.ReactNode } = {
    sunny: <Sun className="w-10 h-10" />,
    cloudy: <Cloud className="w-10 h-10" />,
    rain: <CloudRain className="w-10 h-10" />,
    thunder: <CloudLightning className="w-10 h-10" />,
};

export default function WeatherPage() {
    const { language } = useLanguage();
    const pageContent = content[language].weatherPage;
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleDayClick = (index: number) => {
        setActiveIndex(index);
    }

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <h1 className="text-4xl font-bold font-headline">{pageContent.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageContent.subtitle}
        </p>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {pageContent.weatherData.map((weather, index) => (
                <div 
                    key={weather.day} 
                    className={cn(
                        `flex flex-col items-center p-4 rounded-lg text-center cursor-pointer transition-all duration-300`,
                        activeIndex === index ? 'bg-accent/20 scale-105' : 'hover:bg-secondary/50'
                    )}
                    onClick={() => handleDayClick(index)}
                >
                  <p className="font-bold text-lg">{weather.day}</p>
                  <div className={cn(
                      "my-4",
                      activeIndex === index ? 'text-accent-foreground' : 'text-primary'
                    )}>{icons[weather.iconId]}</div>
                  <p className="text-2xl font-bold">{weather.temp}</p>
                  <p className={cn(
                      activeIndex === index ? 'text-accent-foreground/80' : 'text-muted-foreground'
                    )}>{weather.condition}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
