
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudLightning, Droplets, Wind } from "lucide-react";
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

    const selectedDayWeather = pageContent.weatherData[activeIndex];

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
                        activeIndex === index ? 'bg-accent text-accent-foreground scale-105' : 'hover:bg-secondary/50'
                    )}
                    onClick={() => handleDayClick(index)}
                >
                  <p className="font-bold text-lg">{weather.day}</p>
                  <div className={cn(
                      "my-4",
                      activeIndex !== index && 'text-primary'
                    )}>{icons[weather.iconId]}</div>
                  <p className="text-2xl font-bold">{weather.temp}</p>
                  <p className={cn(
                      'transition-colors',
                      activeIndex !== index && 'text-muted-foreground'
                    )}>{weather.condition}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedDayWeather && (
          <div key={activeIndex} className="mt-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">{pageContent.detailsTitle} {selectedDayWeather.day}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                      <p className="text-muted-foreground text-lg">{selectedDayWeather.details}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                          <div className="bg-secondary p-4 rounded-lg">
                              <div className="flex justify-center items-center gap-2">
                                <Droplets className="w-6 h-6 text-primary" />
                                <p className="text-lg font-semibold">{pageContent.humidity}</p>
                              </div>
                              <p className="text-2xl font-bold mt-2">{selectedDayWeather.humidity}</p>
                          </div>
                          <div className="bg-secondary p-4 rounded-lg">
                              <div className="flex justify-center items-center gap-2">
                                <Wind className="w-6 h-6 text-primary" />
                                <p className="text-lg font-semibold">{pageContent.wind}</p>
                              </div>
                              <p className="text-2xl font-bold mt-2">{selectedDayWeather.wind}</p>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </div>
      )}
    </div>
  );
}
