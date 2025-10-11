import { X } from "lucide-react";
import { togglingBurger } from "./header-burger";
import Link from "next/link";

const menuList = [
  { name: "About Us", link: "/about" },
  { name: "Products", link: "/product", isMore: true },
  { name: "Projects", link: "/project", isMore: true },
  { name: "Articles", link: "/article" },
  { name: "Contact Us", link: "/contact" },
  { name: "Guarantee Claim", link: "/guarantee" },
];

export default function HeaderMenu() {
  return (
    <div className="header-menu group isClosed" id="burger-menu">
      <div className="outer-wrapper h-full">
        <div className="inner-wrapper  relative  flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-end">
              <X
                onClick={togglingBurger}
                className="size-10  scale-50 group-[.isOpen]:scale-150 transition-all delay-100"
              />
            </div>
            <div className="flex flex-col gap-4 items-start">
              {menuList.map((m) => (
                <Link
                  key={m.name}
                  href={m.link}
                  className="flex items-center gap-4  font-exo-2 font-medium text-4xl leading-[1.7em]  hover:text-primary"
                >
                  <div className="w-72">{m.name}</div>
                  {m.isMore && <div className="w-24 h-px bg-app-white" />}
                </Link>
              ))}
            </div>
          </div>
          <div>COPYRIGHT</div>
        </div>
      </div>
    </div>
  );
}
