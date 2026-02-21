import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Plus, ShoppingCart, Check } from 'lucide-react';

const SectionCustomers = () => {
  const [orderStep, setOrderStep] = useState(1); // 1: Scan, 2: Browse, 3: Order, 4: Done
  const [qrCodeData, setQrCodeData] = useState<boolean[]>([]);
  
  useEffect(() => {
    const data = Array.from({ length: 36 }).map(() => Math.random() > 0.7);
    setQrCodeData(data);
  }, []);

  useEffect(() => {
    const scrollElements = document.querySelectorAll(".scroll-animation-container");

    const handleScroll = () => {
      scrollElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("animated");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const foodItems = useMemo(() => [
    { id: 1, name: "Margherita Pizza", price: 14.99, description: "Classic tomato, mozzarella and basil" },
    { id: 2, name: "Chicken Alfredo", price: 17.99, description: "Creamy pasta with grilled chicken" },
    { id: 3, name: "Caesar Salad", price: 10.99, description: "Romaine lettuce with parmesan and croutons" },
  ], []);

  const changeStep = (step: number) => {
    if (step < 1) step = 4;
    if (step > 4) step = 1;
    setOrderStep(step);
  };

  return (
    <div id="customers" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animation-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            For <span className="text-gradient">Customers</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Ordering made fun. Scan. Browse. Order. Done.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="scroll-animation-container order-2 md:order-1">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">An Experience You'll Love</h3>
              <p className="text-gray-700">
                No more waiting for service or struggling with confusing paper menus. Our digital experience gives you control over your dining experience.
              </p>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-DEFAULT">
                  <h4 className="font-bold mb-2">No More Waiting</h4>
                  <p className="text-sm text-gray-600">Order when you're ready, not when your server has time. Take control of your dining experience.</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-DEFAULT">
                  <h4 className="font-bold mb-2">See What You're Getting</h4>
                  <p className="text-sm text-gray-600">High-quality images and detailed descriptions help you make informed choices.</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-DEFAULT">
                  <h4 className="font-bold mb-2">Track Your Order</h4>
                  <p className="text-sm text-gray-600">Follow your order from kitchen to table with real-time updates.</p>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button onClick={() => changeStep(orderStep - 1)} variant="outline" className="mx-2">Previous</Button>
                <Button onClick={() => changeStep(orderStep + 1)} className="btn-gradient text-white mx-2">Next Step</Button>
              </div>
            </div>
          </div>
          
          <div className="scroll-animation-container order-1 md:order-2">
            <div className="perspective-container">
              <Card className="overflow-hidden shadow-xl max-w-sm mx-auto">
                <div className="bg-purple-DEFAULT text-white p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">Table 12 • Bistro Deluxe</h3>
                    <MapPin size={18} />
                  </div>
                  <div className="mt-2 text-sm opacity-80">Order #MN-3872</div>
                </div>
                
                {orderStep === 1 && (
                  <div className="p-8 flex flex-col items-center justify-center min-h-[300px] animate-fade-in">
                    <div className="qr-code w-40 h-40 rounded-lg flex items-center justify-center mb-6">
                      <div className="grid grid-cols-6 grid-rows-6 gap-1 w-32 h-32">
                        {qrCodeData.map((isFilled, i) => (
                          <div
                            key={i}
                            className={`${isFilled ? "bg-purple-DEFAULT" : "bg-gray-800"} rounded-sm`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Scan to Start</h3>
                    <p className="text-sm text-gray-500 text-center">Use your phone's camera to scan this QR code and view the menu</p>
                  </div>
                )}
                
                {orderStep === 2 && (
                  <div className="p-4 animate-fade-in">
                    <div className="flex items-center border rounded-full p-2 mb-4">
                      <Search size={18} className="text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        placeholder="Search menu..." 
                        aria-label="Search menu"
                        className="bg-transparent outline-none flex-1 text-sm"
                      />
                    </div>
                    
                    <div className="flex overflow-x-auto no-scrollbar py-2 mb-4 gap-2">
                      <div className="bg-purple-DEFAULT text-white rounded-full px-4 py-1 text-sm whitespace-nowrap">All Items</div>
                      <div className="bg-gray-100 rounded-full px-4 py-1 text-sm whitespace-nowrap">Starters</div>
                      <div className="bg-gray-100 rounded-full px-4 py-1 text-sm whitespace-nowrap">Main Course</div>
                      <div className="bg-gray-100 rounded-full px-4 py-1 text-sm whitespace-nowrap">Desserts</div>
                      <div className="bg-gray-100 rounded-full px-4 py-1 text-sm whitespace-nowrap">Drinks</div>
                    </div>
                    
                    <div className="space-y-4 min-h-[220px]">
                      {foodItems.map((item) => (
                        <div key={item.id} className="flex justify-between border-b pb-3">
                          <div>
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.description}</p>
                            <div className="text-sm font-bold mt-1 text-purple-DEFAULT">${item.price.toFixed(2)}</div>
                          </div>
                          <div>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8 rounded-full border-purple-DEFAULT text-purple-DEFAULT hover:bg-purple-light/20"
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {orderStep === 3 && (
                  <div className="p-4 animate-fade-in">
                    <h3 className="font-bold mb-3">Your Order</h3>
                    <div className="space-y-3 min-h-[220px]">
                      <div className="flex justify-between items-center border-b pb-3">
                        <div>
                          <div className="flex items-center">
                            <span className="bg-purple-DEFAULT text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                            <h4 className="font-medium text-sm">Margherita Pizza</h4>
                          </div>
                          <p className="text-xs text-gray-500 ml-7">Classic tomato, mozzarella and basil</p>
                        </div>
                        <div className="text-sm font-bold">$14.99</div>
                      </div>
                      
                      <div className="flex justify-between items-center border-b pb-3">
                        <div>
                          <div className="flex items-center">
                            <span className="bg-purple-DEFAULT text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                            <h4 className="font-medium text-sm">Caesar Salad</h4>
                          </div>
                          <p className="text-xs text-gray-500 ml-7">Romaine lettuce with parmesan and croutons</p>
                        </div>
                        <div className="text-sm font-bold">$10.99</div>
                      </div>
                      
                      <div className="pt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">Subtotal</span>
                          <span className="text-sm font-medium">$25.98</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>$25.98</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="btn-gradient text-white w-full mt-4">
                      <ShoppingCart size={16} className="mr-2" />
                      Confirm Order
                    </Button>
                  </div>
                )}
                
                {orderStep === 4 && (
  <div className="p-8 flex flex-col items-center justify-center min-h-[300px] animate-fade-in">
    <div className="rounded-full bg-green-100 p-4 mb-4">
      <Check size={40} className="text-green-600" />
    </div>
    <h3 className="font-bold text-lg mb-2">Order Confirmed!</h3>
    <p className="text-sm text-gray-500 text-center">
      Thank you for ordering. Your food is being prepared and will arrive shortly.
    </p>
    <Button onClick={() => setOrderStep(1)} className="btn-gradient text-white mt-6">
      Start New Order
    </Button>
  </div>
)}

                
                <div className="bg-gray-50 p-4 flex justify-between items-center">
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 rounded-full ${orderStep >= 1 ? 'bg-purple-DEFAULT' : 'bg-gray-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${orderStep >= 2 ? 'bg-purple-DEFAULT' : 'bg-gray-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${orderStep >= 3 ? 'bg-purple-DEFAULT' : 'bg-gray-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${orderStep >= 4 ? 'bg-purple-DEFAULT' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {orderStep === 1 && 'Step 1: Scan'}
                    {orderStep === 2 && 'Step 2: Browse'}
                    {orderStep === 3 && 'Step 3: Order'}
                    {orderStep === 4 && 'Step 4: Done'}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCustomers;
