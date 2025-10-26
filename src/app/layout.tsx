import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot, ChatbotProvider } from '@/components/ai/Chatbot';
import { LanguageProvider } from '@/context/language-context';

export const metadata: Metadata = {
  title: 'TN Ulavan',
  description: 'Your AI farming assistant for Tamil Nadu agriculture.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <ChatbotProvider>
        <RootContent>{children}</RootContent>
      </ChatbotProvider>
    </LanguageProvider>
  );
}

function RootContent({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ta" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
