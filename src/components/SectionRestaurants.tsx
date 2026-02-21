import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Settings, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SectionRestaurants = () => {
  const features = [
    {
      icon: <Settings className="h-6 w-6 text-purple-DEFAULT" />,
      title: 'Easy Menu Customization',
      description: 'Drag-and-drop interface to design your perfect menu in minutes'
    },
    {
      icon: <Calendar className="h-6 w-6 text-purple-DEFAULT" />,
      title: 'Real-Time Updates',
      description: 'Change prices, add specials, or update items instantly'
    },
    {
      icon: <Check className="h-6 w-6 text-purple-DEFAULT" />,
      title: 'Simple Integration',
      description: 'Works with your existing POS system with minimal setup'
    },
    {
      icon: <Star className="h-6 w-6 text-purple-DEFAULT" />,
      title: 'Customer Insights',
      description: 'Gain valuable data on popular dishes and ordering patterns'
    }
  ];

  return (
    <div id="restaurants" className="py-20 bg-gray-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animation-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            For <span className="text-gradient">Restaurants</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            From registration to menu creation, the future of dining is here. Manage your restaurant with just a few clicks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="scroll-animation-container">
            <div className="relative perspective-container">
              <Card className="card-3d overflow-hidden shadow-xl">
                <CardContent className="p-0">
                  <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-white text-xs ml-2">Menu Editor</div>
                  </div>

                  <div className="p-6 bg-white">
                    <div className="flex gap-4 mb-6">
                      <div className="w-1/3 bg-gray-100 p-3 rounded-lg shadow-inner">
                        <div className="font-bold text-sm mb-2">Menu Categories</div>
                        <div className="space-y-2">
                          <div className="bg-purple-DEFAULT text-white text-xs p-2 rounded">Appetizers</div>
                          <div className="bg-gray-200 text-xs p-2 rounded">Main Courses</div>
                          <div className="bg-gray-200 text-xs p-2 rounded">Desserts</div>
                          <div className="bg-gray-200 text-xs p-2 rounded">Drinks</div>
                        </div>
                      </div>

                      <div className="w-2/3 bg-white border rounded-lg p-3">
                        <div className="font-bold text-sm mb-2">Appetizers</div>
                        <div className="space-y-3">
                          <div className="border p-2 rounded-lg flex justify-between items-center bg-white shadow-sm">
                            <div>
                              <div className="text-xs font-medium">Calamari Fritti</div>
                              <div className="text-xs text-gray-500">$12.99</div>
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-4 h-4 bg-gray-200 rounded-sm flex items-center justify-center text-[10px]">↑</div>
                              <div className="w-4 h-4 bg-gray-200 rounded-sm flex items-center justify-center text-[10px]">↓</div>
                              <div className="w-4 h-4 bg-gray-200 rounded-sm flex items-center justify-center text-[10px]">✏️</div>
                            </div>
                          </div>
                          
                          <div className="border-2 border-purple-DEFAULT p-2 rounded-lg flex justify-between items-center bg-purple-light/10 shadow-sm">
                            <div>
                              <div className="text-xs font-medium">Bruschetta</div>
                              <div className="text-xs text-gray-500">$9.99</div>
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-4 h-4 bg-purple-light rounded-sm flex items-center justify-center text-[10px]">↑</div>
                              <div className="w-4 h-4 bg-purple-light rounded-sm flex items-center justify-center text-[10px]">↓</div>
                              <div className="w-4 h-4 bg-purple-light rounded-sm flex items-center justify-center text-[10px]">✏️</div>
                            </div>
                          </div>

                          <div className="border border-dashed border-gray-300 p-2 rounded-lg flex items-center justify-center">
                            <div className="text-xs text-gray-400">+ Add Item</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" className="text-xs">Preview</Button>
                      <Button size="sm" className="btn-gradient text-white text-xs">Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-light/30 rounded-full blur-xl -z-10"></div>
            </div>
          </div>

          <div className="scroll-animation-container">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Streamline Your Restaurant Operations</h3>
              <p className="text-gray-700">
                Our easy-to-use platform helps you create stunning digital menus that enhance the dining experience while simplifying your workflow.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="hover-card bg-white p-4 rounded-lg shadow-md transition-all duration-300"
                  >
                    <div className="rounded-full bg-purple-light/30 w-10 h-10 flex items-center justify-center mb-3">
                      {feature.icon}
                    </div>
                    <h4 className="font-bold mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              <Button className="btn-gradient text-white w-full">Get Started For Your Restaurant</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionRestaurants;