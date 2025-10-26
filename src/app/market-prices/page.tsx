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
  { crop: "Paddy", market: "Thanjavur", price: "₹2,183 / Quintal", date: "2024-07-26" },
  { crop: "Turmeric", market: "Erode", price: "₹17,500 / Quintal", date: "2024-07-26" },
  { crop: "Coconut", market: "Pollachi", price: "₹28 / Kg", date: "2024-07-25" },
  { crop: "Onion", market: "Dindigul", price: "₹3,500 / Quintal", date: "2024-07-26" },
  { crop: "Tomato", market: "Coimbatore", price: "₹2,200 / Quintal", date: "2024-07-26" },
  { crop: "Sugarcane", market: "Villupuram", price: "₹2,950 / Tonne", date: "2024-07-25" },
  { crop: "Cotton", market: "Salem", price: "₹6,800 / Quintal", date: "2024-07-25" },
];

export default function MarketPricesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Market Prices</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Latest agricultural commodity prices from markets in Tamil Nadu (Placeholder Data).
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
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
