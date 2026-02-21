"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading";

/**
 * Legacy route - redirects to new QR generator route at /dashboard/qr-generator
 * This maintains backward compatibility for any old links
 */
export default function LegacyQRGeneratorPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to new QR generator route
    router.replace("/dashboard/qr-generator");
  }, [router]);

  return <LoadingSpinner />;
}
