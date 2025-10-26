import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, LifeBuoy } from "lucide-react";

const contactOptions = [
    {
        icon: <Phone className="w-8 h-8 text-accent" />,
        title: "உழவன் உதவி மையத்தை அழைக்கவும்",
        content: "உடனடி உதவிக்கு, கட்டணமில்லா எண்ணை அழைக்கவும்.",
        contact: "1800-425-1551",
    },
    {
        icon: <Mail className="w-8 h-8 text-accent" />,
        title: "மின்னஞ்சல் ஆதரவு",
        content: "உங்கள் கேள்விகளை எங்கள் ஆதரவுக் குழுவிற்கு அனுப்பவும்.",
        contact: "support@agri.tn.gov.in",
    },
    {
        icon: <LifeBuoy className="w-8 h-8 text-accent" />,
        title: "உதவி மையம் & அடிக்கடி கேட்கப்படும் கேள்விகள்",
        content: "TN வேளாண்மை போர்ட்டலில் அடிக்கடி கேட்கப்படும் கேள்விகளுக்கான பதில்களைக் கண்டறியவும்.",
        contact: "agrisnet.tn.gov.in ஐப் பார்வையிடவும்",
    },
]

export default function ContactPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">தொடர்பு & ஆதரவு</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          எந்தவொரு உதவி அல்லது கேள்விகளுக்கும் எங்களைத் தொடர்பு கொள்ளுங்கள்.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contactOptions.map((option) => (
            <Card key={option.title} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="items-center">
                    <div className="p-4 bg-secondary rounded-full">
                        {option.icon}
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
