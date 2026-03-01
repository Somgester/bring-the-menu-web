import React from "react";

const siteUrl = "https://bringthemenu.vercel.app";
const title = "Bring The Menu — QR Menus & Table Ordering for Restaurants";
const description =
  "Create QR code menus, accept orders and payments, and receive instant order notifications. Fast setup for restaurants of any size.";
const logo = `${siteUrl}/og-image.png`;

export default function Head() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Bring The Menu",
    "url": siteUrl,
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "Bring The Menu",
      "logo": {
        "@type": "ImageObject",
        "url": logo
      }
    }
  };

  return (
    <>
      {/* small additions for SEO / mobile */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Bring The Menu" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={logo} />
      <meta property="og:image:alt" content="Bring The Menu - QR Menus" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logo} />

      {/* Performance / fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}