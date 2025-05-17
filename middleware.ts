import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Protect all /dashboard pages
  if (request.nextUrl.pathname.startsWith("/lead-management") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/lead-management/:path*"], // protected paths
};
