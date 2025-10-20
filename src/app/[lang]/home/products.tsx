import Link from "next/link";
import { ParamsLang } from "../types-general";
import PageLink from "../../../../public/assets/page-link";
import { getPageDictionary } from "../dictionaries";
import Homepage__SectionHead from "./_section-head";
import type { HomeDictionary } from "@/types/dictionary";

interface IProduct {
  logo?: string;
  product_image: string;
  title: string;
  description?: {
    id?: string;
    en?: string;
  };
  link: string;
  order: number;
}

const products: IProduct[] = [
  {
    logo: "https://placehold.co/109x67/E30613/E30613",
    product_image: "/assets/zigzag-roof.webp",
    title: "Minimalist Modern Metal Roof",
    description: {
      id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
      en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
    },
    link: "/products/zigzag",
    order: 1,
  },
  {
    logo: "https://placehold.co/109x67/E30613/E30613",
    product_image: "/assets/zigzag-roof.webp",
    title: "Versatile Long Spandek",
    description: {
      id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
      en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
    },
    link: "/products/zigzag",
    order: 2,
  },
  {
    logo: "https://placehold.co/109x67/E30613/E30613",
    product_image: "/assets/zigzag-roof.webp",
    title: "Stylish Dual Tone Roofing",
    description: {
      id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
      en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
    },
    link: "/products/zigzag",
    order: 3,
  },
  {
    logo: "https://placehold.co/109x67/E30613/E30613",
    product_image: "/assets/zigzag-roof.webp",
    title: "Double Coating Protection",
    description: {
      id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
      en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
    },
    link: "/products/zigzag",
    order: 4,
  },
  {
    logo: "https://placehold.co/109x67/E30613/E30613",
    product_image: "/assets/zigzag-roof.webp",
    title: "Premium Lightweight Steel",
    description: {
      id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
      en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
    },
    link: "/products/zigzag",
    order: 5,
  },
  {
    product_image: "/assets/zigzag-roof.webp",
    title: "High-Quality Roofing Accessories",
    description: {
      id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
      en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
    },
    link: "/products/zigzag",
    order: 6,
  },
];

const ProductCard = ({
  product,
  lang,
  primary = false,
  linkText = "LEARN MORE",
}: {
  product: (typeof products)[number];
  lang: ParamsLang["lang"];
  primary?: boolean;
  linkText?: string;
}) => {
  const _lang = lang || "en";
  return (
    <Link
      href={product.link}
      className={`bg-app-light-gray relative p-7 flex flex-col justify-between gap-16 text-app-gray ${primary ? "col-span-full" : ""} group`}
    >
      <img
        className={`w-auto ${primary ? "h-[70%] group-hover:h-[80%]" : "h-[50%] group-hover:h-[60%]"} transition-all duration-500 block absolute top-0 right-0`}
        alt={product.title}
        src={product.product_image}
      />
      <div className="w-fit h-[67px] relative">
        {product.logo && (
          <img
            src={product.logo}
            alt={product.title}
            className="size-full object-cover"
          />
        )}
      </div>
      <div className={`relative ${primary ? "w-1/2" : ""}`}>
        <h3 className="text-heading2">{product.title}</h3>
        {primary && product.description && (
          <p className="text-body mt-3">{product.description[_lang]}</p>
        )}
        <div className="mt-6 w-fit">
          <PageLink
            displayOnly
            href={product.link}
            className="page-link-static group-hover:page-link-hovered"
          >
            {linkText}
          </PageLink>
        </div>
      </div>
    </Link>
  );
};

export default async function Homepage__Products({ lang }: ParamsLang) {
  const home = (await getPageDictionary(lang, "home")) as HomeDictionary;
  const _lang = lang || "en";
  return (
    <div className="bg-white min-h-screen text-black outer-wrapper">
      <div className="inner-wrapper py-32">
        <Homepage__SectionHead
          title={home.product.title}
          description={home.product.description}
          closerText={`${home.product.head}:`}
          link="/products"
          linkText={home.product.cta}
        />

        <div className="grid grid-cols-2 gap-12 mt-16">
          {products
            .sort((a, b) => a.order - b.order)
            .map((p) => (
              <ProductCard
                key={p.order}
                product={p}
                primary={p.order === 1}
                lang={_lang}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
