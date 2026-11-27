// ==============================================================================
// [Unit IV: Authentication and Authorization - Protected Routes & Middleware]
// [Unit IV: Authentication and Authorization - Role-based Access Control]
// ==============================================================================

import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // [Unit IV: Protected Routes]
  // Protect all routes starting with /admin
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("myscholar_session");

    if (!sessionCookie?.value) {
      // Redirect unauthenticated users to login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const session = JSON.parse(sessionCookie.value);
      // [Unit IV: Role-based Access Control (RBAC)]
      // Only "admin" role is authorized to view /admin routes
      if (session.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configuration matcher for Middleware execution
export const config = {
  matcher: ["/admin/:path*"],
};
