"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define the translations directly in this file to avoid import issues
export interface Translations {
  en: {
    [key: string]: string;
  };
  ru: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  en: {
    // Header
    about: "About Us",
    products: "Products",
    partners: "Partners",
    whyVisma: "Why Visma",
    contact: "Contact",
    // Hero Section
    heroTitle: "Innovative Solutions for a Digital World",
    heroSubtitle: "Global Reach. Local Advantage.",
    getStarted: "Get Started",
    // About Section
    aboutTitle: "Your Trusted Partner in Technical MRO Supply",
    aboutText1:
      "VISMA is a leading supplier of technical spare parts and related services. We are committed to procurement excellence, offering a flexible, reliable, and financially strong partnership.",
    aboutText2:
      "Our global reach and local advantage ensure that we can meet your needs anywhere in the world, providing high-quality products and tailored solutions.",
    // Products Section
    productsTitle: "Our Core Product Categories",
    // Partners Section
    partnersTitle: "Our Valued Partners",
    // Brands Section
    brandsTitle: "Shop Trusted Brands",
    brandsSubtitle:
      "We partner with the best in the industry to bring you high-quality and reliable solutions.",
    // Why Visma Section
    whyVismaTitle: "Why VISMA?",
    whyVismaSubtitle: "We're here to serve you, the ones who get it done!",
    // Benefits
    excellentReferences: "Excellent References",
    excellentReferencesDesc:
      "Proven track record with satisfied customers worldwide",
    reliablePartner: "Reliable Partner",
    reliablePartnerDesc:
      "Trustworthy partnership you can count on for all your MRO needs",
    globalSupply: "Global Supply Network",
    globalSupplyDesc:
      "Developed supply network spanning India, China, LAO, and North America",
    costOptimization: "Cost Optimization",
    costOptimizationDesc:
      "Supporting your savings targets through cost avoidance and reduction strategies",
    expertTeam: "Expert Team",
    expertTeamDesc:
      "Professional team with 15+ years international experience in FMCG companies",
    // Contact Section
    contactTitle: "Get in Touch",
    contactSubtitle: "We're ready to help with your technical MRO supply needs"
  },
  ru: {
    // Header
    about: "О нас",
    products: "Продукты",
    partners: "Партнеры",
    whyVisma: "Почему Visma",
    contact: "Контакт",
    // Hero Section
    heroTitle: "Инновационные решения для цифрового мира",
    heroSubtitle:
      "Расширение возможностей бизнеса с помощью передовых технологий и экспертного руководства.",
    getStarted: "Начать",
    // About Section
    aboutTitle: "Ваш надежный партнер в поставках технического MRO",
    aboutText1:
      "VISMA - ведущий поставщик технических запчастей и сопутствующих услуг. Мы стремимся к совершенству закупок, предлагая гибкое, надежное и финансово прочное партнерство.",
    aboutText2:
      "Наш глобальный охват и локальное преимущество гарантируют, что мы можем удовлетворить ваши потребности в любой точке мира, предоставляя высококачественные продукты и индивидуальные решения.",
    // Products Section
    productsTitle: "Наши основные категории продуктов",
    // Partners Section
    partnersTitle: "Наши ценные партнеры",
    // Brands Section
    brandsTitle: "Доверенные Бренды",
    brandsSubtitle:
      "Мы сотрудничаем с лучшими в отрасли, чтобы предложить вам высококачественные и надежные решения.",
    // Why Visma Section
    whyVismaTitle: "Почему VISMA?",
    whyVismaSubtitle: "Мы здесь, чтобы служить вам, тем, кто делает дело!",
    // Benefits
    excellentReferences: "Отличные Рекомендации",
    excellentReferencesDesc:
      "Проверенная репутация с довольными клиентами по всему миру",
    reliablePartner: "Надежный Партнер",
    reliablePartnerDesc:
      "Надежное партнерство, на которое вы можете рассчитывать для всех ваших потребностей MRO",
    globalSupply: "Глобальная Сеть Поставок",
    globalSupplyDesc:
      "Развитая сеть поставок, охватывающая Индию, Китай, ЛАО и Северную Америку",
    costOptimization: "Оптимизация Затрат",
    costOptimizationDesc:
      "Поддержка ваших целей по экономии за счет стратегий предотвращения и сокращения расходов",
    expertTeam: "Команда Экспертов",
    expertTeamDesc:
      "Профессиональная команда с более чем 15-летним международным опытом работы в компаниях FMCG",
    // Contact Section
    contactTitle: "Свяжитесь с Нами",
    contactSubtitle:
      "Мы готовы помочь с вашими потребностями в техническом снабжении MRO"
  }
};

type Language = "en" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // On mount, load language from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("language");
      if (storedLang === "en" || storedLang === "ru") {
        setLanguageState(storedLang);
      }
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    console.log('[LanguageContext] setLanguage called with:', lang);
    setLanguageState(lang);
  };

  useEffect(() => {
    console.log('[LanguageContext] language state changed:', language);
  }, [language]);

  const t = translations[language as Language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
