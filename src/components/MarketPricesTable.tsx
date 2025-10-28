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
import { useState, useEffect } from 'react';

export function MarketPricesTable() {
    const { language } = useLanguage();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Prevent rendering on the server and during initial client hydration
    if (!isClient) {
        // You can return a loading skeleton here for better UX
        return null;
    }
    
    const pageContent = content[language].marketPricesPage;
    const { marketData } = pageContent;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{pageContent.tableHeaders.crop}</TableHead>
                  <TableHead>{pageeContent.tableHeaders.market}</TableHead>
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
