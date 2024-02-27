"use client";

import { useTranslations } from "next-intl";
import { FC, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const LoginPage: FC = () => {
  const t = useTranslations("Login");
  const [error, setError] = useState<string>();

  const { get } = useSearchParams();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (error) setError(undefined);

    const formData = new FormData(event.currentTarget);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    await signIn("credentials", {
      ...data,
      callbackUrl: get("callbackUrl") ?? "/",
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 10, width: 300 }}
    >
      <label style={{ display: "flex" }}>
        <span style={{ display: "inline-block", flexGrow: 1, minWidth: 100 }}>
          {t("username")}
        </span>
        <input name="username" type="text" />
      </label>
      <label style={{ display: "flex" }}>
        <span style={{ display: "inline-block", flexGrow: 1, minWidth: 100 }}>
          {t("password")}
        </span>
        <input name="password" type="password" />
      </label>
      {error && <p>{t("error", { error })}</p>}
      <button type="submit">{t("submit")}</button>
    </form>
  );
};

export default LoginPage;
