"use client";

import { Button } from "@/components/ui/button";
import { ParamsLang } from "../types-general";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { stripHTML } from "../utils/utils";

const coverdata = [
  {
    image: "https://placehold.co/600x400/FF6B6B/FF6B6B",
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
    image: "https://placehold.co/600x400/FFD93D/FFD93D",
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
    image: "https://placehold.co/600x400/6BCB77/6BCB77",
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
    image: "https://placehold.co/600x400/4D96FF/4D96FF",
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

export default function Homepage__HeroCover({ lang }: ParamsLang) {
  const data = coverdata;
  return (
    <section className="">
      <div className="min-h-screen relative border-2">
        <div className="absolute left-0 top-0 size-full bg-amber-200">
          <Swiper className="items-stretch h-full">
            {data.map((item, index) => {
              const title = item.title[lang];
              const cleanTitle = stripHTML(title);
              return (
                <SwiperSlide
                  key={index}
                  className="h-auto"
                  style={{ backgroundImage: `url(${item.image})` }}
                  title={cleanTitle}
                ></SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
