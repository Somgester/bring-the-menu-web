import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") ?? "";
  
  // Skip proxy for static files (images, fonts, etc.)
  const pathname = url.pathname;
  const staticFileExtensions = /\.(jpg|jpeg|gif|png|svg|ico|webp|woff|woff2|ttf|eot|css|js|map)$/i;
  if (staticFileExtensions.test(pathname) || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }
  
  // Extract subdomain (handle localhost with port)
  const hostname = host.split(':')[0]; // Remove port if present
  const subdomain = hostname.split(".")[0]; // Extract the subdomain
  
  // Prevent redirecting for the main domain (bringthemenu.com) and localhost
  if (subdomain !== "www" && subdomain !== "bringthemenu" && subdomain !== "localhost") {
    // Redirect requests to /restaurant/[subdomain]
    url.pathname = `/restaurant/${subdomain}${url.pathname}`;
    
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|woff|woff2|ttf|eot)).*)',
  ],
};
