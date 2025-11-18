import supabaseClient from "@/supabase/client";
import Image from "next/image";
import { ReactNode } from "react";

async function getCoverData(typeValue: string) {
  return (await supabaseClient.from("cover").select().eq("type", typeValue))
    .data;
}

export default async function DynamicBanner({
  children,
  optimized,
  height,
  typeValue,
}: {
  children?: ReactNode;
  optimized?: boolean;
  height?: number;
  typeValue: string;
}) {
  const coverData = await getCoverData(typeValue);
  let hSection = "h-[600px]";
  if (height) hSection = `h-[${height}px]`;
  return coverData?.map((cover) => (
    <div key={cover.id} className={`${hSection} sticky top-header w-full`}>
      <div className="size-full relative">
        {cover.image &&
          (optimized ? (
            <Image
              src={cover.image}
              alt={`image-${typeValue}`}
              className="size-full object-cover"
              fill
            />
          ) : (
            <img
              src={cover.image}
              alt="banner"
              className="size-full object-cover"
            />
          ))}
        {children}
      </div>
    </div>
  ));
}
