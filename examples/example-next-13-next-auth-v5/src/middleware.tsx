import { auth } from "./configs/auth";
import { defaultLocale, locales } from "./configs/i18n";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

export default auth((req) => intlMiddleware(req));

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
