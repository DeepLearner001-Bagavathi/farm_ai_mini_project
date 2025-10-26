import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CloudSun, BarChart, ScrollText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <CloudSun className="w-8 h-8 text-accent" />,
    title: "வானிலை முன்னறிவிப்பு",
    description: "உங்கள் பகுதிக்கான துல்லியமான, நிகழ்நேர வானிலை முன்னறிவிப்புகளுடன் முன்னேிருங்கள்.",
    href: "/weather",
  },
  {
    icon: <BarChart className="w-8 h-8 text-accent" />,
    title: "சந்தை விலைகள்",
    description: "உங்கள் விளைபொருட்களின் நேரடி சந்தை விலைகளைக் கண்காணித்து உங்கள் லாபத்தை அதிகரிக்கவும்.",
    href: "/market-prices",
  },
  {
    icon: <ScrollText className="w-8 h-8 text-accent" />,
    title: "அரசு திட்டங்கள்",
    description: "பயனுள்ள அரசாங்க திட்டங்கள் மற்றும் மானியங்களைக் கண்டறிந்து விண்ணப்பிக்கவும்.",
    href: "/schemes",
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
          <h1 className="text-4xl md:text-6xl font-bold font-headline">TN Agri Mitra-க்கு வரவேற்கிறோம்</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            தமிழ்நாட்டில் έξυπனான மற்றும் நிலையான விவசாயத்திற்கான உங்கள் AI-இயங்கும் துணை.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/weather">வானிலை சரிபார்க்கவும்</Link>
          </Button>
        </div>
      </section>

      <section id="features" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">எங்கள் அம்சங்கள்</h2>
            <p className="mt-2 text-lg text-muted-foreground">நவீன விவசாயத்திற்கு தேவையான அனைத்தும்.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
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
                    <Link href={feature.href}>மேலும் அறிக</Link>
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
