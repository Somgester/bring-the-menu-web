import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";
import { SECTIONS } from "@/lib/constants";

interface TestimonialsSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export function TestimonialsSection({ onScrollToSection }: TestimonialsSectionProps) {
  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-cream-DEFAULT">
      <div className="container px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Left - Testimonial */}
            <div className="space-y-8">
              <Quote className="h-20 w-20 text-green-light/60" aria-hidden="true" />
              <blockquote className="text-3xl md:text-4xl font-serif text-green-DEFAULT leading-relaxed font-bold">
                &ldquo;We increased our table turnover by 30% and reduced wait times. Customers love scanning and ordering directly from their phones!&rdquo;
              </blockquote>
              <div className="pt-4">
                <p className="text-lg font-semibold text-green-DEFAULT">- Restaurant Owner, The Bishop</p>
              </div>
            </div>
            
            {/* Right - Get Started CTA */}
            <div className="space-y-8">
              <h3 className="text-2xl font-serif font-bold text-green-DEFAULT">
                Ready to transform your restaurant?
              </h3>
              <p className="text-green-medium/70 text-base leading-relaxed">
                Join restaurants that are modernizing their ordering system with digital menus
              </p>
              <Button
                onClick={() => onScrollToSection(SECTIONS.REGISTER)}
                className="w-full h-14 rounded-xl bg-green-DEFAULT hover:bg-green-medium text-white text-base font-semibold shadow-lg shadow-green-DEFAULT/20 transition-all hover:scale-105"
                aria-label="Get started free"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
