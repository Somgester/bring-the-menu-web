"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/loading";

export default function TablesPage() {
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
        <h1 className="text-3xl font-bold">Manage Tables</h1>
        <p className="text-muted-foreground mt-2">
          Manage your restaurant tables and QR codes
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Table Management</CardTitle>
          <CardDescription>
            View and manage your restaurant tables. Generate QR codes for each table.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Table management feature coming soon.</p>
            <Button
              className="mt-4"
              onClick={() => router.push("/dashboard/qr-generator")}
            >
              Generate QR Codes
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
