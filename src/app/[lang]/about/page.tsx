import SeparatorBanner from "@/components/app/separator-banner";
import AboutUsPage__Cover from "./cover";
import AboutUsPage__VisionMission from "./vision-mission";
import { ParamsLang } from "../types-general";
import AboutUsPage__Discover from "./discover";
import AboutUs__Certificates from "./certificates";
import AboutUsPage__Innovation from "./innovation";
import AboutUsPage__Trust from "./trust";
import AboutUsPage__Inclusive from "./inclusive";
import AboutUsPage__Distribution from "./distribution";
import FooterNew from "@/components/app/footer";

export default async function AboutUsPage({
  params,
}: {
  params: Promise<ParamsLang>;
}) {
  const { lang } = await params;
  return (
    <>
      <AboutUsPage__Cover />
      <SeparatorBanner imgUrl="https://placehold.co/900x400/1b2a8c/ffffff?text=BANNER\nAbout%20Us" />
      <AboutUsPage__VisionMission lang={lang} />
      <SeparatorBanner imgUrl="https://placehold.co/900x400/9e730a/ffffff?text=BANNER\nAbout%20Us" />
      <AboutUsPage__Discover lang={lang} />
      <AboutUs__Certificates lang={lang} />
      <AboutUsPage__Innovation lang={lang} />
      <AboutUsPage__Trust lang={lang} />
      <AboutUsPage__Inclusive lang={lang} />
      <SeparatorBanner imgUrl="https://placehold.co/900x400/9e730a/ffffff?text=BANNER\nAbout%20Us" />
      <AboutUsPage__Distribution lang={lang} />
      <FooterNew className="bg-app-white" />
    </>
  );
}
