import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { setRequestLocale } from "next-intl/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const response = NextResponse.next();
  const LOCALE_COOKIE_KEY = "NEXT_LOCALE";
  const locales = routing.locales;
  const defaultlocale = routing.defaultLocale;
  const { pathname, search } = request.nextUrl;
  // Nếu URL không có locale, thêm ngôn ngữ mặc định 'en'

  const localeFromPath = pathname.split("/")[1];
  const localeFromCookie = request.cookies.get(LOCALE_COOKIE_KEY)?.value;

  setRequestLocale((localeFromPath || localeFromCookie) as any);

  //Kiểm tra trong path có locale không
  if (localeFromPath && locales.includes(localeFromPath as any)) {
    if (localeFromPath != localeFromCookie) {
      response.cookies.set(LOCALE_COOKIE_KEY, localeFromPath);
    }
    return intlMiddleware(request);
  }

  //Kiểm tra trong cookie có locale không
  if (localeFromCookie && locales.includes(localeFromCookie as any)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${localeFromCookie}${pathname}`;
    url.search = search;
    return NextResponse.rewrite(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultlocale}${pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/",
    "/(vi|en)/:path*",
    "/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ], // At this line, define into the matcher all the availables language you have defined into routing.ts
};
