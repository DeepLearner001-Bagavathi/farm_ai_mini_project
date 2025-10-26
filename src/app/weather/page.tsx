import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudLightning } from "lucide-react";

const weatherData = [
  { day: "இன்று", temp: "32°C", condition: "வெயில்", icon: <Sun className="w-10 h-10" /> },
  { day: "நாளை", temp: "31°C", condition: "பகுதி மேகமூட்டம்", icon: <Cloud className="w-10 h-10" /> },
  { day: "வெள்ளி, 28", temp: "29°C", condition: "மழை", icon: <CloudRain className="w-10 h-10" /> },
  { day: "சனி, 29", temp: "30°C", condition: "இடியுடன் கூடிய மழை", icon: <CloudLightning className="w-10 h-10" /> },
  { day: "ஞாயிறு, 30", temp: "33°C", condition: "வெயில்", icon: <Sun className="w-10 h-10" /> },
];

export default function WeatherPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">வானிலை முன்னறிவிப்பு</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          தமிழ்நாட்டிற்கான 5-நாள் முன்னறிவிப்பு (தற்காலிக தரவு).
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
