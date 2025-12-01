"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";

export default function SeparatorBanner({
  imgUrl,
  children,
  optimized,
  height = 600,
  enableSticky = true,
  stickyTop = 0,
}: {
  imgUrl?: string;
  children?: ReactNode;
  optimized?: boolean;
  height?: number;
  enableSticky?: boolean;
  stickyTop?: number;
}) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableSticky || !bannerRef.current || !spacerRef.current) return;

    const element = bannerRef.current;
    const spacer = spacerRef.current;

    // Get header height dynamically
    const getHeaderHeight = (): number => {
      const header = document.querySelector("header");
      if (!header) return stickyTop;
      return header.getBoundingClientRect().height;
    };

    // Get initial position of the banner
    const getInitialTop = (): number => {
      return element.getBoundingClientRect().top + window.scrollY;
    };

    const headerHeight = getHeaderHeight();
    const initialTop = getInitialTop();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeSticky = scrollY >= initialTop - headerHeight;

      if (shouldBeSticky) {
        // Set spacer height to prevent layout shift
        spacer.style.height = `${element.offsetHeight}px`;
        element.style.position = "fixed";
        element.style.top = `${headerHeight}px`;
        element.style.width = "100%";
        // element.style.zIndex = "40";
      } else {
        // Remove spacer and reset banner position
        spacer.style.height = "0";
        element.style.position = "relative";
        element.style.top = "0";
        element.style.width = "";
        // element.style.zIndex = "auto";
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enableSticky, stickyTop]);

  return (
    <>
      {/* Spacer to prevent layout shift when banner becomes fixed */}
      <div ref={spacerRef} style={{ height: 0 }} />

      <div
        ref={bannerRef}
        className="w-full separator-banner"
        data-banner-height={height}
      >
        <div className="size-full relative">
          {imgUrl &&
            (optimized ? (
              <Image
                src={imgUrl}
                alt=""
                className="size-full object-cover"
                fill
              />
            ) : (
              <img
                src={imgUrl}
                alt="banner"
                className="size-full object-cover"
              />
            ))}
          {children}
        </div>
      </div>
    </>
  );
}
