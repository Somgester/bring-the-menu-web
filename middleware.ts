import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") ?? "";
  
  // Skip proxy for static files (images, fonts, etc.)
  const pathname = url.pathname;
  const staticFileExtensions = /\.(jpg|jpeg|gif|png|svg|ico|webp|woff|woff2|ttf|eot)$/i;
  if (staticFileExtensions.test(pathname) || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }
  
  // Extract subdomain (handle localhost with port)
  const hostname = host.split(':')[0]; // Remove port if present
  const subdomain = hostname.split(".")[0]; // Extract the subdomain
  
  // Check if this is a Vercel preview/deployment domain
  const isVercelDomain = hostname.includes("vercel.app") || hostname.includes("vercel.com");
  
  // Check if this is the main production domain
  const isMainDomain = hostname === "bringthemenu.com" || hostname === "www.bringthemenu.com";
  
  // Prevent redirecting for:
  // - Main domain (bringthemenu.com, www.bringthemenu.com)
  // - Localhost
  // - Vercel preview/deployment domains (show landing page, not restaurant page)
  if (
    !isMainDomain &&
    subdomain !== "www" && 
    subdomain !== "bringthemenu" && 
    subdomain !== "localhost" &&
    !isVercelDomain
  ) {
    // Only redirect to restaurant page for actual subdomains (e.g., pizzahut.bringthemenu.com)
    // Redirect requests to /restaurant/[subdomain]
    url.pathname = `/restaurant/${subdomain}${url.pathname}`;
    
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  runtime: "edge",
  matcher: [
    // Match all paths except static files and api routes
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|woff|woff2|ttf|eot)).*)",
  ],
};
