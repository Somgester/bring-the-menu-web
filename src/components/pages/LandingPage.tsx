"use client";

import { useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { RegisterSection } from "@/components/sections/RegisterSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { scrollToSection } from "@/utils/scroll";

export function LandingPage() {
  useScrollAnimation();

  const handleScrollToSection = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
  }, []);

  return (
    <>
      <Header onScrollToSection={handleScrollToSection} />
      <main role="main" className="flex-1">
        <article>
          <HeroSection onScrollToSection={handleScrollToSection} />
          <HowItWorksSection />
          <FeaturesSection onScrollToSection={handleScrollToSection} />
          <TestimonialsSection onScrollToSection={handleScrollToSection} />
          <RegisterSection />
        </article>
      </main>
      <Footer />
    </>
  );
}
