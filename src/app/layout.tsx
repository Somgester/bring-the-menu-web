import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Bring the Menu - Digital Menu Service for Restaurants",
  description: "Transform your restaurant with digital QR code menus, real-time ordering, and instant notifications. Modern solution for restaurants, bars, and cafes.",
  keywords: "digital menu, restaurant QR code, online ordering, restaurant management, digital ordering system",
  openGraph: {
    title: "Bring the Menu - Digital Menu Service for Restaurants",
    description: "Transform your restaurant with digital QR code menus and real-time ordering",
    url: "https://bringthemenu.com",
    siteName: "Bring the Menu",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bring the Menu - Digital Menu Service for Restaurants",
    description: "Transform your restaurant with digital QR code menus and real-time ordering",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <Analytics/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Bring the Menu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Digital menu service for restaurants, bars and cafes",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body
      
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
