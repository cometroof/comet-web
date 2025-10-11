import Burger from "./header-burger";
import HeaderMenu from "./header-menu";
import LanguageSelector from "./lang-selector";

export default function Header() {
  return (
    <>
      <header className="w-full bg-black outer-wrapper-x py-6  sticky top-0 z-[999] h-header">
        <div className="inner-wrapper flex justify-between items-center gap-10">
          <div className="w-[160px] h-9 bg-red-500 rounded-md" />
          <div className="flex gap-10">
            <LanguageSelector />
            <Burger />
          </div>
        </div>
      </header>
      {/*MENU*/}
      <HeaderMenu />
    </>
  );
}
