"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Receipt, DollarSign, Clock, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardStats, DashboardStats } from "@/lib/firebase/firestore";

export function SummaryCards() {
  const { restaurant } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    activeTables: 0,
    todaysOrders: 0,
    todaysRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restaurant?.id) return;

    const loadStats = async () => {
      try {
        setLoading(true);
        const dashboardStats = await getDashboardStats(restaurant.id);
        setStats(dashboardStats);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, [restaurant?.id]);

  const {
    activeTables = 0,
    todaysOrders = 0,
    todaysRevenue = 0,
    pendingOrders = 0,
  } = stats;

  const cards: Array<{
    title: string;
    value: number | string | React.ReactElement;
    icon: React.ComponentType<{ className?: string }>;
    bgColor: string;
    hoverColor: string;
    textColor: string;
    badge?: React.ReactElement;
  }> = [
    {
      title: "Active Tables",
      value: loading ? <Loader2 className="h-6 w-6 animate-spin" /> : activeTables,
      icon: CheckCircle2,
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      textColor: "text-white",
      badge: <ChevronDown className="h-4 w-4" />,
    },
    {
      title: "Today's Orders",
      value: loading ? <Loader2 className="h-6 w-6 animate-spin" /> : todaysOrders,
      icon: Receipt,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      textColor: "text-white",
    },
    {
      title: "Today's Revenue",
      value: loading ? <Loader2 className="h-6 w-6 animate-spin" /> : `$${todaysRevenue.toLocaleString()}`,
      icon: DollarSign,
      bgColor: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      textColor: "text-white",
    },
    {
      title: "Pending Orders",
      value: loading ? <Loader2 className="h-6 w-6 animate-spin" /> : pendingOrders,
      icon: Clock,
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      textColor: "text-white",
      badge: <ChevronDown className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={index}
            className={cn(
              card.bgColor,
              card.hoverColor,
              card.textColor,
              "border-0 shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105 hover:shadow-xl"
            )}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium opacity-90">{card.title}</span>
                </div>
                {card.badge && <div className="opacity-70 hidden sm:block">{card.badge}</div>}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-bold">{card.value}</span>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 opacity-70" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
