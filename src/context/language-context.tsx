"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ta');

  useEffect(() => {
    const root = window.document.documentElement;
    root.lang = language;
    if (language === 'en') {
      root.classList.remove('font-tamil');
      root.classList.add('font-english');
    } else {
      root.classList.remove('font-english');
      root.classList.add('font-tamil');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
