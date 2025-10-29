import { ProductDictionary } from "@/types/dictionary";
import { getPageDictionary } from "../dictionaries";
import { ParamsLang } from "../types-general";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";

export default async function ProductPage__MetalRoofTable({
  lang,
}: ParamsLang) {
  const _lang = lang || "id";
  const { metalRoofTable } = (await getPageDictionary(
    _lang,
    "product",
  )) as ProductDictionary;

  const rows = [
    {
      rowTitle: metalRoofTable.rowElegentTitle,
      rowDesc: metalRoofTable.rowElegantDesc,
      isMetalRoof: true,
      isConcreteRoof: true,
      isBitumenRoof: true,
    },
    {
      rowTitle: metalRoofTable.rowLifetimeTitle,
      rowDesc: metalRoofTable.rowLifetimeDesc,
      isMetalRoof: true,
      isConcreteRoof: true,
      isBitumenRoof: false,
    },
    {
      rowTitle: metalRoofTable.rowLightWeightTitle,
      rowDesc: metalRoofTable.rowLightWeightDesc,
      isMetalRoof: true,
      isConcreteRoof: false,
      isBitumenRoof: false,
    },
    {
      rowTitle: metalRoofTable.rowRecycleTitle,
      rowDesc: metalRoofTable.rowRecycleDesc,
      isMetalRoof: true,
      isConcreteRoof: false,
      isBitumenRoof: false,
    },
  ];

  return (
    <section className="outer-wrapper-x pt-[77px] pb-[120px] relative bg-app-light-gray">
      <div className="inner-wrapper">
        <h2
          className="text-heading1 span-inner-red max-w-[572px]"
          dangerouslySetInnerHTML={{ __html: metalRoofTable.title }}
        ></h2>
        <div className="mt-[77px]">
          <Table className="bg-app-white w-full md:table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="py-6 uppercase text-center w-3/6   text-subheading">
                  {metalRoofTable.col_feature}
                </TableHead>
                <TableHead className="py-6 uppercase text-center w-1/6 bg-primary text-background   text-subheading">
                  <div className="text-background">
                    {metalRoofTable.col_metalRoof}
                  </div>
                </TableHead>
                <TableHead className="py-6 uppercase text-center w-1/6   text-subheading">
                  {metalRoofTable.col_concrete}
                </TableHead>
                <TableHead className="py-6 uppercase text-center w-1/6   text-subheading">
                  {metalRoofTable.col_bitumen}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((i, n) => (
                <TableRow key={n}>
                  <TableCell className="w-3/6 py-6 px-8">
                    <div className="space-y-1">
                      <div className="text-subheading break-words">
                        {i.rowTitle}
                      </div>
                      <div className="text-caption break-words whitespace-normal">
                        {i.rowDesc}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6 py-6 px-8 bg-primary text-center">
                    <div className="size-5 rounded-full flex items-center justify-center bg-app-white text-primary mx-auto">
                      {i.isMetalRoof ? (
                        <Check className="size-4" />
                      ) : (
                        <X className="size-4" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6 py-6 px-8 text-center">
                    <div className="size-5 rounded-full flex items-center justify-center bg-app-gray text-app-white mx-auto">
                      {i.isConcreteRoof ? (
                        <Check className="size-4" />
                      ) : (
                        <X className="size-4" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6 py-6 px-8 text-center">
                    <div className="size-5 rounded-full flex items-center justify-center bg-app-gray text-app-white mx-auto">
                      {i.isBitumenRoof ? (
                        <Check className="size-4" />
                      ) : (
                        <X className="size-4" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
