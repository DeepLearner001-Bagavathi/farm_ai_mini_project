import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, LifeBuoy } from "lucide-react";

const contactOptions = [
    {
        icon: <Phone className="w-8 h-8 text-accent" />,
        title: "Call Uzhavan Helpline",
        content: "For immediate assistance, call the toll-free number.",
        contact: "1800-425-1551",
    },
    {
        icon: <Mail className="w-8 h-8 text-accent" />,
        title: "Email Support",
        content: "Send your queries to our support team.",
        contact: "support@agri.tn.gov.in",
    },
    {
        icon: <LifeBuoy className="w-8 h-8 text-accent" />,
        title: "Help Center & FAQs",
        content: "Find answers to frequently asked questions on the TN Agriculture portal.",
        contact: "Visit agrisnet.tn.gov.in",
    },
]

export default function ContactPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Contact & Support</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Get in touch with us for any help or queries.
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
