"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading";

/**
 * Legacy route - redirects to home page
 * Dashboard is now shown directly on "/" when user is logged in
 */
export default function LegacyDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page - dashboard is shown there now
    router.replace("/");
  }, [router]);

  return <LoadingSpinner />;
}

