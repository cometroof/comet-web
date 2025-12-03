"use client";

import { ReactNode, useEffect, useRef, CSSProperties } from "react";

export interface StickyWrapperProps {
  children: ReactNode;
  enableSticky?: boolean;
  stickyTop?: number;
  className?: string;
  style?: CSSProperties;
  onStickyChange?: (isSticky: boolean) => void;
}

/**
 * Component-based sticky wrapper
 * Wraps any content and provides sticky behavior when scrolling
 *
 * @example
 * <StickyWrapper enableSticky={true} stickyTop={0}>
 *   <div>Your content here</div>
 * </StickyWrapper>
 */
export default function StickyWrapper({
  children,
  enableSticky = true,
  stickyTop = 0,
  className = "",
  style,
  onStickyChange,
}: StickyWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const isStickyRef = useRef<boolean>(false);

  useEffect(() => {
    if (!enableSticky || !wrapperRef.current || !spacerRef.current) return;

    const element = wrapperRef.current;
    const spacer = spacerRef.current;

    // Get initial position of the wrapper
    const getInitialTop = (): number => {
      return element.getBoundingClientRect().top + window.scrollY;
    };

    const stickyThreshold = 84; // Fixed threshold at 84px
    const initialTop = getInitialTop();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeSticky = scrollY >= initialTop - stickyThreshold;

      if (shouldBeSticky && !isStickyRef.current) {
        // Set spacer height to prevent layout shift
        spacer.style.height = `${element.offsetHeight}px`;
        element.style.position = "fixed";
        element.style.top = `${stickyThreshold}px`;
        element.style.width = "100%";
        // element.style.zIndex = "40";

        isStickyRef.current = true;
        onStickyChange?.(true);
      } else if (!shouldBeSticky && isStickyRef.current) {
        // Remove spacer and reset wrapper position
        spacer.style.height = "0";
        element.style.position = "relative";
        element.style.top = "0";
        element.style.width = "";
        // element.style.zIndex = "";

        isStickyRef.current = false;
        onStickyChange?.(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [enableSticky, stickyTop, onStickyChange]);

  return (
    <>
      {/* Spacer to prevent layout shift when wrapper becomes fixed */}
      <div ref={spacerRef} style={{ height: 0 }} />

      <div ref={wrapperRef} className={className} style={style}>
        {children}
      </div>
    </>
  );
}
