import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudLightning } from "lucide-react";

const weatherData = [
  { day: "Today", temp: "32°C", condition: "Sunny", icon: <Sun className="w-10 h-10" /> },
  { day: "Tomorrow", temp: "31°C", condition: "Partly Cloudy", icon: <Cloud className="w-10 h-10" /> },
  { day: "Fri, 28", temp: "29°C", condition: "Showers", icon: <CloudRain className="w-10 h-10" /> },
  { day: "Sat, 29", temp: "30°C", condition: "Thunderstorms", icon: <CloudLightning className="w-10 h-10" /> },
  { day: "Sun, 30", temp: "33°C", condition: "Sunny", icon: <Sun className="w-10 h-10" /> },
];

export default function WeatherPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Weather Forecast</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          5-Day forecast for Tamil Nadu (Placeholder Data).
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {weatherData.map((weather, index) => (
              <div key={weather.day} className={`flex flex-col items-center p-4 rounded-lg text-center ${index === 0 ? 'bg-secondary' : ''}`}>
                <p className="font-bold text-lg">{weather.day}</p>
                <div className="my-4 text-primary">{weather.icon}</div>
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
