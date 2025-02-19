import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") ?? "";
  const subdomain = host.split(".")[0]; // Extract the subdomain
console.log(subdomain);
  // Prevent redirecting for the main domain (bringthemenu.com)
  if (subdomain !== "www" && subdomain !== "bringthemenu" && subdomain !== "localhost:3000") {
    // Redirect requests to /restaurant/[subdomain]
    url.pathname = `/restaurant/${subdomain}${url.pathname}`;
    
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};