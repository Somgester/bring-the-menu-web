import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Bell, Clock, BarChart3 } from "lucide-react";
import { IPhoneMockup } from "@/components/iPhoneMockup";
import { SECTIONS } from "@/lib/constants";

interface FeaturesSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export function FeaturesSection({ onScrollToSection }: FeaturesSectionProps) {
  return (
    <section id="features" className="w-full py-20 md:py-28 lg:py-32 bg-cream-DEFAULT relative overflow-hidden">
      <div className="container px-6 md:px-12 relative">
        <div className="grid grid-cols-12 gap-8 items-center max-w-7xl mx-auto">
          {/* Left Side Cards */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <Card className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="text-sm font-bold text-green-DEFAULT mb-2 tracking-wide">NO APP REQUIRED</div>
              <div className="w-12 h-12 rounded-full bg-green-DEFAULT flex items-center justify-center mt-4">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs text-green-medium/70 mt-3">Customers scan and order directly from their browser</p>
            </Card>
            
            <Button
              onClick={() => onScrollToSection(SECTIONS.REGISTER)}
              className="w-full h-14 rounded-xl bg-green-DEFAULT hover:bg-green-medium text-white text-base font-semibold shadow-lg shadow-green-DEFAULT/20 transition-all hover:scale-105"
              aria-label="Get started"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
          
          {/* Center - iPhone Mockups */}
          <div className="col-span-12 lg:col-span-6 flex justify-center items-center gap-4 relative">
            {/* Left iPhone - Customer scanning QR */}
            <div className="relative w-[180px] md:w-[220px] transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <IPhoneMockup variant="qr-scan" />
            </div>
            
            {/* Center iPhone - Menu browsing */}
            <div className="relative w-[200px] md:w-[240px] z-10">
              <IPhoneMockup variant="menu-browse" />
            </div>
            
            {/* Right iPhone - Order confirmation */}
            <div className="relative w-[180px] md:w-[220px] transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <IPhoneMockup variant="order-confirm" />
            </div>
          </div>
          
          {/* Right Side Cards */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <Card className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="text-sm font-bold text-green-DEFAULT mb-2 tracking-wide">INSTANT NOTIFICATIONS</div>
              <div className="flex gap-2 mt-4">
                <Bell className="h-5 w-5 text-green-DEFAULT" />
                <Clock className="h-5 w-5 text-green-DEFAULT" />
              </div>
              <p className="text-xs text-green-medium/70 mt-3">Get real-time alerts when orders come in</p>
            </Card>
            
            <Card className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="text-sm font-bold text-green-DEFAULT mb-2 tracking-wide">LIVE DASHBOARD</div>
              <div className="w-12 h-12 rounded-full bg-green-DEFAULT flex items-center justify-center mt-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs text-green-medium/70 mt-3">Track all orders with table numbers</p>
            </Card>
            
            <Button
              onClick={() => onScrollToSection(SECTIONS.REGISTER)}
              className="w-full h-14 rounded-xl border-2 border-green-DEFAULT bg-white hover:bg-green-light/20 text-green-DEFAULT text-base font-semibold transition-all hover:scale-105"
              aria-label="Get started"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
