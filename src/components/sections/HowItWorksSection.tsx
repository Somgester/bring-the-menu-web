import { Card } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { IPhoneMockup } from "@/components/iPhoneMockup";

export function HowItWorksSection() {
  const steps = [
    {
      title: "Step 1: Register & Upload Menu",
      description: "Create your account and add your menu items with pictures and prices",
      variant: "menu-upload" as const,
    },
    {
      title: "Step 2: Generate QR Codes",
      description: "Create unique QR codes for each table. Print and place them on tables",
      variant: "qr-generate" as const,
    },
    {
      title: "Step 3: Receive Live Orders",
      description: "Watch orders roll into your dashboard with table numbers attached. Get instant notifications",
      variant: "dashboard" as const,
    },
  ];

  return (
    <section
      id="working"
      className="w-full py-20 md:py-28 lg:py-32 bg-white"
    >
      <div className="container px-6 md:px-12">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-light border border-green-200 text-green-DEFAULT text-sm font-medium">
            <Utensils className="h-4 w-4" />
            <span>Just 3 easy steps</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-green-DEFAULT">
            HOW IT WORKS
          </h2>
          <p className="max-w-2xl text-green-medium/70 text-lg leading-relaxed">
            Get your restaurant set up with digital menus in three simple steps
          </p>
        </div>
        
        <div className="mx-auto max-w-6xl space-y-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white rounded-2xl shadow-xl border-2 border-green-100 overflow-hidden">
              <div className={`grid md:grid-cols-2 gap-8 items-center p-8 ${index === 1 ? 'md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1' : ''}`}>
                <div className="space-y-4">
                  <div className="text-2xl font-serif font-bold text-green-DEFAULT">{step.title}</div>
                  <p className="text-green-medium/70 text-base">{step.description}</p>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-[200px]">
                    <IPhoneMockup variant={step.variant} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
