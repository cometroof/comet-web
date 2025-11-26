"use client";

import { X } from "lucide-react";
import { togglingBurger } from "./header-burger";
import { Database } from "@/supabase/supabase";
import { LangLink } from "./lang-link";
import { useParams } from "next/navigation";

const menuList = [
  {
    name: "About Us",
    label: { en: "About Us", id: "Tentang Kami" },
    link: "/about",
  },
  {
    name: "Products",
    label: { en: "Products", id: "Produk" },
    link: "/product",
    isMore: true,
  },
  {
    name: "Projects",
    label: { en: "Projects", id: "Proyek" },
    link: "/project",
    isMore: true,
  },
  {
    name: "Articles",
    label: { en: "Articles", id: "Artikel" },
    link: "/article",
  },
  {
    name: "Contact Us",
    label: { en: "Contact Us", id: "Hubungi Kami" },
    link: "/contact",
  },
  {
    name: "Guarantee Claim",
    label: { en: "Guarantee Claim", id: "Klaim Garansi" },
    link: "/guarantee-claim",
  },
];

type TSubmenuProduct = Partial<Database["public"]["Tables"]["product"]["Row"]>;
type TSubmenuProject = Partial<
  Database["public"]["Tables"]["project_categories"]["Row"]
>;

export default function HeaderMenu({
  submenuProduct,
  submenuProject,
}: {
  submenuProduct?: TSubmenuProduct[] | null;
  submenuProject?: TSubmenuProject[] | null;
}) {
  const params = useParams();
  const lang = params.lang as "en" | "id";

  function toggling() {
    const el = document.getElementById("burger-menu");
    if (el) {
      if (el.classList.contains("isClosed")) {
        el.classList.remove("isClosed");
        el.classList.add("isOpen");
        document.body.style.overflowY = "hidden";
        document.body.style.overflowX = "hidden";
      } else {
        el.classList.remove("isOpen");
        el.classList.add("isClosed");
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";
      }
    }
  }

  const menuRender = menuList.map((m) => ({
    ...m,
    sub:
      m.link === "/product"
        ? submenuProduct
        : m.link === "/project"
        ? submenuProject
        : null,
  }));

  return (
    <div className="header-menu group isClosed" id="burger-menu">
      <div className="outer-wrapper h-auto lg:h-full relative">
        <div className="inner-wrapper  relative  flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-end">
              <X
                onClick={togglingBurger}
                className="size-10 scale-50 group-[.isOpen]:scale-100 lg:group-[.isOpen]:scale-150 transition-all delay-100"
              />
            </div>
            <div className="menu-container flex flex-col gap-4 items-start max-h-screen overflow-y-auto hide-scrollbar pb-[260px]">
              {menuRender.map((m) =>
                m.sub ? (
                  <div
                    key={m.name}
                    className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4  font-exo-2 font-medium text-2xl lg:text-4xl leading-[1.7em]  hover:text-primary  group/link"
                    onClick={toggling}
                  >
                    <LangLink href={m.link} className="w-46 lg:w-72">
                      {lang === "en" ? m.label.en : m.label.id}
                    </LangLink>
                    {m.isMore && (
                      <>
                        {/* // MOBILE SUB MENU */}
                        {/* MOBILE SUB MENU */}
                        <div className="lg:hidden flex flex-col gap-4 pl-4">
                          {m.sub &&
                            m.sub?.map((n) => {
                              const item = n as {
                                name: string;
                                id: string;
                                slug: string;
                                is_under_product?: boolean;
                                name_id?: string;
                              };
                              let link = item.slug;
                              const displayName =
                                lang === "id" && item.name_id
                                  ? item.name_id
                                  : item.name;
                              if (m.link === "/product")
                                link = item.is_under_product
                                  ? `/product/${item.slug}`
                                  : `/${item.slug}`;
                              else if (m.link === "/project")
                                link = `/project/category/${item.slug}`;
                              return (
                                <LangLink
                                  key={n.id}
                                  href={link}
                                  className="border-none background-transparent text-left text-app-white hover:text-primary text-sm font-medium font-exo-2"
                                >
                                  {displayName}
                                </LangLink>
                              );
                            })}
                        </div>
                        {/* // DESKTOP SUB MENU */}
                        <div className="hidden lg:block w-lg relative">
                          <div className="w-14 lg:w-24 h-px bg-app-white group-hover/link:w-full transition-all" />
                          {/* DESKTOP SUB MENU */}
                          <div className="hidden lg:block bg-app-black absolute z-[3] top-[100%] left-0 w-full opacity-0 pointer-events-none -translate-y-5 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:pointer-events-auto group-hover/link:translate-y-0">
                            <div className="w-2/3 ml-auto grid grid-cols-2 gap-6 pt-8">
                              {m.sub &&
                                m.sub?.map((n) => {
                                  const item = n as {
                                    name: string;
                                    id: string;
                                    slug: string;
                                    is_under_product?: boolean;
                                    name_id?: string;
                                  };
                                  let link = item.slug;
                                  const displayName =
                                    lang === "id" && item.name_id
                                      ? item.name_id
                                      : item.name;
                                  if (m.link === "/product")
                                    link = item.is_under_product
                                      ? `/product/${item.slug}`
                                      : `/${item.slug}`;
                                  else if (m.link === "/project")
                                    link = `/project/category/${item.slug}`;
                                  return (
                                    <LangLink
                                      key={n.id}
                                      href={link}
                                      className="border-none background-transparent text-left text-app-white hover:text-primary text-2xl font-medium font-exo-2"
                                    >
                                      {displayName}
                                    </LangLink>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <LangLink
                    key={m.name}
                    href={m.link}
                    className="flex items-center gap-4  font-exo-2 font-medium text-2xl lg:text-4xl leading-[1.7em]  hover:text-primary  group/link"
                    onClick={toggling}
                  >
                    <div className="w-46 lg:w-72">
                      {lang === "en" ? m.label.en : m.label.id}
                    </div>
                  </LangLink>
                )
              )}
            </div>
          </div>
          <div className="hidden">
            <div className="text-sm max-w-[320px] -translate-y-56 md:-translate-y-32 xl:translate-y-0">
              Copyright 2025 © All Rights Reserved Designed by Designata Studio
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0  text-primary  transition-all delay-200 translate-y-20 opacity-0 group-[.isOpen]:opacity-100 group-[.isOpen]:translate-y-0">
          <div className="relative size-full -translate-y-16 lg:translate-y-0  translate-x-[20%] lg:translate-x-0">
            <svg
              width={1058}
              height={250}
              viewBox="0 0 958 171"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="translate-x-[10%]"
            >
              <path d="M0 196H958L665 0L0 196Z" fill="currentColor" />
            </svg>
            <LangLink href="/" aria-label="Go Home" onClick={toggling}>
              <svg
                width={188}
                height={45}
                viewBox="0 0 188 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-28 right-60 lg:right-40"
              >
                <path
                  d="M64.876 12.81c-.892-3.187-4.142-5.545-8.03-5.545a8.41 8.41 0 0 0-7.711 4.652 318 318 0 0 1-10.133-.892C40.978 4.715 48.242 0 56.846 0c9.623 0 17.462 5.8 18.29 13.192-3.505-.064-6.946-.255-10.26-.383m-15.677 4.46c1.21 2.677 4.206 4.525 7.647 4.525 3.442 0 7.074-2.294 8.03-5.417l10.26-.382c-.892 7.329-8.73 13.064-18.29 13.064-8.54 0-15.74-4.588-17.78-10.897 3.122-.319 6.5-.638 10.133-.893m-39.066-2.74c0 4.015 3.696 7.265 8.22 7.265q1.061.004 2.104-.19v.19c3.441-1.402 8.73-2.421 15.614-3.314-2.167 6.118-9.241 10.58-17.717 10.58C8.22 29.06 0 22.56 0 14.53S8.221 0 18.354 0c8.476 0 15.614 4.525 17.78 10.706-6.118-.764-11.025-1.657-14.466-2.804l-.51-.19-.701-.256a7.6 7.6 0 0 0-2.103-.255c-4.525 0-8.221 3.25-8.221 7.265M155.689 1.083H188v6.373h-11.471v20.266h-9.368V7.456h-11.472zM99.672 13.83l8.922-12.682h8.348v12.937zm-23.261-.573V1.147h8.412l8.795 12.555zm0 14.211V15.932l18.481-.446 1.785 2.613 1.911-2.677 18.354-.318v12.363h-9.814V17.143l-6.755 10.005h-7.456l-6.628-10.005v10.388zm53.15-26.384h23.324v6.373h-23.324v3.633h23.324v6.373h-23.324v3.632h23.324v6.373h-32.756V15.104l20.903-.255v-.51l-20.903-.191V1.02h9.432zm45.056 41.996h1.529a3.9 3.9 0 0 0 1.53-.254c.416-.135.79-.376 1.083-.701.27-.277.486-.6.638-.956a3.7 3.7 0 0 0 0-2.358 2.55 2.55 0 0 0-.638-.956 2.5 2.5 0 0 0-1.083-.701 3.8 3.8 0 0 0-1.53-.319h-1.529zm-.765-6.946h2.549c.501-.008.998.078 1.466.255.469.144.902.383 1.275.701.386.345.71.755.956 1.211.239.518.349 1.087.318 1.657a3.64 3.64 0 0 1-.318 1.72c-.246.457-.57.867-.956 1.212a3.6 3.6 0 0 1-1.275.7 4 4 0 0 1-1.466.255h-2.549zm-6.309 4.971h3.314l-1.657-4.079zm-1.147 2.74h-.956l3.378-7.71h.764l3.314 7.71h-.892l-.828-2.039h-3.952zm-4.525-4.333h2.103l.637-.319a1.3 1.3 0 0 0 .255-.382.95.95 0 0 0 .128-.574.76.76 0 0 0-.128-.51 1.6 1.6 0 0 0-.255-.446l-.637-.255-.828-.127h-1.275zm-.828-3.378h2.294a3.2 3.2 0 0 1 1.848.51 1.78 1.78 0 0 1 .637 1.53 1.9 1.9 0 0 1-.637 1.593 3.2 3.2 0 0 1-1.848.51h-1.466v3.568h-.828zm-5.608 3.378h2.23a2 2 0 0 0 .637-.319l.255-.382q.11-.276.128-.574a1.5 1.5 0 0 0-.128-.51 1.6 1.6 0 0 0-.255-.446l-.637-.255-.892-.127h-1.338zm0 4.333h-.829v-7.71h2.422a3.2 3.2 0 0 1 1.848.51 2.164 2.164 0 0 1 .127 2.93 2.42 2.42 0 0 1-1.465.638l2.23 3.632h-.956l-2.103-3.568h-1.274zm-6.437-.764h4.079v.764h-4.908v-7.71h4.78v.7h-3.951v2.613h3.696v.765h-3.696zm-4.589.764h-.764v-7.01h-2.613v-.7h5.99v.7h-2.613zm-7.902-3.887a4 4 0 0 0-.191-1.21 4.4 4.4 0 0 0-.637-1.084 1.98 1.98 0 0 0-1.02-.701 2.9 2.9 0 0 0-1.275-.319 2.9 2.9 0 0 0-1.338.319c-.398.136-.75.378-1.02.7a4.4 4.4 0 0 0-.637 1.084c-.125.392-.19.8-.191 1.211-.004.432.06.863.191 1.275.16.39.374.754.637 1.083a2.9 2.9 0 0 0 1.02.701c.415.21.873.32 1.338.319.444-.009.88-.118 1.275-.319a2.4 2.4 0 0 0 1.02-.701c.263-.329.477-.694.637-1.084a4.1 4.1 0 0 0 .191-1.274m.829 0a4.5 4.5 0 0 1-.255 1.657c-.2.47-.481.901-.829 1.274a5.5 5.5 0 0 1-1.274.829 4.5 4.5 0 0 1-1.594.319 4.2 4.2 0 0 1-1.593-.319 3.7 3.7 0 0 1-1.274-.829 4.6 4.6 0 0 1-.893-1.274 4.5 4.5 0 0 1-.255-1.657 4.4 4.4 0 0 1 .255-1.593 4.6 4.6 0 0 1 .893-1.275 2.93 2.93 0 0 1 1.274-.828 4.2 4.2 0 0 1 1.593-.319 4.5 4.5 0 0 1 1.594.319c.473.192.906.473 1.274.828a3.76 3.76 0 0 1 1.084 2.868m-14.849 3.123h1.529a3.9 3.9 0 0 0 1.53-.255c.416-.135.79-.376 1.083-.701.27-.277.486-.6.637-.956a3.7 3.7 0 0 0 0-2.358 2.54 2.54 0 0 0-.637-.956 2.5 2.5 0 0 0-1.083-.701 3.8 3.8 0 0 0-1.53-.319h-1.529zm-.765-6.947h2.549a3.6 3.6 0 0 1 1.402.255c.493.13.951.37 1.338.701.387.345.711.755.956 1.211a4.5 4.5 0 0 1 .319 1.657 4.6 4.6 0 0 1-.319 1.72 4.4 4.4 0 0 1-.956 1.212 3.4 3.4 0 0 1-1.338.7 3.6 3.6 0 0 1-1.402.255h-2.549zm-2.804 6.5v-6.5h.828v7.711h-1.019l-4.589-6.627v6.627h-.764v-7.71h.955zm-7.648 1.211h-.764v-7.71h.764zm-5.416-.764h3.568v.764h-4.333v-7.71h.765zm-7.202-1.976h3.314l-1.657-4.079zm-1.147 2.74h-.956l3.378-7.71h.764l3.314 7.71h-.892l-.828-2.039h-3.951zm-2.931 0h-.765v-7.01h-2.613v-.7h5.99v.7h-2.613zm-8.094-.764h4.079v.764h-4.907v-7.71h4.78v.7H86.48v2.613h3.696v.765H86.48zm-6.692-.701 2.613-6.246h1.211v7.711h-.828v-6.691l-2.804 6.691h-.383l-2.804-6.691v6.691h-.765v-7.71h1.148zm-14.657-6.246h.765v3.314h4.206v-3.314h.764v7.711h-.764v-3.632h-4.206v3.632h-.765zm-1.339 6.5a1.7 1.7 0 0 1-.446.51l-.637.447-.828.318-.893.128a4.2 4.2 0 0 1-1.593-.319 3.7 3.7 0 0 1-1.274-.829 3.4 3.4 0 0 1-.829-1.274 3.5 3.5 0 0 1-.319-1.657 4.2 4.2 0 0 1 1.148-2.868 2.93 2.93 0 0 1 1.274-.828 4.2 4.2 0 0 1 1.593-.319c.477.023.948.109 1.403.255.501.2.941.53 1.274.956l-.701.51-.319-.383-.51-.318-.573-.191-.574-.128a2.9 2.9 0 0 0-1.338.319c-.39.15-.74.39-1.02.7a2.95 2.95 0 0 0-.573 1.084 2.74 2.74 0 0 0-.255 1.211c-.014.439.074.875.255 1.275.113.397.308.766.573 1.083.298.29.643.527 1.02.701.415.21.873.32 1.338.319h.574l.574-.192.573-.382a1.7 1.7 0 0 0 .446-.51zm-11.98.447h4.142v.764h-4.907v-7.71h4.78v.7h-4.015v2.613h3.76v.765h-3.76zm-4.525.764h-.765v-7.01h-2.613v-.7h5.927v.7h-2.55zm-8.349-1.465 2.613-6.246h1.147v7.711h-.764v-6.691l-2.804 6.691h-.383l-2.804-6.691v6.691h-.828v-7.71h1.21zm-6.181-2.422a4.1 4.1 0 0 0-.255-1.21 2.36 2.36 0 0 0-.638-1.084 2.1 2.1 0 0 0-.956-.701 3 3 0 0 0-2.676 0 2.1 2.1 0 0 0-.956.7 2.36 2.36 0 0 0-.637 1.084 2.74 2.74 0 0 0-.255 1.211c-.014.439.073.875.255 1.275.11.412.33.786.637 1.083.262.302.589.542.956.701a3 3 0 0 0 2.676 0c.367-.16.694-.399.956-.701.307-.297.527-.671.638-1.084.151-.408.237-.838.255-1.274m.828 0a4.5 4.5 0 0 1-.319 1.657 4.01 4.01 0 0 1-3.696 2.422 4.2 4.2 0 0 1-2.868-1.148 3.4 3.4 0 0 1-.828-1.274 4.5 4.5 0 0 1-.319-1.657 4.5 4.5 0 0 1 .319-1.593 3.63 3.63 0 0 1 2.103-2.103 4.14 4.14 0 0 1 3.186 0c.483.175.919.459 1.275.828a4.2 4.2 0 0 1 1.147 2.868m-8.794 2.677c-.137.2-.31.373-.51.51l-.638.445-.828.32-.892.127a4.2 4.2 0 0 1-2.868-1.148 3.4 3.4 0 0 1-.829-1.274 4.5 4.5 0 0 1-.318-1.657 4.5 4.5 0 0 1 .318-1.593 3.63 3.63 0 0 1 2.104-2.103 4.5 4.5 0 0 1 1.593-.319 5.4 5.4 0 0 1 1.402.255c.502.2.941.53 1.274.956l-.7.51-.32-.383-.51-.318-.573-.191-.573-.128a2.9 2.9 0 0 0-1.339.319c-.39.15-.739.39-1.02.7a2.95 2.95 0 0 0-.573 1.084 2.74 2.74 0 0 0-.255 1.211c-.014.439.074.875.255 1.275.113.397.308.766.574 1.083.297.29.642.527 1.02.701.414.21.873.32 1.338.319h.573l.638-.192.51-.382.51-.51zm-11.344.7a.57.57 0 0 1-.191.383.45.45 0 0 1-.383.191.58.58 0 0 1-.446-.191.45.45 0 0 1-.127-.382.51.51 0 0 1 .127-.447.57.57 0 0 1 .446-.19.45.45 0 0 1 .383.19.58.58 0 0 1 .19.447m-3.633.51H9.05v-7.01H6.437v-.7h5.99v.7H9.814zm-7.902-4.333h2.167l.573-.319.319-.382q.079-.282.064-.574a1.4 1.4 0 0 0-.064-.51l-.319-.446-.573-.318-.893-.128H1.912zm-.765-3.378h2.23a3.2 3.2 0 0 1 1.849.51 1.78 1.78 0 0 1 .637 1.53 1.91 1.91 0 0 1-.637 1.593 3.2 3.2 0 0 1-1.848.51H1.912v3.568h-.765zm186.343 4.844c.017.344-.026.69-.127 1.02-.06.341-.19.667-.383.955a2.6 2.6 0 0 1-.892.765 3.25 3.25 0 0 1-2.804 0 2.6 2.6 0 0 1-.892-.765 2.5 2.5 0 0 1-.383-.956 6.5 6.5 0 0 1-.127-1.02v-4.843h.765v4.716q.003.486.127.956c.064.255.191.51.255.701.115.18.267.332.446.446l.446.191.383.128h.764l.383-.128.446-.19c.179-.115.331-.268.446-.447.123-.218.209-.455.255-.7q.123-.471.127-.957v-4.716h.765z"
                  fill="#fff"
                />
              </svg>
            </LangLink>
            <div className="lg:hidden text-xs text-right max-w-[320px] absolute right-[23%] bottom-[32px] z-10 text-white pointer-events-none">
              Copyright 2025 © All Rights Reserved
              <br />
              Designed by Designata Studio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
