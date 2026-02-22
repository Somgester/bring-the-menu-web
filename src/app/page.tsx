"use client";

import { useAuth } from "@/hooks/useAuth";
import { LandingPage } from "@/components/pages/LandingPage";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { LoadingSpinner } from "@/components/ui/loading";

/**
 * Root page component
 * Shows personalized dashboard if user is logged in, otherwise shows landing page
 * Similar to Instagram's behavior where instagram.com shows your feed when logged in
 * URL stays as "/" - no restaurant ID in the URL
 */
export default function Home() {
  const { user, restaurant, loading } = useAuth();

  // Show loading state while checking authentication
  // If Firebase is not configured, loading will be false and we'll show landing page
  if (loading) {
    return <LoadingSpinner />;
  }

  // If user is logged in and has a restaurant, show their dashboard
  if (user && restaurant) {
    return <Dashboard />;
  }

  // Show landing page for non-logged-in users or if Firebase is not configured
  return <LandingPage />;
}
