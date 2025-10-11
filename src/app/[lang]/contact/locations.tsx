import supabaseClient from "@/supabase/client";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

const getData = async () =>
  (
    await supabaseClient
      .from("contacts-location")
      .select("id,value,type")
      .eq("type", "location_product")
      .order("created_at", { ascending: false })
  ).data;

interface ValueLocation {
  id: string;
  name: string;
  locations: Location[];
  created_at: string;
  updated_at: string;
  order: number;
}

interface Location {
  id: string;
  name: string;
  link: string;
  created_at: string;
  updated_at: string;
}

export const revalidate = 300;

export default async function ContactPage__Locations() {
  const data = await getData();
  return (
    <div>
      <ul>
        {data?.map((item, index) => {
          if (!item.value)
            return <div key={item.id || `location-${index}`}>-</div>;
          const values = JSON.parse(`${item.value}`) as ValueLocation[];
          return values
            .sort((a, b) => a.order - b.order)
            .map((vv) => (
              <li key={vv.id} className="mt-8 first:mt-0">
                <div className="text-heading2 text-primary">
                  {vv?.name || "-"}
                </div>
                <ul className="flex gap-3 flex-wrap mt-2">
                  {vv.locations?.map((v) => (
                    <li
                      key={v.id}
                      className="block pr-3 border-r border-r-app-gray text-app-gray last:pr-0 last:border-r-0 leading-4"
                    >
                      {v.link ? (
                        <Link
                          href={v.link}
                          target="_blank"
                          className="flex gap-1 items-center underline"
                        >
                          <span>{v.name}</span>
                          <MoveUpRight className="size-3" />
                        </Link>
                      ) : (
                        v.name
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ));
        })}
      </ul>
    </div>
  );
}
