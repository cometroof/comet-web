import supabaseClient from "@/supabase/client";
import provinceData from "./province.json";

const getData = async () =>
  (
    await supabaseClient
      .from("contacts-location")
      .select("id,value,type")
      .eq("data_type", "location_product")
      .order("created_at", { ascending: false })
  ).data;

interface Location {
  id: string;
  name: string;
  link: string;
  created_at: string;
  updated_at: string;
  province_code: string;
}

export const revalidate = 60 * 5;

export default async function Locations() {
  const data = await getData();

  function finder(code: string) {
    const result = provinceData.data.find((p) => p.code === code);
    return result || null;
  }

  return (
    <div>
      <ul>
        {data?.map((item, index) => {
          if (!item.value)
            return <div key={item.id || `location-${index}`}>-</div>;
          const values = JSON.parse(`${item.value}`) as Location[];
          const province = finder(item.type.replace("location_", ""));
          if (!province)
            return <div key={item.id || `location-${index}`}>No Prov</div>;
          return (
            <li key={item.id}>
              <div className="text-heading2 text-primary">{province.name}</div>
              <ul className="flex gap-3 flex-wrap mt-1">
                {values.map((v) => (
                  <li
                    key={v.id}
                    className="block pr-3 border-r border-r-app-gray text-app-gray last:border-r-0"
                  >
                    {v.name}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
