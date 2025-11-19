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
import FooterNew from "@/app/footer";
import { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "id" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  let description = `COMET is a modern minimalist metal roof tile manufacturer that prioritizes the best quality and innovation.`;
  if (lang === "id") {
    description = `COMET produsen genteng metal modern minimalis yang mengutamakan kualitas terbaik dan inovatif. `;
  }
  return {
    description,
  };
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<ParamsLang>;
}) {
  const { lang } = await params;
  return (
    <>
      <AboutUsPage__Cover lang={lang} />
      <SeparatorBanner imgUrl="https://comet-roof.my.id/images/banner-about-1-1762703067520.webp" />
      <AboutUsPage__VisionMission lang={lang} />
      <SeparatorBanner imgUrl="https://comet-roof.my.id/images/banner-about-2-1762703068938.webp" />
      <AboutUsPage__Discover lang={lang} />
      <AboutUs__Certificates lang={lang} />
      <AboutUsPage__Innovation lang={lang} />
      <AboutUsPage__Trust lang={lang} />
      <AboutUsPage__Inclusive lang={lang} />
      <SeparatorBanner imgUrl="https://comet-roof.my.id/images/banner-about-3-1762703070015.webp" />
      <AboutUsPage__Distribution lang={lang} />
      <FooterNew className="bg-app-white" />
    </>
  );
}
