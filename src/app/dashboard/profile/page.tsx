"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/app/restaurant/[restaurant]/dashboard/components/profile";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/loading";

export default function ProfilePage() {
  const router = useRouter();
  const { user, restaurant, loading } = useAuth();

  // Protect route - verify user is logged in
  useEffect(() => {
    if (loading) return;

    if (!user || !restaurant) {
      router.replace("/");
      return;
    }
  }, [user, restaurant, loading, router]);

  // Show loading while checking auth
  if (loading || !user || !restaurant) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Restaurant Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your restaurant information and settings
        </p>
      </div>
      <Profile />
    </DashboardLayout>
  );
}
