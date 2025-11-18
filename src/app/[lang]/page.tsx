import HomePage from "./home";
import { ParamsLang } from "./types-general";

export const revalidate = 300;

export default async function Home({
  params,
}: {
  params: Promise<ParamsLang>;
}) {
  const { lang } = await params;
  return <HomePage lang={lang} />;
}
