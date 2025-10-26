"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudLightning } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

const icons: { [key: string]: React.ReactNode } = {
    sunny: <Sun className="w-10 h-10" />,
    cloudy: <Cloud className="w-10 h-10" />,
    rain: <CloudRain className="w-10 h-10" />,
    thunder: <CloudLightning className="w-10 h-10" />,
};

export default function WeatherPage() {
    const { language } = useLanguage();
    const pageContent = content[language].weatherPage;

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">{pageContent.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageContent.subtitle}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {pageContent.weatherData.map((weather, index) => (
              <div key={weather.day} className={`flex flex-col items-center p-4 rounded-lg text-center ${index === 0 ? 'bg-secondary' : ''}`}>
                <p className="font-bold text-lg">{weather.day}</p>
                <div className="my-4 text-primary">{icons[weather.iconId]}</div>
                <p className="text-2xl font-bold">{weather.temp}</p>
                <p className="text-muted-foreground">{weather.condition}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
