"use client";
import { Button } from "../ui/button";

function toggling() {
  const el = document.getElementById("burger-menu");
  if (el) {
    if (el.classList.contains("isClosed")) {
      el.classList.remove("isClosed");
      el.classList.add("isOpen");
    } else {
      el.classList.remove("isOpen");
      el.classList.add("isClosed");
    }
  }
}

export const togglingBurger = toggling;

export default function Burger() {
  return (
    <Button
      className="flex flex-col gap-1.5 w-10 p-1 px-2 [&>div]:w-full [&>div]:h-0.5 [&>div]:bg-white hover:[&>div]:bg-black"
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
