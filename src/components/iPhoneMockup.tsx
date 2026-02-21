import React from "react";
import { QrCode, Upload, Bell } from "lucide-react";

export interface IPhoneMockupProps {
  variant: "qr-scan" | "menu-browse" | "order-confirm" | "menu-upload" | "qr-generate" | "dashboard";
  className?: string;
}

const StatusBar = () => (
  <div className="h-6 bg-white flex items-center justify-between px-3 text-black text-[9px]">
    <span>9:41</span>
    <div className="flex gap-0.5">
      <div className="w-0.5 h-0.5 rounded-full bg-black"></div>
      <div className="w-0.5 h-0.5 rounded-full bg-black"></div>
      <div className="w-0.5 h-0.5 rounded-full bg-black"></div>
    </div>
  </div>
);

const DarkStatusBar = () => (
  <div className="h-8 bg-black flex items-center justify-between px-6 text-white text-[10px]">
    <span>9:41</span>
    <div className="flex gap-1">
      <div className="w-1 h-1 rounded-full bg-white"></div>
      <div className="w-1 h-1 rounded-full bg-white"></div>
      <div className="w-1 h-1 rounded-full bg-white"></div>
    </div>
  </div>
);

export function IPhoneMockup({ variant, className = "" }: IPhoneMockupProps) {
  const renderScreen = () => {
    switch (variant) {
      case "qr-scan":
        return (
          <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-6 relative">
            <DarkStatusBar />
            <div className="text-center space-y-4">
              <div className="w-32 h-32 border-4 border-green-DEFAULT rounded-lg relative">
                <QrCode className="h-24 w-24 mx-auto text-green-DEFAULT/30" />
                <div className="absolute inset-0 border-2 border-green-DEFAULT animate-pulse"></div>
              </div>
              <div className="text-white text-sm font-semibold">Scan QR Code</div>
              <div className="text-green-DEFAULT text-xs">Table 5</div>
            </div>
          </div>
        );

      case "menu-browse":
        return (
          <div className="w-full h-full bg-white flex flex-col">
            <StatusBar />
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="text-lg font-bold text-green-DEFAULT mb-2">Menu</div>
              <div className="bg-green-light/30 rounded-lg p-3">
                <div className="w-full h-20 bg-green-DEFAULT/20 rounded mb-2"></div>
                <div className="font-semibold text-sm text-green-DEFAULT">Pasta Carbonara</div>
                <div className="text-xs text-green-medium/70">$18.99</div>
              </div>
              <div className="bg-green-light/30 rounded-lg p-3">
                <div className="w-full h-20 bg-green-DEFAULT/20 rounded mb-2"></div>
                <div className="font-semibold text-sm text-green-DEFAULT">Margherita Pizza</div>
                <div className="text-xs text-green-medium/70">$16.50</div>
              </div>
              <div className="fixed bottom-4 left-4 right-4 bg-green-DEFAULT text-white rounded-lg py-2 text-center text-sm font-semibold">
                Add to Cart
              </div>
            </div>
          </div>
        );

      case "order-confirm":
        return (
          <div className="w-full h-full bg-gradient-to-b from-green-light to-white flex flex-col items-center justify-center p-6 relative">
            <div className="absolute top-0 left-0 right-0 h-8 bg-white flex items-center justify-between px-4 text-black text-[10px]">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-black"></div>
                <div className="w-1 h-1 rounded-full bg-black"></div>
                <div className="w-1 h-1 rounded-full bg-black"></div>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-DEFAULT rounded-full flex items-center justify-center">
                <span className="text-4xl text-white">✓</span>
              </div>
              <div className="text-2xl font-bold text-green-DEFAULT">Order Placed!</div>
              <div className="text-green-medium/70 text-sm">Table 5</div>
              <div className="bg-white rounded-lg p-4 mt-4 shadow-md">
                <div className="text-xs text-green-medium/70 mb-1">Order Total</div>
                <div className="text-lg font-bold text-green-DEFAULT">$35.49</div>
              </div>
            </div>
          </div>
        );

      case "menu-upload":
        return (
          <div className="w-full h-full bg-white flex flex-col p-4">
            <StatusBar />
            <div className="text-sm font-bold text-green-DEFAULT mb-4">Upload Menu</div>
            <div className="flex-1 space-y-2">
              <div className="border-2 border-dashed border-green-DEFAULT rounded-lg p-4 text-center">
                <Upload className="h-6 w-6 mx-auto mb-2 text-green-DEFAULT" />
                <div className="text-xs text-green-DEFAULT">Add Menu Item</div>
              </div>
              <div className="bg-green-light/30 rounded p-2">
                <div className="text-xs font-semibold text-green-DEFAULT">Pasta Carbonara</div>
                <div className="text-[10px] text-green-medium/70">$18.99</div>
              </div>
              <div className="bg-green-light/30 rounded p-2">
                <div className="text-xs font-semibold text-green-DEFAULT">Margherita Pizza</div>
                <div className="text-[10px] text-green-medium/70">$16.50</div>
              </div>
            </div>
          </div>
        );

      case "qr-generate":
        return (
          <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6 relative">
            <div className="absolute top-0 left-0 right-0 h-6 bg-white flex items-center justify-between px-3 text-black text-[9px]">
              <span>9:41</span>
              <div className="flex gap-0.5">
                <div className="w-0.5 h-0.5 rounded-full bg-black"></div>
                <div className="w-0.5 h-0.5 rounded-full bg-black"></div>
                <div className="w-0.5 h-0.5 rounded-full bg-black"></div>
              </div>
            </div>
            <div className="text-sm font-bold text-green-DEFAULT mb-4">Generate QR Code</div>
            <div className="w-32 h-32 bg-white border-4 border-green-DEFAULT rounded-lg flex items-center justify-center mb-3">
              <QrCode className="h-24 w-24 text-green-DEFAULT" />
            </div>
            <div className="text-sm font-semibold text-green-DEFAULT">Table 5</div>
            <div className="text-xs text-green-medium/70 mt-1">Ready to Print</div>
            <div className="mt-4 bg-green-DEFAULT text-white rounded-lg px-4 py-2 text-xs font-semibold">
              Download QR Code
            </div>
          </div>
        );

      case "dashboard":
        return (
          <div className="w-full h-full bg-white flex flex-col">
            <StatusBar />
            <div className="flex-1 p-3 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold text-green-DEFAULT">Live Orders</div>
                <div className="w-2 h-2 bg-green-DEFAULT rounded-full animate-pulse"></div>
              </div>
              <div className="bg-green-light/30 rounded-lg p-2 border-l-4 border-green-DEFAULT">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold text-green-DEFAULT">New Order!</div>
                  <Bell className="h-4 w-4 text-green-DEFAULT" />
                </div>
                <div className="text-[10px] text-green-medium/70">Table 5</div>
                <div className="text-[10px] text-green-medium/70">Carbonara - $18.99</div>
              </div>
              <div className="bg-green-light/20 rounded-lg p-2">
                <div className="text-xs font-semibold text-green-DEFAULT">Table 3</div>
                <div className="text-[10px] text-green-medium/70">Pizza - $16.50</div>
              </div>
              <div className="bg-green-light/20 rounded-lg p-2">
                <div className="text-xs font-semibold text-green-DEFAULT">Table 7</div>
                <div className="text-[10px] text-green-medium/70">Burger - $14.99</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-[2.5rem] p-2 shadow-2xl ${className}`}>
      <div className="bg-black rounded-[2rem] overflow-hidden aspect-[9/19.5] relative">
        {renderScreen()}
      </div>
    </div>
  );
}
