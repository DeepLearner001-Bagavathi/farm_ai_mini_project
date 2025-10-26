"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";
import { Phone, Mail, LifeBuoy } from "lucide-react";

const icons: { [key: string]: React.ReactNode } = {
    phone: <Phone className="w-8 h-8 text-accent" />,
    email: <Mail className="w-8 h-8 text-accent" />,
    help: <LifeBuoy className="w-8 h-8 text-accent" />,
}

export default function ContactPage() {
    const { language } = useLanguage();
    const pageContent = content[language].contactPage;

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">{pageContent.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageContent.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pageContent.contactOptions.map((option) => (
            <Card key={option.id} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="items-center">
                    <div className="p-4 bg-secondary rounded-full">
                        {icons[option.id]}
                    </div>
                    <CardTitle className="mt-4 font-headline">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4 min-h-[40px]">{option.content}</p>
                    <p className="font-bold text-lg text-primary">{option.contact}</p>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
