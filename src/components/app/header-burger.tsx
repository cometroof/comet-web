"use client";
import { Button } from "../ui/button";

import { trackEvent } from "@/lib/gtag";

function toggling() {
  const el = document.getElementById("burger-menu");
  if (el) {
    if (el.classList.contains("isClosed")) {
      trackEvent("web_comet_event", {
        screen_name: "Burger Menu",
        condition: "open",
      });
      el.classList.remove("isClosed");
      el.classList.add("isOpen");
      document.body.style.overflowY = "hidden";
      document.body.style.overflowX = "hidden";
    } else {
      trackEvent("web_comet_event", {
        screen_name: "Burger Menu",
        condition: "close",
      });
      el.classList.remove("isOpen");
      el.classList.add("isClosed");
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
    }
  }
}

export const togglingBurger = toggling;

export default function Burger() {
  return (
    <Button
      className="flex flex-col gap-1.5 w-10 p-1 px-2 [&>div]:w-full [&>div]:h-0.5 [&>div]:bg-white hover:[&>div]:bg-black rounded-none"
      variant="ghost"
      aria-label="Button Burger Menu"
      onClick={toggling}
    >
      <div />
      <div />
      <div />
    </Button>
  );
}
