"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

export default function MarketPricesPage() {
    const { language } = useLanguage();
    const pageContent = content[language].marketPricesPage;
    const { marketData } = pageContent;

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">{pageContent.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageContent.subtitle}
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{pageContent.tableHeaders.crop}</TableHead>
                <TableHead>{pageContent.tableHeaders.market}</TableHead>
                <TableHead>{pageContent.tableHeaders.price}</TableHead>
                <TableHead className="text-right">{pageContent.tableHeaders.lastUpdated}</TableHead>
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
