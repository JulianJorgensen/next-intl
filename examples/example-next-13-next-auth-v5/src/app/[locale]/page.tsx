import Link from "next/link";
import { signOut, auth, signIn } from "../../configs/auth";
import { getTranslations } from "next-intl/server";

export default async function IndexPage() {
  const session = await auth();
  const t = await getTranslations("Index");

  return (
    <>
      {session ? (
        <>
          <p>{t("loggedIn", { username: session.user?.name })}</p>
          <p>
            <Link href={"/secret"}>{t("secret")}</Link>
          </p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">{t("logout")}</button>
          </form>
        </>
      ) : (
        <>
          <p>{t("loggedOut")}</p>
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <button type="submit">{t("login")}</button>
          </form>
        </>
      )}
    </>
  );
}
