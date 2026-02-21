"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/loading";

export default function ReportsPage() {
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
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-2">
          View analytics and reports for your restaurant
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Reports</CardTitle>
          <CardDescription>
            View detailed analytics, sales reports, and performance metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Reports feature coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
