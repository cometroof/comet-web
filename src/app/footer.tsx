import FooterInside from "../components/app/footer-inside";

import supabaseClient from "@/supabase/client";
import { Database } from "@/supabase/supabase";
import { ReactNode } from "react";

export const revalidate = 300;

async function getSocial() {
  return (
    await supabaseClient
      .from("contacts-location")
      .select()
      .in("type", ["twitter", "instagram", "youtube", "telegram", "facebook"])
  ).data;
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
  return (
    <FooterInside
      className={className}
      classNameBottom={classNameBottom}
      socialData={_social || []}
    />
  );
}
