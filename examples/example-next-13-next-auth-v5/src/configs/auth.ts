import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { locales } from "./i18n";
import { NextResponse } from "next/server";

const publicPathnameRegex = RegExp(
  `^(/(${locales.join("|")}))?(${["/"].join("|")})?/?$`,
  "i"
);

const authPathnameRegex = RegExp(
  `^(/(${locales.join("|")}))?(${["/login"]
    .flatMap((p) => (p === "/" ? ["", "/"] : p))
    .join("|")})/?$`,
  "i"
);

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "admin"
        ) {
          return { id: "1", name: "admin" };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);
      const isAuthPage = authPathnameRegex.test(request.nextUrl.pathname);

      if (auth && isAuthPage)
        return NextResponse.redirect(new URL("/", origin));

      if (!auth && !isPublicPage)
        return NextResponse.redirect(new URL("/login", request.nextUrl.origin));

      return isPublicPage || isAuthPage;
    },
  },
  pages: {
    signIn: "/login",
  },
});
