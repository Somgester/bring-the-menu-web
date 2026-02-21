import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-2xl text-gradient  ">
            Bring the Menu
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#restaurants"
            className="text-gray-800 hover:text-purple-DEFAULT transition-colors"
          >
            For Restaurants
          </a>
          <a
            href="#customers"
            className="text-gray-800 hover:text-purple-DEFAULT transition-colors"
          >
            For Customers
          </a>
          <a
            href="#how-it-works"
            className="text-gray-800 hover:text-purple-DEFAULT transition-colors"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-gray-800 hover:text-purple-DEFAULT transition-colors"
          >
            Testimonials
          </a>
          <Button className="btn-gradient text-white">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-full shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a
              href="#restaurants"
              className="text-gray-800 hover:text-purple-DEFAULT transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Restaurants
            </a>
            <a
              href="#customers"
              className="text-gray-800 hover:text-purple-DEFAULT transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Customers
            </a>
            <a
              href="#how-it-works"
              className="text-gray-800 hover:text-purple-DEFAULT transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-800 hover:text-purple-DEFAULT transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <Button
              className="btn-gradient text-white w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
