// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "id"];
const defaultLocale = "en";

function extractLanguageCode(acceptLanguage: string) {
  return acceptLanguage.split(",")[0].split("-")[0];
}

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  console.log("ACCEPT LANGUAGE: ", acceptLanguage);
  if (acceptLanguage) {
    return extractLanguageCode(acceptLanguage);
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // If pathname already has locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect if there is no locale
  const locale = getLocale(request);
  const newPathname = `/${locale}${pathname}`;

  // Clone the request URL and modify the pathname
  const url = request.nextUrl.clone();
  url.pathname = newPathname;

  return NextResponse.redirect(url);
}

export const config = {
  // Matcher to catch all path except for static and API files
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
