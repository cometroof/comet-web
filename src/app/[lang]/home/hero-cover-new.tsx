"use client";

import { useEffect, useState } from "react";
import { ParamsLang } from "../types-general";
import Image from "next/image";
import Link from "next/link";
import BrandButton from "@/components/app/brand-button";
import Icon__Warranty from "@/components/assets/warranty";
import Icon__Interlocking from "@/components/assets/interlocking";
import Icon__LightWeight from "@/components/assets/lightweight";
import Icon__Sustainable from "@/components/assets/sustainable";
import Icon__NonCombustible from "@/components/assets/non-combustible";
import Icon__DisasterResistant from "@/components/assets/disaster-ressistant";
import Icon__ModernMinimalist from "@/components/assets/modern-minimalist";
import Asset__RoofModelCropped from "./roof-model-cropped";
import Asset__RoofModel from "@/components/assets/roof-model";

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

const productInfo = [
  {
    key: "warranty",
    icon: <Icon__Warranty />,
    title: "Warranty Backed Quality",
  },
  {
    key: "interlocking",
    icon: <Icon__Interlocking />,
    title: "Precision Interlocking System",
  },
  {
    key: "lightweight",
    icon: <Icon__LightWeight />,
    title: "Lightweight Yet Strong",
  },
  {
    key: "sustainable",
    icon: <Icon__Sustainable />,
    title: "Environmentally Sustainable",
  },
  {
    key: "non-combustible",
    icon: <Icon__NonCombustible />,
    title: "Non-Combustible Materials",
  },
  {
    key: "disaster-resistant",
    icon: <Icon__DisasterResistant />,
    title: "Natural Disaster Resistant",
  },
  {
    key: "modern-minimalist",
    icon: <Icon__ModernMinimalist />,
    title: "Modern Minimalist Design",
  },
];

export default function Homepage__HeroCover({ lang }: ParamsLang) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    function setHeight(index: number) {
      const el = document.getElementById(`home-cover-content-${index}`);
      const target = document.getElementById(`home-cover-content`);
      if (el && target) {
        const clientHeight = el.clientHeight;
        if (target) target.style.height = `${clientHeight}px`;
      }
    }

    const interval = setInterval(() => {
      setStep((prevStep) => {
        const next = (prevStep + 1) % coverdata.length;
        const el = document.getElementById(`home-cover-content-${next}`);
        if (el) setHeight(next);
        return next;
      });
    }, 5000);

    setHeight(0);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[600x] text-white">
      <div className="absolute left-0 top-0 size-full pointer-events-none">
        <div className="relative size-full">
          {coverdata.map((item, index) => (
            <Image
              key={index}
              src={item.image}
              alt={index.toString()}
              className={`size-full object-cover absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] ${index === step ? "opacity-100 duration-300" : "opacity-0 duration-700"} pointer-events-none`}
              width={100}
              height={100}
              unoptimized
            />
          ))}
          <div className="bg-gradient-to-r from-black/80 via-black/60 to-black/10 absolute left-0 top-0 size-full" />
        </div>
      </div>

      <div className="relative space-y-32 pt-32">
        <div className="outer-wrapper-x">
          <div
            className="inner-wrapper relative text-background transition-all duration-300 min-h-72"
            id="home-cover-content"
          >
            {coverdata.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-full absolute left-0 top-0 ${index === step ? "opacity-100 duration-300 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                  id={`home-cover-content-${index}`}
                >
                  <div className="flex flex-col items-start gap-8 w-2/3 max-w-2xl">
                    <h2
                      className="text-6xl font-exo-2"
                      dangerouslySetInnerHTML={{ __html: item.title[lang] }}
                    ></h2>
                    <p>{item.description[lang]}</p>
                    <Link href={`${lang}${item.link.target}`}>
                      <BrandButton>{item.link.text}</BrandButton>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-x-hidden min-h-[300px]">
          <div className="outer-wrapper-x relative z-[1]">
            <div className="inner-wrapper relative z-[1] border-white pb-12">
              <div className="w-[80%] h-px bg-white" />
              <div className="mt-5 w-full max-w-[300px] uppercase leading-5 tracking-[0.78px] text-sm relative z-[1]">
                OUR EXCELLENCE IS REFLECTED IN THE KEY ADVANTAGES OF OUR
                PRODUCTS:
              </div>
              <div className="mt-14 flex justify-between gap-10 font-exo-2 relative z-[1]">
                {productInfo.map((item, index) => (
                  <div
                    key={index}
                    className="text-lg font-semibold text-center max-w-[368px] flex flex-col gap-6 leading-6"
                  >
                    <div className="flex items-end justify-center min-h-[70px]">
                      {item.icon}
                    </div>
                    <div>{item.title}</div>
                  </div>
                ))}
              </div>

              <div className="absolute right-[-47%] bottom-0">
                <Asset__RoofModel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
