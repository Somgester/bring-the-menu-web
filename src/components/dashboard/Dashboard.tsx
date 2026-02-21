"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveOrders } from "@/app/restaurant/[restaurant]/dashboard/components/live-orders";
import { MenuEditor } from "@/app/restaurant/[restaurant]/dashboard/components/menu-editor";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { QrCode, LogOut } from "lucide-react";

/**
 * Dashboard component - renders the restaurant dashboard
 * Can be used on any page without requiring URL params
 */
export function Dashboard() {
  const router = useRouter();
  const { restaurant, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (!restaurant) {
    return null;
  }

  return (
    <DashboardLayout>
      {/* Summary Cards */}
      <SummaryCards />

      {/* Tabs Section */}
      <Tabs defaultValue="orders" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList className="bg-white w-full sm:w-auto">
            <TabsTrigger value="orders" className="flex-1 sm:flex-none">Live Orders</TabsTrigger>
            <TabsTrigger value="menu" className="flex-1 sm:flex-none">Menu Editor</TabsTrigger>
          </TabsList>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => {
                router.push("/dashboard/qr-generator");
              }}
              className="flex items-center gap-2 flex-1 sm:flex-none"
            >
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">Generate QR</span>
              <span className="sm:hidden">QR</span>
            </Button>
          </div>
        </div>
        <TabsContent value="orders" className="mt-6">
          <LiveOrders />
        </TabsContent>
        <TabsContent value="menu" className="mt-6">
          <MenuEditor />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
