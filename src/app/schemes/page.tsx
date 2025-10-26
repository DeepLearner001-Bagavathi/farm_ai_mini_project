import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const schemesData = [
  {
    title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    content: "An income support scheme for all landholding farmer families. Under the scheme, ₹6,000 per year is provided in three equal installments of ₹2,000 each. This central sector scheme is 100% funded by the Government of India.",
  },
  {
    title: "Kalaignarin All Village Integrated Agricultural Development Programme",
    content: "Aims to make all villages in Tamil Nadu self-sufficient in agriculture over a period of five years. Focuses on water conservation, crop diversification, promoting modern farming techniques, and developing necessary infrastructure in all 12,525 village panchayats.",
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    content: "A crop insurance scheme to provide comprehensive insurance coverage and financial support to farmers in the event of failure of any of the notified crop as a result of natural calamities, pests & diseases.",
  },
  {
    title: "National Agriculture Market (e-NAM)",
    content: "A pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities. It provides better price discovery through a transparent auction process.",
  },
  {
    title: "Tamil Nadu Chief Minister's Uzhavar Pathukappu Thittam",
    content: "A social security scheme for farmers and agricultural labourers. It provides financial assistance for education, marriage, maternity, and natural death.",
  }
];

export default function SchemesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Government Schemes</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Information on agricultural schemes for farmers in Tamil Nadu.
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
