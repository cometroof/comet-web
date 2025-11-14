import { LangLink } from "@/components/app/lang-link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import supabaseClient from "@/supabase/client";
import { Mail, Phone, Printer } from "lucide-react";
import Link from "next/link";

const getData = async () =>
  (
    await supabaseClient
      .from("contacts-location")
      .select("id,type,value")
      .in("type", ["phone", "head_office", "head_office_link", "fax", "email"])
  ).data;

export const revalidate = 300;

export default async function ContactPage__ContactSection() {
  const data = await getData();
  const mapSrc = data?.find((d) => d.type === "head_office_link")?.value;
  const headOffice = data?.find((d) => d.type === "head_office")?.value || "";
  const phone = data?.find((d) => d.type === "phone")?.value;
  const fax = data?.find((d) => d.type === "fax")?.value;
  const email = data?.find((d) => d.type === "email")?.value;
  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 text-background">
      <div className="w-2/5">
        <h2 className="text-heading2 text-primary">Head Office</h2>
        <div
          className="mt-3 text-body"
          dangerouslySetInnerHTML={{ __html: headOffice }}
        ></div>
        <div className="mt-32">
          <ul className="space-y-4">
            {phone && (
              <li className="flex gap-3 items-center">
                <div className="size-[32px] bg-primary rounded-full flex items-center justify-center text-app-black p-1">
                  <Phone className="size-5" />
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <LangLink href={`tel:${phone}`} className="hover:underline">
                      {phone}
                    </LangLink>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-none">
                    <p>Click to call</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            )}
            {fax && (
              <li className="flex gap-3 items-center">
                <div className="size-[32px] bg-primary rounded-full flex items-center justify-center text-app-black p-1">
                  <Printer className="size-5" />
                </div>
                <div className="text-body">{fax}</div>
              </li>
            )}
            {email && (
              <li className="flex gap-3 items-center">
                <div className="size-[32px] bg-primary rounded-full flex items-center justify-center text-app-black p-1">
                  <Mail className="size-5" />
                </div>
                <div className="text-body">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <LangLink
                        href={`mailto:${email}`}
                        className="hover:underline"
                      >
                        {email}
                      </LangLink>
                    </TooltipTrigger>
                    <TooltipContent className="rounded-none">
                      <p>Click to send email</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <iframe
          src={mapSrc}
          width="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps - Head Office PT Comtech Metalindo Terpadu"
          className="w-full min-h-[300px] xl:h-[420px]"
        />
      </div>
    </div>
  );
}
