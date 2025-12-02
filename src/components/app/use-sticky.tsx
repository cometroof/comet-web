"use client";

import { useEffect, useRef, RefObject } from "react";

export interface UseStickyOptions {
  enableSticky?: boolean;
  stickyTop?: number;
  onStickyChange?: (isSticky: boolean) => void;
}

export interface UseStickyReturn {
  elementRef: RefObject<HTMLDivElement | null>;
  spacerRef: RefObject<HTMLDivElement | null>;
  isSticky: boolean;
}

/**
 * Custom hook for sticky behavior
 * Provides refs and sticky state for manual implementation
 *
 * @example
 * const { elementRef, spacerRef, isSticky } = useSticky({ enableSticky: true });
 *
 * return (
 *   <>
 *     <div ref={spacerRef} style={{ height: 0 }} />
 *     <div ref={elementRef}>Your content</div>
 *   </>
 * );
 */
export function useSticky({
  enableSticky = true,
  stickyTop = 0,
  onStickyChange,
}: UseStickyOptions = {}): UseStickyReturn {
  const elementRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const isStickyRef = useRef<boolean>(false);

  useEffect(() => {
    if (!enableSticky || !elementRef.current || !spacerRef.current) return;

    const element = elementRef.current;
    const spacer = spacerRef.current;

    // Get header height dynamically
    const getHeaderHeight = (): number => {
      const header = document.querySelector("header");
      if (!header) return stickyTop;
      return header.getBoundingClientRect().height;
    };

    // Get initial position of the element
    const getInitialTop = (): number => {
      return element.getBoundingClientRect().top + window.scrollY;
    };

    const headerHeight = getHeaderHeight();
    const initialTop = getInitialTop();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeSticky = scrollY >= initialTop - headerHeight;

      if (shouldBeSticky && !isStickyRef.current) {
        // Set spacer height to prevent layout shift
        spacer.style.height = `${element.offsetHeight}px`;
        element.style.position = "fixed";
        element.style.top = `${headerHeight}px`;
        element.style.width = "100%";
        // element.style.zIndex = "40";

        isStickyRef.current = true;
        onStickyChange?.(true);
      } else if (!shouldBeSticky && isStickyRef.current) {
        // Remove spacer and reset element position
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

  return {
    elementRef,
    spacerRef,
    isSticky: isStickyRef.current,
  };
}
