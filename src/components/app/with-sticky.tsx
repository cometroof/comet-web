"use client";

import { ComponentType, useEffect, useRef, ReactElement } from "react";

export interface WithStickyProps {
  enableSticky?: boolean;
  stickyTop?: number;
}

export interface StickyInjectedProps {
  bannerRef: React.RefObject<HTMLDivElement>;
  spacerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Higher-Order Component for handling sticky flow
 * Wraps a component and provides sticky behavior when scrolling
 *
 * @param WrappedComponent - The component to wrap with sticky functionality
 * @returns A new component with sticky behavior
 */
export function withSticky<P extends StickyInjectedProps>(
  WrappedComponent: ComponentType<P>
) {
  return function WithStickyComponent(
    props: Omit<P, keyof StickyInjectedProps> & WithStickyProps
  ): ReactElement {
    const { enableSticky = true, stickyTop = 0, ...restProps } = props;
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
        } else {
          // Remove spacer and reset banner position
          spacer.style.height = "0";
          element.style.position = "relative";
          element.style.top = "0";
          element.style.width = "";
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
      <WrappedComponent
        {...(restProps as P)}
        bannerRef={bannerRef}
        spacerRef={spacerRef}
      />
    );
  };
}
