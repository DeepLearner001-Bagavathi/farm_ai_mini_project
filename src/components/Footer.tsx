"use client";

import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

export function Footer() {
  const { language } = useLanguage();
  const footerContent = content[language].footer;
  return (
    <footer className="border-t bg-background">
      <div className="container flex items-center justify-center h-16">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {footerContent.copyright}
        </p>
      </div>
    </footer>
  );
}
