import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale } from "./lib/i18n-constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // İçerik paneli: locale kontrolü yapma, doğrudan geçir
  if (pathname.startsWith("/admin") || pathname.startsWith("/panel")) {
    return NextResponse.next();
  }

  // Root: redirect to Turkish (default locale)
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/tr", request.url));
  }

  // Check if first segment is a valid locale
  const segment = pathname.split("/")[1];
  if (!isValidLocale(segment)) {
    // Not a locale - assume Turkish and redirect
    return NextResponse.redirect(new URL(`/tr${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // api, panel, admin, static dosyalar ve favicon için middleware çalışmasın
  matcher: ["/((?!api|panel|admin|_next/static|_next/image|favicon.ico).*)"],
};
