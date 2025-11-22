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
  return (
    <div
      className={`sticky top-header w-full`}
      style={{ height: `${height}px` }}
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
