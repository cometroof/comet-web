import { Button } from "../ui/button";
import LanguageSelector from "./lang-selector";

function Burger() {
  return (
    <Button
      className="flex flex-col gap-1.5 w-10 p-1 px-2 [&>div]:w-full [&>div]:h-0.5 [&>div]:bg-white hover:[&>div]:bg-black"
      variant="ghost"
      aria-label="Button Burger Menu"
    >
      <div />
      <div />
      <div />
    </Button>
  );
}

export default function Header() {
  return (
    <header className="w-full bg-black outer-wrapper-x py-6  sticky top-0 z-[999] h-header">
      <div className="inner-wrapper flex justify-between items-center gap-10">
        <div className="w-[160px] h-9 bg-red-500 rounded-md" />
        <div className="flex gap-10">
          <LanguageSelector />
          <Burger />
        </div>
      </div>
    </header>
  );
}
