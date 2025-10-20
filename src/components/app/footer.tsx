"use client";

import Link from "next/link";
import PageLink from "../../../public/assets/page-link";
import BrandButton from "./brand-button";
import { useParams } from "next/navigation";
// import { usePathname } from "next/navigation";
// import { isCurrentPath } from "@/lib/utils";

const projectsLink = [
  { text: "Residential", href: "/projects/residential" },
  { text: "Private Residential", href: "/projects/private-residential" },
  { text: "Government", href: "/projects/government" },
  { text: "Hotel & Villa", href: "/projects/hotel-villa" },
  { text: "Warehouse & Commercial", href: "/projects/warehouse-commercial" },
  { text: "Public Buildings", href: "/projects/public-buildings" },
];

const productsLink = [
  { text: "ZIGZAG", href: "/products/zigzag" },
  { text: "Regency", href: "/products/regency" },
  { text: "Ruvin", href: "/products/ruvin" },
  { text: "Durastone", href: "/products/durastone" },
  { text: "Kiya", href: "/products/kiya" },
  { text: "Accessories", href: "/products/accessories" },
];

export default function FooterNew({
  className,
  classNameBottom,
}: {
  className?: string;
  classNameBottom?: string;
}) {
  const year = new Date().getFullYear();
  const params = useParams<{ lang: "id" | "en" }>();
  const _lang = params.lang || "en";
  const obj = {
    en: {
      reach_text: "Reach out to us and let’s build something great together.",
      reach_cta: "CONTACT US",
    },
    id: {
      reach_text: "Hubungi kami dan mari bangun hal hebat bersama.",
      reach_cta: "HUBUNGI KAMI",
    },
  };
  const text = obj[_lang];
  // const path = usePathname();
  // const inWhite = ["/"];
  // const res = isCurrentPath(path, inWhite);
  return (
    <footer className={"text-background relative " + className}>
      <div
        className="outer-wrapper !py-0 !pt-12"
        style={{
          // backgroundColor: res ? "#ffffff" : "",
          backgroundImage: "url(/assets/triangle-bottom.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 10px",
        }}
      >
        <div className="inner-wrapper relative py-12 flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between items-center">
          <div className="text-heading1 w-full lg:w-1/2">{text.reach_text}</div>
          <div className="w-full lg:w-1/3">
            <BrandButton className="secondary">{text.reach_cta}</BrandButton>
          </div>
        </div>
      </div>

      <div className={"bg-app-black " + classNameBottom}>
        <div className="outer-wrapper bg-black">
          <div className="inner-wrapper !py-20">
            <div className="flex flex-col xl:flex-row gap-10 xl:gap-0 justify-between w-full">
              <div>
                <div className="w-[175px]">
                  <svg
                    width="175"
                    height="42"
                    viewBox="0 0 175 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M60.39 12.907c-.83-2.966-3.856-5.16-7.475-5.16a7.83 7.83 0 0 0-7.178 4.33 296 296 0 0 1-9.432-.83C38.145 5.372 44.907.982 52.915.982c8.958 0 16.255 5.399 17.026 12.28-3.263-.06-6.466-.237-9.551-.356M45.797 17.06c1.127 2.491 3.915 4.212 7.118 4.212s6.585-2.136 7.475-5.043l9.55-.356c-.83 6.822-8.126 12.161-17.025 12.161-7.949 0-14.652-4.27-16.55-10.144 2.906-.296 6.05-.593 9.432-.83M9.432 14.509c0 3.737 3.44 6.762 7.653 6.762.656.003 1.312-.057 1.957-.177v.177c3.204-1.305 8.127-2.254 14.534-3.084-2.017 5.695-8.601 9.847-16.491 9.847C7.653 28.034 0 21.984 0 14.51S7.653.983 17.085.983c7.89 0 14.534 4.212 16.55 9.967-5.694-.712-10.262-1.543-13.465-2.61l-.475-.179-.653-.237a7 7 0 0 0-1.957-.237c-4.212 0-7.653 3.025-7.653 6.763M144.924 1.992H175v5.932h-10.678V26.79h-8.72V7.924h-10.678zM92.78 13.856l8.305-11.805h7.771v12.043zm-21.653-.534V2.052h7.83l8.187 11.686zm0 13.23V15.813l17.204-.415 1.66 2.432 1.78-2.492 17.085-.296V26.55H99.72v-9.61l-6.288 9.314h-6.94l-6.17-9.314v9.67zm49.475-24.56h21.712v5.932h-21.712v3.381h21.712v5.933h-21.712v3.381h21.712v5.932h-30.492V15.043l19.458-.238v-.474l-19.458-.178V1.933h8.78z"
                      fill="#E30613"
                    />
                    <path
                      d="M162.542 41.085h1.424a3.6 3.6 0 0 0 1.424-.238 2.3 2.3 0 0 0 1.008-.652 2.9 2.9 0 0 0 .594-.89 3.48 3.48 0 0 0 0-2.195 2.4 2.4 0 0 0-.594-.89 2.3 2.3 0 0 0-1.008-.652 3.6 3.6 0 0 0-1.424-.297h-1.424zm-.711-6.467h2.372c.466-.008.929.073 1.365.238.436.133.84.356 1.186.652.36.321.661.703.89 1.127.223.483.325 1.012.297 1.543.033.55-.069 1.1-.297 1.601a4.2 4.2 0 0 1-.89 1.127c-.346.297-.75.52-1.186.653a3.7 3.7 0 0 1-1.365.237h-2.372zm-5.873 4.627h3.084L157.5 35.45zm-1.068 2.551H154l3.144-7.178h.712l3.085 7.178h-.831l-.771-1.898h-3.678zm-4.212-4.033h1.958l.593-.297q.15-.158.237-.356a.9.9 0 0 0 .119-.534.7.7 0 0 0-.119-.475 1.5 1.5 0 0 0-.237-.415l-.593-.237-.771-.119h-1.187zm-.771-3.145h2.135a2.97 2.97 0 0 1 1.721.475 1.66 1.66 0 0 1 .593 1.424 1.77 1.77 0 0 1-.593 1.483 2.97 2.97 0 0 1-1.721.474h-1.364v3.322h-.771zm-5.22 3.145h2.076c.214-.063.415-.163.593-.297l.237-.356q.102-.257.119-.534a1.4 1.4 0 0 0-.119-.475 1.5 1.5 0 0 0-.237-.415l-.593-.237-.831-.119h-1.245zm0 4.033h-.772v-7.178h2.255a2.97 2.97 0 0 1 1.72.475 2.02 2.02 0 0 1 .119 2.729 2.26 2.26 0 0 1-1.365.593l2.076 3.381h-.889l-1.958-3.322h-1.186zm-5.992-.712h3.797v.712h-4.568v-7.178h4.449v.653h-3.678v2.432h3.441v.712h-3.441zm-4.271.712h-.712v-6.525h-2.432v-.653h5.576v.653h-2.432zm-7.356-3.618a3.7 3.7 0 0 0-.178-1.127 4 4 0 0 0-.593-1.009 1.84 1.84 0 0 0-.949-.652 2.7 2.7 0 0 0-1.187-.297 2.7 2.7 0 0 0-1.246.297c-.37.126-.698.352-.949.652a4 4 0 0 0-.593 1.009 3.7 3.7 0 0 0-.178 1.127 3.8 3.8 0 0 0 .178 1.186c.148.363.348.703.593 1.009.267.282.59.505.949.652a2.7 2.7 0 0 0 1.246.297c.413-.008.819-.11 1.187-.297a2.26 2.26 0 0 0 .949-.652 4 4 0 0 0 .593-1.009 3.8 3.8 0 0 0 .178-1.186m.771 0a4.2 4.2 0 0 1-.237 1.542 4.1 4.1 0 0 1-.771 1.187 5 5 0 0 1-1.187.77c-.472.19-.975.29-1.483.297a3.9 3.9 0 0 1-1.483-.296 3.4 3.4 0 0 1-1.186-.771 4.3 4.3 0 0 1-.831-1.187 4.2 4.2 0 0 1-.237-1.542 4.1 4.1 0 0 1 .237-1.483 4.3 4.3 0 0 1 .831-1.187c.32-.357.73-.623 1.186-.771.47-.194.974-.295 1.483-.297a4.2 4.2 0 0 1 1.483.297c.441.18.844.441 1.187.771a3.5 3.5 0 0 1 1.008 2.67m-13.822 2.907h1.424c.485.017.97-.064 1.424-.238.387-.125.735-.35 1.008-.652.251-.258.452-.56.593-.89.122-.363.182-.744.178-1.127a3.4 3.4 0 0 0-.178-1.068 2.4 2.4 0 0 0-.593-.89 2.3 2.3 0 0 0-1.008-.652 3.6 3.6 0 0 0-1.424-.297h-1.424zm-.712-6.467h2.373a3.4 3.4 0 0 1 1.305.238c.459.12.885.343 1.246.652.36.321.661.703.89 1.127a4.2 4.2 0 0 1 .296 1.543 4.3 4.3 0 0 1-.296 1.601 4.2 4.2 0 0 1-.89 1.127 3.15 3.15 0 0 1-1.246.653 3.4 3.4 0 0 1-1.305.237h-2.373zm-2.61 6.051v-6.05h.771v7.177h-.949l-4.271-6.17v6.17h-.712v-7.178h.89zm-7.119 1.127h-.711v-7.178h.711zm-5.042-.712h3.322v.712h-4.034v-7.178h.712zm-6.703-1.839h3.084l-1.542-3.796zm-1.068 2.551h-.89l3.144-7.178h.712l3.085 7.178h-.83l-.772-1.898h-3.678zm-2.729 0h-.712v-6.525H84.89v-.653h5.576v.653h-2.432zm-7.534-.712h3.797v.712h-4.568v-7.178h4.45v.653H80.5v2.432h3.44v.712H80.5zm-6.229-.652 2.433-5.814h1.127v7.178h-.772v-6.228l-2.61 6.228h-.356l-2.61-6.228v6.228h-.712v-7.178h1.068zm-13.644-5.814h.712v3.085h3.915v-3.085h.712v7.178h-.712v-3.381H61.34v3.381h-.712zm-1.245 6.051a1.6 1.6 0 0 1-.416.475l-.593.415-.771.297-.83.118a3.9 3.9 0 0 1-1.484-.296 3.4 3.4 0 0 1-1.186-.771 3.14 3.14 0 0 1-.771-1.187 3.26 3.26 0 0 1-.297-1.542 3.92 3.92 0 0 1 1.068-2.67 2.73 2.73 0 0 1 1.186-.771c.47-.194.974-.295 1.483-.297.444.022.883.102 1.305.238.468.186.877.493 1.187.89l-.653.474-.296-.356-.475-.296-.534-.178-.534-.119c-.433-.001-.86.1-1.245.297-.364.14-.689.364-.95.652a2.7 2.7 0 0 0-.534 1.009 2.55 2.55 0 0 0-.237 1.127c-.013.408.069.814.237 1.186.105.37.287.714.534 1.009.277.27.598.49.95.652a2.7 2.7 0 0 0 1.245.297h.534l.534-.178.534-.356a1.6 1.6 0 0 0 .415-.475zm-11.153.416h3.856v.711h-4.568v-7.178h4.45v.653h-3.738v2.432h3.5v.712h-3.5zm-4.212.711h-.712v-6.525h-2.432v-.653h5.517v.653h-2.373zm-7.771-1.364 2.432-5.814h1.068v7.178h-.712v-6.228l-2.61 6.228h-.356l-2.61-6.228v6.228h-.771v-7.178h1.127zm-5.754-2.254a3.9 3.9 0 0 0-.238-1.127 2.2 2.2 0 0 0-.593-1.009 1.96 1.96 0 0 0-.89-.652 2.79 2.79 0 0 0-2.491 0 1.96 1.96 0 0 0-.89.652c-.285.276-.49.625-.593 1.009a2.55 2.55 0 0 0-.238 1.127c-.012.408.069.814.238 1.186.103.384.308.732.593 1.009.244.28.548.504.89.652a2.79 2.79 0 0 0 2.491 0c.342-.148.646-.371.89-.652.285-.277.49-.625.593-1.009.141-.38.221-.78.238-1.186m.77 0a4.2 4.2 0 0 1-.296 1.542 3.74 3.74 0 0 1-3.44 2.254 3.92 3.92 0 0 1-2.67-1.067 3.14 3.14 0 0 1-.771-1.187 4.2 4.2 0 0 1-.297-1.542 4.2 4.2 0 0 1 .297-1.483 3.38 3.38 0 0 1 1.957-1.958 3.86 3.86 0 0 1 2.967 0c.448.164.854.427 1.186.771a3.92 3.92 0 0 1 1.068 2.67m-8.186 2.491a1.8 1.8 0 0 1-.474.475l-.593.415-.772.297-.83.118a3.92 3.92 0 0 1-2.67-1.067 3.14 3.14 0 0 1-.77-1.187 4.2 4.2 0 0 1-.297-1.542 4.2 4.2 0 0 1 .296-1.483 3.38 3.38 0 0 1 1.958-1.958 4.1 4.1 0 0 1 1.483-.297c.444.022.882.102 1.305.238a2.83 2.83 0 0 1 1.186.89l-.652.474-.297-.356-.474-.296-.534-.178-.534-.119c-.433-.001-.86.1-1.246.297-.363.14-.688.364-.949.652a2.7 2.7 0 0 0-.534 1.009 2.55 2.55 0 0 0-.237 1.127c-.013.408.068.814.237 1.186.105.37.287.714.534 1.009.277.27.598.49.95.652a2.7 2.7 0 0 0 1.245.297h.534l.593-.178.475-.356.474-.475zm-10.559.653a.53.53 0 0 1-.178.356.42.42 0 0 1-.356.178.53.53 0 0 1-.415-.178.42.42 0 0 1-.119-.356.48.48 0 0 1 .119-.416.53.53 0 0 1 .415-.177.42.42 0 0 1 .356.178.54.54 0 0 1 .178.415m-3.381.474h-.712v-6.525H5.992v-.653h5.576v.653H9.136zM1.78 37.763h2.017l.534-.297.296-.356a1.7 1.7 0 0 0 .06-.534c.01-.16-.01-.321-.06-.475l-.296-.415-.534-.296-.83-.12H1.78zm-.712-3.145h2.076a2.97 2.97 0 0 1 1.72.475 1.66 1.66 0 0 1 .594 1.424A1.78 1.78 0 0 1 4.865 38a2.97 2.97 0 0 1-1.72.474H1.78v3.322h-.712zm173.458 4.509c.015.32-.025.642-.119.949a2.3 2.3 0 0 1-.356.89c-.219.297-.503.54-.831.712a3.02 3.02 0 0 1-2.61 0 2.4 2.4 0 0 1-.83-.712 2.3 2.3 0 0 1-.356-.89 6 6 0 0 1-.119-.95v-4.508h.712v4.39c.003.3.042.6.119.89.059.237.178.475.237.653.107.166.248.308.415.415l.416.178.355.119h.712l.356-.12.415-.177c.167-.107.309-.248.416-.415a2.1 2.1 0 0 0 .237-.653c.076-.29.116-.59.119-.89v-4.39h.712z"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <div className="mt-12">
                  <div className="flex gap-3.5">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Link
                        key={item}
                        href={`/link/${item}`}
                        className="size-8 rounded-full bg-red-500 flex items-center justify-center"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-2/4 flex flex-col lg:flex-row justify-between gap-8 xl:gap-20">
                <div className="w-full lg:w-1/3 flex flex-col gap-3.5">
                  <PageLink href="/products">PRODUCTS</PageLink>
                  {productsLink.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="font-exo-2 font-semibold text-sm leading-[1.7] tracking-[0.06em] hover:text-red-500"
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
                <div className="w-full lg:w-1/3 flex flex-col gap-3.5">
                  <PageLink href="/projects">PROJECTS</PageLink>
                  {projectsLink.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="font-exo-2 font-semibold text-sm leading-[1.7] tracking-[0.06em] hover:text-red-500"
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
                <div className="w-full lg:w-1/3 flex flex-col gap-3.5">
                  <PageLink href="/about-us">ABOUT US</PageLink>
                  <PageLink href="/articles">ARTICLES</PageLink>
                  <PageLink href="/contact-us">CONTACT US</PageLink>
                  <PageLink href="/guarantee">GUARANTEE</PageLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="outer-wrapper mt-14  bg-black">
          <div className="inner-wrapper py- text-sm border-t border-t-[#58595B] pt-4">
            <p className="hidden lg:block">
              Copyright {year} © All Rights Reserved • Designed by Designata
              Studio
            </p>
            <div className="lg:hidden text-center">
              Copyright {year} © All Rights Reserved
              <br />
              Designed by Designata Studio
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
