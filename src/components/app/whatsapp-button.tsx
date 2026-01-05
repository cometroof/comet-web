"use client";

import supabaseClient from "@/supabase/client";
import { LangLink } from "./lang-link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/gtag";

export default function WhatsappButton() {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabaseClient
        .from("contacts-location")
        .select()
        .eq("type", "whatsapp_contact_service")
        .single();
      if (data) {
        setPhone(data.value || "");
      }
    };
    getData();
  }, []);

  const handleClick = () => {
    trackEvent("WhatsApp Button", {
      screen_name: "WhatsApp",
    });
  };

  return (
    <LangLink
      href={`https://wa.me/${phone}?text=Hello Comet!%0A%0A`}
      target="_blank"
      className="size-14 lg:size-16 block z-10"
      onClick={handleClick}
    >
      <svg
        width={60}
        height={60}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 30c0-13.148 0-20.452-4.774-25.226C50.456 0 43.148 0 30 0S9.548 0 4.774 4.774 0 16.856 0 30s0 20.452 4.774 25.226S16.856 60 30 60s20.452 0 25.226-4.774C60 50.456 60 43.148 60 30"
          fill="#25d366"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M43.05 16.238c-3.325-3.313-7.747-5.139-12.46-5.14-9.709 0-17.61 7.863-17.614 17.528a17.43 17.43 0 0 0 2.351 8.764l-2.499 9.084 9.338-2.437a17.66 17.66 0 0 0 8.417 2.133h.008c9.707 0 17.61-7.864 17.614-17.53a17.38 17.38 0 0 0-5.155-12.4zM30.59 43.21h-.005a14.7 14.7 0 0 1-7.452-2.031l-.535-.316-5.541 1.446 1.479-5.377-.348-.551a14.5 14.5 0 0 1-2.238-7.754c.003-8.033 6.57-14.569 14.647-14.569a14.58 14.58 0 0 1 10.35 4.273 14.45 14.45 0 0 1 4.284 10.308c-.004 8.034-6.571 14.57-14.64 14.57m8.031-10.912c-.44-.22-2.604-1.279-3.008-1.425s-.696-.22-.99.22c-.292.438-1.136 1.425-1.393 1.717s-.513.328-.954.109-1.858-.682-3.54-2.174c-1.307-1.162-2.191-2.595-2.448-3.034-.256-.439-.027-.676.193-.894.197-.196.44-.512.66-.767.22-.256.294-.439.44-.73.147-.293.074-.549-.036-.768-.11-.22-.99-2.375-1.357-3.252-.357-.854-.72-.738-.99-.752a18 18 0 0 0-.844-.015c-.294 0-.77.109-1.174.548-.403.438-1.54 1.498-1.54 3.654s1.577 4.238 1.797 4.53c.22.293 3.104 4.717 7.518 6.615 1.05.451 1.87.721 2.51.923 1.054.334 2.013.287 2.772.174.845-.126 2.604-1.06 2.97-2.083s.367-1.9.257-2.083c-.11-.182-.404-.292-.844-.512z"
          fill="#fff"
        />
      </svg>
    </LangLink>
  );
}
