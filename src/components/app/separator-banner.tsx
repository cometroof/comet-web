import Image from "next/image";
import { ReactNode } from "react";

export default function SeparatorBanner({
  imgUrl,
  children,
  optimized,
  height,
}: {
  imgUrl?: string;
  children?: ReactNode;
  optimized?: boolean;
  height?: number;
}) {
  let hSection = "h-[600px]";
  if (height) hSection = `h-[${height}px]`;
  return (
    <div className={`${hSection} sticky top-header w-full`}>
      <div className="size-full relative">
        {imgUrl &&
          (optimized ? (
            <Image
              width={100}
              height={height || 600}
              src={imgUrl}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <img src={imgUrl} alt="banner" className="size-full object-cover" />
          ))}
        {children}
      </div>
    </div>
  );
}
