import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  position: 'left' | 'right' | 'top' | 'bottom';
}

const InteractiveTable = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [qrCodeData, setQrCodeData] = useState<boolean[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 25 }).map(() => Math.random() > 0.6);
    setQrCodeData(data);
  }, []);
  
  // Sample menu items
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Truffle Pasta',
      description: 'Homemade pasta with black truffle and parmesan',
      price: 24.99,
      position: 'right',
    },
    {
      id: 2,
      name: 'Seared Salmon',
      description: 'Wild-caught salmon with lemon butter sauce',
      price: 29.99,
      position: 'left',
    },
    {
      id: 3,
      name: 'Artisan Burger',
      description: 'Wagyu beef with caramelized onions and brioche bun',
      price: 19.99,
      position: 'top',
    },
    {
      id: 4,
      name: 'Chocolate Soufflé',
      description: 'Warm chocolate soufflé with vanilla ice cream',
      price: 12.99,
      position: 'bottom',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animation-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">What's New?</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            No more paper menus. Just one scan, and your table is your order station. Simple. Seamless. Smart.
          </p>
        </div>
        
        <div className="flex justify-center scroll-animation-container">
          <div className="relative perspective-container w-full max-w-3xl">
            {/* The Table */}
            <div className="relative">
              {/* Table Surface */}
              <div className="bg-gradient-to-br from-[#EAEAEA] to-[#D1D1D1] rounded-lg aspect-[4/3] shadow-lg perspective-container">
                {/* QR Code in the center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="qr-code w-32 h-32 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-5 grid-rows-5 gap-1 w-24 h-24 bg-white p-2">
                      {qrCodeData.map((isFilled, i) => (
                        <div
                          key={i}
                          className={`${isFilled ? "bg-purple-DEFAULT" : "bg-gray-800"} rounded-sm`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Menu Items */}
                {menuItems.map((item) => {
                  let positionClasses = '';
                  
                  switch(item.position) {
                    case 'left':
                      positionClasses = 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2';
                      break;
                    case 'right':
                      positionClasses = 'right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2';
                      break;
                    case 'top':
                      positionClasses = 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
                      break;
                    case 'bottom':
                      positionClasses = 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2';
                      break;
                  }
                  
                  return (
                    <div 
                      key={item.id}
                      className={`absolute z-10 ${positionClasses}`}
                    >
                      <button
                        className={`w-16 h-16 rounded-full ${activeItem === item.id ? 'bg-purple-DEFAULT text-white' : 'bg-white hover:bg-purple-light/50'} 
                                  shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110`}
                        onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                      >
                        <span className="font-bold">{item.name.substring(0, 1)}</span>
                      </button>
                      
                      {activeItem === item.id && (
                        <Card className="absolute w-64 p-4 shadow-xl bg-white z-20 animate-scale-in">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <p className="text-gray-600 text-sm my-2">{item.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-bold text-purple-DEFAULT">${item.price.toFixed(2)}</span>
                            <button className="bg-purple-DEFAULT text-white px-3 py-1 rounded-full text-xs">
                              Add to order
                            </button>
                          </div>
                        </Card>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTable;
