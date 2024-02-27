import { PropsWithChildren, ReactNode } from "react";
import { PropsWithLocale, getMessages } from "../../configs/i18n";
import { auth } from "../../configs/auth";
import { AppProvider } from "./components/app-provider";

type Props = PropsWithChildren<PropsWithLocale>;

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);
  const session = await auth();

  return (
    <html lang={locale}>
      <head>
        <title>next-intl & next-auth</title>
      </head>
      <body>
        <AppProvider {...{ messages, session, params: { locale } }}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
