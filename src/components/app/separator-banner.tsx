"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { withSticky, StickyInjectedProps } from "./with-sticky";
import StickyWrapper from "./sticky-wrapper";

interface SeparatorBannerProps extends StickyInjectedProps {
  imgUrl?: string;
  children?: ReactNode;
  optimized?: boolean;
  height?: number;
}

// Base component for HOC pattern
function SeparatorBannerBase({
  imgUrl,
  children,
  optimized,
  height = 600,
  bannerRef,
  spacerRef,
}: SeparatorBannerProps) {
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

// Component-based version using StickyWrapper
export function SeparatorBannerWithWrapper({
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
  return (
    <StickyWrapper
      enableSticky={enableSticky}
      stickyTop={stickyTop}
      className="w-full separator-banner"
    >
      <div data-banner-height={height}>
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
    </StickyWrapper>
  );
}

// Export the HOC version as default
export default withSticky(SeparatorBannerBase);
