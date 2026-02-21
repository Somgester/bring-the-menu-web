"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Utensils, LogIn } from "lucide-react";
import { SECTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/AuthDialog";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

export function Header({ onScrollToSection }: HeaderProps) {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const { user, restaurant, logout } = useAuth();
  const router = useRouter();

  const handleDashboardClick = () => {
    // Redirect to home, which will automatically redirect to dashboard if logged in
    router.push("/");
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header role="banner" className="px-6 lg:px-12 h-20 flex items-center bg-white border-b border-green-100">
      <Link className="flex items-center justify-center" href="/" aria-label="Bring The Menu Home">
        <div className="w-10 h-10 rounded-full bg-green-light flex items-center justify-center mr-3">
          <Utensils className="h-6 w-6 text-green-DEFAULT" />
        </div>
        <span className="text-xl font-bold font-serif text-green-DEFAULT tracking-tight">
          BRING THE MENU
        </span>
      </Link>
      <nav className="ml-auto flex gap-6 items-center" aria-label="Main navigation">
        <button
          onClick={() => onScrollToSection(SECTIONS.FEATURES)}
          className="text-sm font-medium text-green-DEFAULT hover:text-green-medium transition-colors"
          aria-label="Navigate to Features section"
        >
          Features
        </button>
        <button
          onClick={() => onScrollToSection(SECTIONS.HOW_IT_WORKS)}
          className="text-sm font-medium text-green-DEFAULT hover:text-green-medium transition-colors"
          aria-label="Navigate to How it Works section"
        >
          How it Works
        </button>
        <button
          onClick={() => onScrollToSection(SECTIONS.REGISTER)}
          className="text-sm font-medium text-green-DEFAULT hover:text-green-medium transition-colors"
          aria-label="Navigate to Pricing section"
        >
          Pricing
        </button>
        
        {user ? (
          <>
            <Button
              onClick={handleDashboardClick}
              className="text-sm font-medium text-green-DEFAULT hover:text-green-medium transition-colors bg-green-light hover:bg-green-100 rounded-full px-6 py-2"
              aria-label="Go to dashboard"
            >
              Dashboard
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm font-medium text-green-DEFAULT hover:text-green-medium transition-colors border-green-200 hover:border-green-300 rounded-full px-6 py-2"
              aria-label="Logout"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <AuthDialog showDialog={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
              <Button
                variant="outline"
                className="text-sm font-medium text-green-DEFAULT hover:text-green-medium transition-colors border-green-200 hover:border-green-300 rounded-full px-6 py-2 flex items-center gap-2"
                aria-label="Login"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </AuthDialog>
            <button
              onClick={() => onScrollToSection(SECTIONS.REGISTER)}
              className="text-sm font-medium text-green-DEFAULT hover:text-green-medium transition-colors bg-green-light hover:bg-green-100 rounded-full px-6 py-2"
              aria-label="Become a partner"
            >
              Become a partner
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
