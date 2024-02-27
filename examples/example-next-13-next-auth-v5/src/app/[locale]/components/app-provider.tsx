"use client";

import { Messages, PropsWithLocale, timeZone } from "../../../configs/i18n";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { FC, PropsWithChildren } from "react";

export type AppProviderProps = PropsWithChildren<
  PropsWithLocale<{
    session: Session | null;
    messages: Messages;
  }>
>;

export const AppProvider: FC<AppProviderProps> = ({
  children,
  session,
  messages,
  params: { locale },
}) => (
  <SessionProvider session={session}>
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
      {children}
    </NextIntlClientProvider>
  </SessionProvider>
);
