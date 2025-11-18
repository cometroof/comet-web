import FooterInside from "../components/app/footer-inside";

import supabaseClient from "@/supabase/client";
import { Database } from "@/supabase/supabase";
import { ReactNode } from "react";

async function getSocial() {
  return (
    await supabaseClient
      .from("contacts-location")
      .select()
      .in("type", ["twitter", "instagram", "youtube", "telegram", "facebook"])
  ).data;
}

async function productLink() {
  const ps = (
    await supabaseClient
      .from("product")
      .select("id,name,slug,is_under_product,order")
  ).data;
  if (ps) {
    const sorted = ps.sort((a, b) => {
      if (a.is_under_product !== b.is_under_product) {
        return Number(b.is_under_product) - Number(a.is_under_product);
      }
      return a.order - b.order;
    });
    return sorted;
  }
}

async function projectLink() {
  const ps = (
    await supabaseClient
      .from("project_categories")
      .select("id,name,slug")
      .order("order")
      .limit(6)
  ).data;
  return ps;
}

type ContactsLocation = Partial<
  Database["public"]["Tables"]["contacts-location"]["Row"]
>;

export interface SocialRow extends ContactsLocation {
  icon: ReactNode;
}

export default async function FooterNew({
  className,
  classNameBottom,
}: {
  className?: string;
  classNameBottom?: string;
}) {
  const _social = await getSocial();
  const _productLink = await productLink();
  const _projectLink = await projectLink();
  return (
    <FooterInside
      className={className}
      classNameBottom={classNameBottom}
      socialData={_social || []}
      productLink={_productLink}
      projectLink={_projectLink}
    />
  );
}
