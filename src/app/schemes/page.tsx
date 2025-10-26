import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const schemesData = [
  {
    title: "பிரதம மந்திரி கிசான் சம்மன் நிதி (PM-KISAN)",
    content: "அனைத்து நில உரிமையாளர் விவசாயி குடும்பங்களுக்கும் வருமான ஆதரவு திட்டம். இத்திட்டத்தின் கீழ், ஒவ்வொரு ஆண்டும் ₹6,000 மூன்று சம தவணைகளில் தலா ₹2,000 வீதம் வழங்கப்படுகிறது. இந்த மத்திய துறை திட்டம் 100% இந்திய அரசால் நிதியளிக்கப்படுகிறது.",
  },
  {
    title: "கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சித் திட்டம்",
    content: "தமிழ்நாட்டில் உள்ள அனைத்து கிராமங்களையும் ஐந்து ஆண்டுகளில் விவசாயத்தில் தன்னிறைவு அடையச் செய்வதை நோக்கமாகக் கொண்டது. அனைத்து 12,525 கிராம ஊராட்சிகளிலும் நீர் சேமிப்பு, பயிர் பல்வகைப்படுத்தல், நவீன விவசாய நுட்பங்களை ஊக்குவித்தல் மற்றும் தேவையான உள்கட்டமைப்பை மேம்படுத்துதல் ஆகியவற்றில் கவனம் செலுத்துகிறது.",
  },
  {
    title: "பிரதம மந்திரி ஃபசல் பீமா யோஜனா (PMFBY)",
    content: "இயற்கை சீற்றங்கள், பூச்சிகள் மற்றும் நோய்களின் விளைவாக அறிவிக்கப்பட்ட பயிர்களில் ஏதேனும் தோல்வியுற்றால் விவசாயிகளுக்கு விரிவான காப்பீட்டுத் தொகை மற்றும் நிதி உதவியை வழங்குவதற்கான பயிர் காப்பீட்டுத் திட்டம்.",
  },
  {
    title: "தேசிய வேளாண் சந்தை (e-NAM)",
    content: "வேளாண் பொருட்களுக்கான ஒருங்கிணைந்த தேசிய சந்தையை உருவாக்க தற்போதுள்ள APMC மண்டிகளை இணைக்கும் ஒரு பான்-இந்தியா மின்னணு வர்த்தக போர்டல். இது ஒரு வெளிப்படையான ஏல செயல்முறை மூலம் சிறந்த விலை கண்டுபிடிப்பை வழங்குகிறது.",
  },
  {
    title: "தமிழ்நாடு முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்டம்",
    content: "விவசாயிகள் மற்றும் விவசாயத் தொழிலாளர்களுக்கான ஒரு சமூகப் பாதுகாப்புத் திட்டம். இது கல்வி, திருமணம், மகப்பேறு மற்றும் இயற்கை மரணத்திற்கு நிதி உதவி வழங்குகிறது.",
  }
];

export default function SchemesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">அரசு திட்டங்கள்</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          தமிழ்நாட்டில் உள்ள விவசாயிகளுக்கான விவசாயத் திட்டங்கள் பற்றிய தகவல்கள்.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {schemesData.map((scheme) => (
            <AccordionItem key={scheme.title} value={scheme.title}>
              <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">{scheme.title}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {scheme.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
