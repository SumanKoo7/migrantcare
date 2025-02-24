"use client";

import { useState, useEffect } from "react";
import tamil from "./tamil.json";
import telugu from "./telugu.json";
import hindi from "./hindi.json";
import kannada from "./kannada.json";
import malayalam from "./malayalam.json";

const translations = { tamil, telugu, hindi, kannada, malayalam };
type Language = keyof typeof translations;

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("tamil");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && translations[savedLang]) setLanguage(savedLang);
  }, []);

  const t = (key: keyof typeof tamil) => translations[language][key] || key;

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return { t, switchLanguage, language };
}