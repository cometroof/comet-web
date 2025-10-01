"use client";

import { ParamsLang } from "../types-general";
import { memo, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import BrandButton from "@/components/app/brand-button";
import Link from "next/link";
import Image from "next/image";

const coverdata = [
  {
    image:
      "https://img.freepik.com/free-photo/full-shot-man-working-roof_23-2149343677.jpg",
    title: {
      id: "<b>Desain</b> minimalis.<br /><b>Keamanan</b> maksimum.",
      en: "Minimalist <b>Design</b>.<br />Maximum <b>Protection</b>.",
    },
    description: {
      id: "Comet adalah produsen atap logam progresif, yang berkomitmen untuk memberikan solusi atap yang minimalis, berkualitas tinggi dan inovatif. Dengan pengalaman 20 tahun pengalaman di industri konstruksi, kami berfokus untuk keberlanjutan, ketahanan dan desain. Kami berusaha untuk mendefinisikan ulang standar konstruksi modern dan pembangunan perkotaan.",
      en: "Comet is a progressive manufacturer of metal roofing, committed to delivering minimalist, high-quality, and innovative roofing solutions. With over 20 years of experience in the construction industry, we focus on sustainability, durability, and design. We strive to redefine the standards of modern construction and urban development.",
    },
    link: {
      text: "About Us",
      target: "/about-us",
    },
  },
  {
    image:
      "https://img.freepik.com/free-photo/aerial-shot-rooftops-city-buildings-with-red-shingles_181624-12846.jpg",
    title: {
      id: "<b>Inovasi</b> berkelanjutan.<br /><b>Material</b> premium.",
      en: "Sustainable <b>Innovation</b>.<br />Premium <b>Materials</b>.",
    },
    description: {
      id: "Kami menggunakan teknologi terdepan dan material berkualitas tinggi untuk menciptakan sistem atap yang tahan lama dan ramah lingkungan. Setiap produk dirancang dengan presisi untuk memenuhi standar internasional dan memberikan perlindungan optimal untuk bangunan Anda.",
      en: "We utilize cutting-edge technology and high-quality materials to create durable and environmentally friendly roofing systems. Each product is precision-engineered to meet international standards and provide optimal protection for your buildings.",
    },
    link: {
      text: "Our Products",
      target: "/products",
    },
  },
  {
    image:
      "https://img.freepik.com/free-photo/sun-twilight-air-blue-background_1172-233.jpg",
    title: {
      id: "<b>Solusi</b> komprehensif.<br /><b>Layanan</b> profesional.",
      en: "Comprehensive <b>Solutions</b>.<br />Professional <b>Service</b>.",
    },
    description: {
      id: "Tim ahli kami menyediakan konsultasi lengkap mulai dari perencanaan hingga instalasi. Dengan dukungan teknis yang komprehensif dan layanan purna jual yang handal, kami memastikan setiap proyek berjalan lancar dan sesuai ekspektasi klien.",
      en: "Our expert team provides complete consultation from planning to installation. With comprehensive technical support and reliable after-sales service, we ensure every project runs smoothly and meets client expectations.",
    },
    link: {
      text: "Our Services",
      target: "/services",
    },
  },
  {
    image:
      "https://img.freepik.com/free-photo/vertical-low-angle-closeup-shot-black-roof-building_181624-10654.jpg",
    title: {
      id: "<b>Kepercayaan</b> global.<br /><b>Kualitas</b> terjamin.",
      en: "Global <b>Trust</b>.<br />Guaranteed <b>Quality</b>.",
    },
    description: {
      id: "Dipercaya oleh ribuan klien di seluruh dunia, Comet telah berhasil menyelesaikan proyek-proyek skala besar dengan standar kualitas tertinggi. Komitmen kami terhadap excellence dan customer satisfaction menjadikan kami pilihan utama untuk kebutuhan atap logam premium.",
      en: "Trusted by thousands of clients worldwide, Comet has successfully completed large-scale projects with the highest quality standards. Our commitment to excellence and customer satisfaction makes us the top choice for premium metal roofing needs.",
    },
    link: {
      text: "Our Portfolio",
      target: "/portfolio",
    },
  },
];

interface IHeroImage {
  src: string;
  alt: string;
  isActive: boolean;
}

interface IHeroContent {
  item: (typeof coverdata)[0];
  isActive: boolean;
  lang: ParamsLang["lang"];
}

const HeroImage = ({ src, alt, isActive }: IHeroImage) => (
  <Image
    alt={alt}
    src={src}
    className={cn(
      "absolute left-0 top-0 size-full object-cover transition-all",
      isActive ? "opacity-100 duration-700" : "opacity-0 duration-700",
    )}
    width={100}
    height={100}
    unoptimized
  />
);

const MemoizedHeroImage = memo(HeroImage, (prev, next) => {
  // Only re-render if isActive status changes
  return prev.isActive === next.isActive;
});

const HeroContent = ({ item, isActive, lang }: IHeroContent) => (
  <div
    className={cn(
      "col-start-1 row-start-1 transition-all",
      isActive
        ? "opacity-100 z-10 duration-500 delay-75 translate-y-0"
        : "opacity-0 z-0 pointer-events-none duration-300 translate-y-10",
    )}
  >
    <h2
      className="mt-32 font-exo-2 text-[56px] leading-[1.14em] line-clamp-2"
      dangerouslySetInnerHTML={{ __html: item.title[lang] }}
    />
    <p className="line-clamp-5 text-[17px] leading-[1.5em] mt-8">
      {item.description[lang]}
    </p>
    <div className="mt-12">
      <Link href={item.link.target}>
        <BrandButton className="btn-fill">{item.link.text}</BrandButton>
      </Link>
    </div>
  </div>
);

const MemoizedHeroContent = memo(HeroContent, (prev, next) => {
  // Only re-render if isActive changes
  return prev.isActive === next.isActive && prev.lang === next.lang;
});

export default function Homepage__CoverThings({ lang }: ParamsLang) {
  const [step, setStep] = useState(0);
  const _lang = lang ?? "en";

  // Memoize coverdata length untuk stabilitas
  const dataLength = useMemo(() => coverdata.length, []);

  useEffect(() => {
    const inter = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % dataLength);
    }, 5000);

    return () => {
      clearInterval(inter);
    };
  }, [dataLength]); // Fix: tambahkan dependency

  return (
    <>
      {/* IMAGE DISPLAY AREA */}
      <div
        id="comet-hero-image"
        className="absolute left-0 top-0 right-0 bottom-0 size-full pointer-events-none"
      >
        <div className="relative size-full">
          {coverdata.map((item, index) => (
            <MemoizedHeroImage
              key={index}
              src={item.image}
              alt={item.title[_lang]}
              isActive={index === step}
            />
          ))}
        </div>
      </div>

      {/* OVERLAY */}
      <div className="pointer-events-none bg-gradient-to-r from-black/90 via-black/60 to-black/30 absolute left-0 top-0 size-full" />

      {/* CONTENT DISPLAY AREA */}
      <div className="inner-wrapper">
        <div className="w-2/3 max-w-[640px] relative grid">
          {coverdata.map((item, index) => (
            <MemoizedHeroContent
              key={index}
              item={item}
              isActive={index === step}
              lang={_lang}
            />
          ))}
        </div>
      </div>
    </>
  );
}
