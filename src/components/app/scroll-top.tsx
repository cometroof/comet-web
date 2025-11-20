"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";

export default function ScrollTop() {
  const [visible, setIsvVisible] = useState(false);

  useEffect(() => {
    function doVisible() {
      setIsvVisible(true);
      const el = document.getElementById("cta-layer");
      if (el) {
        el.style.height = "160px";
      }
    }

    function doHide() {
      setIsvVisible(false);
      const el = document.getElementById("cta-layer");
      if (el) {
        el.style.height = "60px";
      }
    }

    const toggleVisibility = () => {
      if (window.pageYOffset > 350 && window.innerWidth < 768) {
        doVisible();
      } else {
        doHide();
      }
    };

    const showHide = () => {
      if (window.innerWidth >= 768) {
        doVisible();
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    window.addEventListener("resize", showHide);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", showHide);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className={`size-[60px] rounded-full transition-all ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-[40px]"
      }`}
    >
      <ChevronUp className="size-10" />
    </Button>
  );
}
