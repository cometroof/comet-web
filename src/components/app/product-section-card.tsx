import { ParamsLang } from "@/app/[lang]/types-general";
import PageLink from "../../../public/assets/page-link";
import { LangLink } from "./lang-link";

interface IProduct {
  logo?: string;
  product_image?: string;
  title: string;
  description?: {
    id?: string;
    en?: string;
  };
  link: string;
  order: number;
}

const ProductCard = ({
  product,
  lang,
  primary = false,
  linkText = "LEARN MORE",
}: {
  product: IProduct;
  lang: ParamsLang["lang"];
  primary?: boolean;
  linkText?: string;
}) => {
  const _lang = lang || "en";

  return (
    <article
      itemScope
      itemType="https://schema.org/Product"
      className={`bg-app-light-gray relative text-app-gray ${
        primary ? "col-span-full" : ""
      } group block overflow-hidden`}
    >
      <LangLink
        href={product.link}
        className={`p-7 flex flex-col justify-between gap-8 lg:gap-16`}
        aria-label={`View ${product.title} details`}
      >
        {product.product_image && (
          <img
            // className={`block absolute top-0 right-0 max-w-[50%] max-h-[90%]
            //   border border-red-500
            // group-hover:max-w-[55%] group-hover:max-h-[100%] transition-all duration-500`}
            className="block absolute top-0 right-0 transition-all duration-300 w-full max-w-[49%] group-hover:max-w-[55%]"
            alt={`${product.title} product image`}
            src={product.product_image}
            loading="lazy"
            itemProp="image"
          />
        )}

        <div className="w-fit h-[67px] max-w-[148px] relative">
          {product.logo && (
            <img
              src={product.logo}
              alt={`${product.title} logo`}
              className="h-full object-contain"
              loading="lazy"
            />
          )}
        </div>

        <div
          className={`relative ${
            primary ? "w-full md:w-1/2 max-w-[470px]" : ""
          }`}
        >
          <h3 className="text-heading2" itemProp="name">
            {product.title}
          </h3>

          {primary && product.description && (
            <p className="text-body mt-3 line-clamp-3" itemProp="description">
              {product.description[_lang]}
            </p>
          )}

          <div className="mt-6 w-fit">
            <PageLink
              displayOnly
              href={product.link}
              className="group-hover:after:-right-4"
            >
              {linkText}
            </PageLink>
          </div>
        </div>

        <meta itemProp="url" content={product.link} />
      </LangLink>
    </article>
  );
};

const ProductSectionCard = ProductCard;
export default ProductSectionCard;
