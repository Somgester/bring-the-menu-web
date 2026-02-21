"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/loading";

export default function SettingsPage() {
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
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your restaurant settings and preferences
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Settings</CardTitle>
          <CardDescription>
            Configure your restaurant settings, preferences, and account options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Settings feature coming soon.</p>
            <Button
              className="mt-4"
              onClick={() => router.push("/dashboard/profile")}
            >
              Go to Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
