import { ReactNode } from "react";

export default function SeparatorBanner({
  imgUrl,
  children,
}: {
  imgUrl?: string;
  children?: ReactNode;
}) {
  return (
    <div className="h-[600px] sticky top-header w-full">
      <div className="size-full relative">
        {imgUrl && (
          <img src={imgUrl} alt="banner" className="size-full object-cover" />
        )}
        {children}
      </div>
    </div>
  );
}
