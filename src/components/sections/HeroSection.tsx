import NextImage from "next/image";
import { Utensils, ArrowRight } from "lucide-react";
import { SECTIONS } from "@/lib/constants";

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export function HeroSection({ onScrollToSection }: HeroSectionProps) {
  return (
    <section aria-labelledby="hero-heading" className="w-full py-12 md:py-20 lg:py-24 relative overflow-hidden bg-cream-DEFAULT">
      <div className="container px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-light border border-green-200 text-green-DEFAULT text-sm font-medium">
            <Utensils className="h-4 w-4" />
            <span>Contactless e-menu solution</span>
          </div>
          
          <div className="space-y-6">
            <h1 id="hero-heading" className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-green-DEFAULT leading-tight">
              DINE. SCAN. ORDER. DONE.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-green-medium/80 leading-relaxed font-sans">
              Transform your restaurant with digital QR code menus. Let customers order directly from their phones. Receive instant notifications for new orders.
            </p>
          </div>
          
          <div className="pt-2">
            <button
              onClick={() => onScrollToSection(SECTIONS.REGISTER)}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#2D5016] hover:bg-[#1A3009] text-white px-10 text-base font-semibold transition-all shadow-lg shadow-[#2D5016]/30 hover:shadow-xl hover:scale-105"
              aria-label="Get started for free"
            >
              Get Started for Free
              <ArrowRight className="ml-3 h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-4xl">
            <NextImage
              alt="Restaurant scene with QR code menu"
              className="mx-auto rounded-2xl object-cover object-center shadow-2xl"
              height={600}
              src="/hero-restaurant-scene.png"
              width={1200}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
