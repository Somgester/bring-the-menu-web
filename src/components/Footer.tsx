import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-purple-dark text-white">
      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your Dining Experience?</h3>
          <div className="w-24 h-1 bg-purple-DEFAULT mx-auto mb-6"></div>
          <p className="text-purple-light/80 max-w-lg mb-8">
            Join restaurants around the world that are revolutionizing their service with Bring the Menu's digital solution.
          </p>
          <Button className="btn-gradient text-white px-8 py-6 h-auto text-lg hover:scale-105 transition-transform">
            Get Started Today
          </Button>
        </div>
        
        <div className="border-t border-gray-700">
          <div className="py-10 md:grid grid-cols-4 gap-8">
            <div className="mb-8 md:mb-0">
              <h4 className="text-xl font-bold mb-4 text-gradient">Bring the Menu</h4>
              <p className="text-purple-light/70 mb-6">
                No paper. No hassle. Just better dining.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-purple-DEFAULT/20 flex items-center justify-center hover:bg-purple-DEFAULT/40 transition-colors">
                  <Facebook size={18} className="text-purple-light" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-purple-DEFAULT/20 flex items-center justify-center hover:bg-purple-DEFAULT/40 transition-colors">
                  <Twitter size={18} className="text-purple-light" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-purple-DEFAULT/20 flex items-center justify-center hover:bg-purple-DEFAULT/40 transition-colors">
                  <Instagram size={18} className="text-purple-light" />
                </a>
              </div>
            </div>
            
            <div className="mb-8 md:mb-0">
              <h5 className="font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-purple-light/70 hover:text-white story-link">Home</a></li>
                <li><a href="#restaurants" className="text-purple-light/70 hover:text-white story-link">For Restaurants</a></li>
                <li><a href="#customers" className="text-purple-light/70 hover:text-white story-link">For Customers</a></li>
                <li><a href="#how-it-works" className="text-purple-light/70 hover:text-white story-link">How It Works</a></li>
                <li><a href="#testimonials" className="text-purple-light/70 hover:text-white story-link">Testimonials</a></li>
              </ul>
            </div>
            
            <div className="mb-8 md:mb-0">
              <h5 className="font-bold mb-4 uppercase text-sm tracking-wider">Resources</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-purple-light/70 hover:text-white story-link">Blog</a></li>
                <li><a href="#" className="text-purple-light/70 hover:text-white story-link">Support Center</a></li>
                <li><a href="#" className="text-purple-light/70 hover:text-white story-link">Privacy Policy</a></li>
                <li><a href="#" className="text-purple-light/70 hover:text-white story-link">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 uppercase text-sm tracking-wider">Contact</h5>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Mail size={16} className="text-purple-DEFAULT mr-3" />
                  <span className="text-purple-light/70">hello@bringthemenu.com</span>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="text-purple-DEFAULT mr-3" />
                  <span className="text-purple-light/70">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <MapPin size={16} className="text-purple-DEFAULT mr-3" />
                  <span className="text-purple-light/70">123 Menu Street, San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="py-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-purple-light/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Bring the Menu. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-purple-light/50">
            <a href="#" className="hover:text-purple-light">Privacy</a>
            <a href="#" className="hover:text-purple-light">Terms</a>
            <a href="#" className="hover:text-purple-light">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
