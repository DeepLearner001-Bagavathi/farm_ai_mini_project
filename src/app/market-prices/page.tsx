import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const marketData = [
  { crop: "நெல்", market: "தஞ்சாவூர்", price: "₹2,183 / குவிண்டால்", date: "2024-07-26" },
  { crop: "மஞ்சள்", market: "ஈரோடு", price: "₹17,500 / குவிண்டால்", date: "2024-07-26" },
  { crop: "தேங்காய்", market: "பொள்ளாச்சி", price: "₹28 / கிலோ", date: "2024-07-25" },
  { crop: "வெங்காயம்", market: "திண்டுக்கல்", price: "₹3,500 / குவிண்டால்", date: "2024-07-26" },
  { crop: "தக்காளி", market: "கோயம்புத்தூர்", price: "₹2,200 / குவிண்டால்", date: "2024-07-26" },
  { crop: "கரும்பு", market: "விழுப்புரம்", price: "₹2,950 / டன்", date: "2024-07-25" },
  { crop: "பருத்தி", market: "சேலம்", price: "₹6,800 / குவிண்டால்", date: "2024-07-25" },
];

export default function MarketPricesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">சந்தை விலைகள்</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          தமிழ்நாட்டில் உள்ள சந்தைகளில் இருந்து சமீபத்திய விவசாயப் பொருட்களின் விலைகள் (தற்காலிக தரவு).
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>பயிர்</TableHead>
                <TableHead>சந்தை</TableHead>
                <TableHead>விலை</TableHead>
                <TableHead className="text-right">கடைசியாகப் புதுப்பித்தது</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketData.map((item) => (
                <TableRow key={item.crop}>
                  <TableCell className="font-medium">{item.crop}</TableCell>
                  <TableCell>{item.market}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell className="text-right">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
