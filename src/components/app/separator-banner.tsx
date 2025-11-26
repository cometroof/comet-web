import Image from "next/image";
import { ReactNode } from "react";

export default function SeparatorBanner({
  imgUrl,
  children,
  optimized,
  height = 600,
}: {
  imgUrl?: string;
  children?: ReactNode;
  optimized?: boolean;
  height?: number;
}) {
  // const classHeight = `h-[${height / 2}]px lg:h-[${height}px]`;
  return (
    <div
      // className="sticky top-header w-full separator-banner"
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
            <img src={imgUrl} alt="banner" className="size-full object-cover" />
          ))}
        {children}
      </div>
    </div>
  );
}
