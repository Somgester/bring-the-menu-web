"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Download, ArrowLeft } from "lucide-react";
import FileSaver from "file-saver";
import html2canvas from "html2canvas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function QRGeneratorPage() {
  const router = useRouter();
  const { user, restaurant, loading } = useAuth();

  const [numberOfTables, setNumberOfTables] = useState("");
  const [qrCodes, setQrCodes] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Use restaurant ID from auth context for QR code URL - automatically generated
  const getBaseUrl = () => {
    if (!restaurant?.id) return "";
    if (typeof window !== "undefined") {
      return `${window.location.origin}/restaurant/${restaurant.id}/table/`;
    }
    return `https://bringthemenu.com/restaurant/${restaurant.id}/table/`;
  };
  
  const baseUrl = getBaseUrl();

  // Protect route - verify user is logged in
  useEffect(() => {
    if (loading) return;

    if (!user || !restaurant) {
      router.replace("/");
      return;
    }
  }, [user, restaurant, loading, router]);

  const generateQRCodes = (e: React.FormEvent) => {
    e.preventDefault();
    const numTables = Number.parseInt(numberOfTables);

    if (!numTables || numTables < 1) {
      alert("Please enter a valid number of tables (at least 1)");
      return;
    }

    // Generate QR codes starting from table 1
    const codes = Array.from({ length: numTables }, (_, i) => i + 1);
    setQrCodes(codes);
    // Reset refs array to match new codes length
    cardRefs.current = Array(codes.length).fill(null);
  };

  const downloadQR = async (tableNumber: number, index: number) => {
    const cardElement = cardRefs.current[index];
    if (!cardElement) return;

    try {
      const canvas = await html2canvas(cardElement);

      canvas.toBlob((blob) => {
        if (blob) {
          FileSaver.saveAs(blob, `table-${tableNumber}-qr.png`);
        }
      });
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const downloadAllQRs = async () => {
    for (let i = 0; i < qrCodes.length; i++) {
      await downloadQR(qrCodes[i], i);
      // Small delay to prevent browser from freezing
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  };

  // Show loading while checking auth
  if (loading || !user || !restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-DEFAULT"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
        <p className="text-muted-foreground mt-2">
          Generate QR codes for your restaurant tables
        </p>
      </div>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle>Table QR Code Generator</CardTitle>
          <CardDescription>Generate QR codes for multiple table numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={generateQRCodes} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="numberOfTables">Number of Tables</Label>
              <Input
                id="numberOfTables"
                type="number"
                min="1"
                value={numberOfTables}
                onChange={(e) => setNumberOfTables(e.target.value)}
                placeholder="Enter number of tables (e.g., 10)"
                required
              />
              <p className="text-xs text-muted-foreground">
                QR codes will be generated for tables 1 to {numberOfTables || "N"}
              </p>
            </div>
            {baseUrl && (
              <div className="space-y-2 p-3 bg-gray-50 rounded-md">
                <Label className="text-sm font-medium">Base URL (Auto-generated)</Label>
                <p className="text-xs text-muted-foreground break-all">
                  {baseUrl}[table-number]
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Example: {baseUrl}1, {baseUrl}2, {baseUrl}3...
                </p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={!baseUrl || !numberOfTables}>
              Generate QR Codes
            </Button>
          </form>
        </CardContent>
      </Card>

      {qrCodes.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Generated QR Codes</h2>
            <Button onClick={downloadAllQRs} variant="outline">
              Download All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {qrCodes.map((number, index) => (
              <Card key={number} className="p-4">
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="flex flex-col items-center space-y-4 bg-white p-4 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-center">Scan for Menu</h3>
                  <QRCodeSVG id={`qr-${number}`} value={`${baseUrl}${number}`} size={200} includeMargin />
                  <div className="w-full pt-2 border-t border-gray-200">
                    <div className="flex flex-col items-center w-full mt-2 text-center">
                      <span className="text-xl font-bold">Table {number}</span>
                      <span className="text-[10px] text-gray-400 mt-1">Powered by Bringing the Menu</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadQR(number, index)}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
