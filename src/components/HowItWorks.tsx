import React, { useEffect, useState } from 'react';
import { QrCode, ClipboardList, Clock, Check, ShoppingCart } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      icon: <QrCode className="text-purple-DEFAULT w-10 h-10" />,
      title: 'Scan',
      description: 'Customers scan a QR code placed on their table with their smartphone camera.'
    },
    {
      icon: <ClipboardList className="text-purple-DEFAULT w-10 h-10" />,
      title: 'Browse',
      description: 'They browse the interactive digital menu with photos and detailed descriptions.'
    },
    {
      icon: <ShoppingCart className="text-purple-DEFAULT w-10 h-10" />,
      title: 'Order',
      description: 'Customers place their order directly through their phone, no app download required.'
    },
    {
      icon: <Check className="text-purple-DEFAULT w-10 h-10" />,
      title: 'Done',
      description: 'The kitchen receives the order instantly, and customers can track its status.'
    }
  ];

  // Auto-advance timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div id="how-it-works" className="py-20 bg-gray-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animation-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">How It Works</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            It's more than just a digital menu. It's an experience – built for today's world.
          </p>
        </div>
        
        <div className="scroll-animation-container">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
            
            {/* Timeline steps */}
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row md:items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse md:text-right'
                }`}
              >
                {/* Circle indicator */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 bg-white z-10 border-purple-DEFAULT"></div>
                
                {/* Content */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div 
                    className={`bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-DEFAULT transition-all duration-500
                              ${activeStep === index ? 'transform scale-105' : ''}`}
                  >
                    <div className="flex items-center mb-3">
                      {step.icon}
                      <h3 className="text-xl font-bold ml-3">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeStep === index ? 'bg-purple-DEFAULT w-6' : 'bg-gray-400'
                }`}
                onClick={() => setActiveStep(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
