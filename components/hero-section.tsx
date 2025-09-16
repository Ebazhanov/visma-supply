"use client";

import { useLanguage } from "@/contexts/language-context";

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary text-primary-foreground py-20 md:py-32">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          VISMA
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-balance">
          {t.heroSubtitle}
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-pretty">
          {t.aboutText1}
        </p>
      </div>
    </section>
  );
}
