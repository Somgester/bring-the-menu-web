import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [qrCodeData, setQrCodeData] = useState<boolean[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-animation-container');
      
      scrollElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animated');
        }
      });
    };

    const data = Array.from({ length: 16 }).map(() => Math.random() > 0.7);
    setQrCodeData(data);
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on load
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-soft to-white -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-light/20 rounded-full blur-3xl -z-10 animate-pulse-light"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-light/20 rounded-full blur-3xl -z-10 animate-pulse-light delay-1000"></div>
      
      <div className="container mx-auto px-4 pt-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8 scroll-animation-container">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Reimagine Dining with a Scan<span className="text-purple-DEFAULT">.</span><br/>
              <span className="text-gradient">Your Menu. Your Table. Your Order.</span>
            </h1>
            <p className="text-lg text-gray-700">
              Transform how your customers experience dining with a seamless, interactive digital menu solution. No more paper menus – just a simple scan to place orders directly from their table.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-gradient text-white group transition-all">
                Get Started 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              <Button size="lg" variant="outline" className="border-purple-DEFAULT text-purple-DEFAULT hover:bg-purple-light/20">
                Discover the Future of Dining
              </Button>
            </div>
          </div>
          
          <div className="perspective-container scroll-animation-container">
            <div className="relative">
              <div className="card-3d bg-white rounded-xl shadow-xl p-6 border border-gray-200">
                <div className="absolute -top-5 -right-5 w-24 h-24 bg-purple-DEFAULT rounded-lg flex items-center justify-center animate-float">
                  <div className="qr-code w-16 h-16 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-4 grid-rows-4 gap-1 w-12 h-12">
                      {qrCodeData.map((isFilled, i) => (
                        <div
                          key={i}
                          className={`${isFilled ? "bg-purple-DEFAULT" : "bg-gray-800"} rounded-sm`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="h-48 bg-gray-soft rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600" 
                      alt="Digital menu on device" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-6 bg-purple-light/30 rounded-full w-3/4"></div>
                    <div className="h-4 bg-purple-light/20 rounded-full"></div>
                    <div className="h-4 bg-purple-light/20 rounded-full w-5/6"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="h-10 w-24 bg-purple-DEFAULT rounded-full"></div>
                    <div className="h-10 w-10 border-2 border-purple-DEFAULT rounded-full flex items-center justify-center text-purple-DEFAULT">+</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-sky/10 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-20">
        <div className="section-divider mx-auto w-1/2 my-8"></div>
      </div>
    </div>
  );
};

export default Hero;