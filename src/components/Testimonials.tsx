import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight, Check, Plus } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string; // 'restaurant' or 'customer'
  text: string;
  stars: number;
  company?: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Maria Rodriguez",
      role: "restaurant",
      company: "La Mesa Bonita",
      text: "Since implementing Bring the Menu, our order accuracy has improved by 95% and our waitstaff can focus more on customer service. Our guests love the interactive experience!",
      stars: 5
    },
    {
      id: 2,
      name: "Alex Chen",
      role: "customer",
      text: "I love being able to see high-quality photos of the dishes before I order. No more surprises when the food arrives, and I can take my time deciding without feeling pressured.",
      stars: 5
    },
    {
      id: 3,
      name: "James Wilson",
      role: "restaurant",
      company: "Urban Bites",
      text: "We've reduced our paper waste significantly and seen a 15% increase in average order value. The analytics help us understand which menu items are most popular.",
      stars: 4
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "customer",
      text: "So convenient! I can split the bill with friends easily and order additional items without having to flag down a server. Definitely enhances the dining experience.",
      stars: 5
    },
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <div id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animation-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            See how restaurants and diners are experiencing Bring the Menu.
          </p>
        </div>
        
        <div className="scroll-animation-container">
          <div className="relative">
            <Card className="bg-white shadow-xl mx-auto max-w-4xl relative">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  {/* Animated illustration side */}
                  <div className="bg-purple-light/30 p-8 flex items-center justify-center">
                    <div className="perspective-container">
                      <div className="relative w-full max-w-xs mx-auto">
                        {testimonials[activeIndex].role === 'restaurant' ? (
                          <div className="animate-float">
                            <div className="bg-white rounded-lg shadow-lg p-4 text-center">
                              <div className="font-bold mb-1">Digital Menu Dashboard</div>
                              <div className="flex justify-between text-xs bg-gray-100 p-1 rounded mb-2">
                                <span>Today's Orders</span>
                                <span className="font-bold">123</span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                                <div className="bg-purple-DEFAULT h-2 rounded-full" style={{width: '70%'}}></div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                {[1,2,3].map((i) => (
                                  <div key={i} className="bg-gray-100 p-1 rounded text-xs">
                                    <div className="h-1 w-full bg-purple-light mb-1"></div>
                                    Table {i}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="absolute -bottom-4 -right-4 bg-white rounded-full shadow-lg p-2 animate-pulse-light">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <Check size={16} />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="animate-float">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                              <div className="bg-purple-DEFAULT text-white p-3 text-sm">Table 8 • Menu</div>
                              <div className="p-3">
                                <div className="flex items-center space-x-2 mb-3">
                                  <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                                  <div>
                                    <div className="text-xs font-bold">Grilled Salmon</div>
                                    <div className="text-xs text-gray-500">$23.99</div>
                                  </div>
                                </div>
                                <div className="h-1 w-full bg-gray-100 mb-3"></div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="text-xs">
                                    <div className="h-1 w-full bg-gray-100 mb-1"></div>
                                    <div className="h-1 w-3/4 bg-gray-100"></div>
                                  </div>
                                  <div className="flex justify-end">
                                    <div className="bg-purple-DEFAULT text-white rounded-full text-xs py-1 px-3">
                                      Add
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg p-2 animate-pulse-light">
                              <div className="w-8 h-8 rounded-full bg-purple-light flex items-center justify-center text-purple-DEFAULT">
                                <Plus size={16} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial text side */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonials[activeIndex].stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg italic mb-6">
                      "{testimonials[activeIndex].text}"
                    </blockquote>
                    
                    <div>
                      <div className="font-bold">{testimonials[activeIndex].name}</div>
                      <div className="text-sm text-gray-500">
                        {testimonials[activeIndex].role === 'restaurant' 
                          ? `Owner, ${testimonials[activeIndex].company}` 
                          : 'Diner'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5 text-purple-DEFAULT" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
            >
              <ChevronRight className="w-5 h-5 text-purple-DEFAULT" />
            </button>
          </div>
          
          {/* Dots navigation */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                className={`w-2 h-2 rounded-full mx-1 transition-all ${
                  i === activeIndex ? 'bg-purple-DEFAULT w-6' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(i)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
