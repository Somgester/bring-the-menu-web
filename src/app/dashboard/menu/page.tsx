"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuEditor } from "@/app/restaurant/[restaurant]/dashboard/components/menu-editor";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/loading";

export default function MenuPage() {
  const router = useRouter();
  const { user, restaurant, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user || !restaurant) {
      router.replace("/");
      return;
    }
  }, [user, restaurant, loading, router]);

  if (loading || !user || !restaurant) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage Menu</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage your menu sections and items
        </p>
      </div>
      <MenuEditor />
    </DashboardLayout>
  );
}
