import supabaseClient from "@/supabase/client";
import { ReactNode } from "react";
import SeparatorBanner from "./separator-banner";

async function getCoverData(typeValue: string) {
  return (await supabaseClient.from("cover").select().eq("type", typeValue))
    .data;
}

export default async function DynamicBanner({
  children,
  optimized,
  height,
  typeValue,
  enableSticky = true,
}: {
  children?: ReactNode;
  optimized?: boolean;
  height?: number;
  typeValue: string;
  enableSticky?: boolean;
}) {
  const coverData = await getCoverData(typeValue);

  return coverData?.map((cover) => (
    <SeparatorBanner
      key={cover.id}
      imgUrl={cover.image}
      optimized={optimized}
      height={height}
      enableSticky={enableSticky}
    >
      {children}
    </SeparatorBanner>
  ));
}
