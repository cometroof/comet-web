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
    "product"
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
              <TableRow className="border-b border-app-gray">
                <TableHead className="py-6 px-4 lg:px-8 uppercase text-center w-3/6   text-subheading">
                  <div className="size-full  flex items-end justify-self-auto text-primary">
                    {metalRoofTable.col_feature}
                  </div>
                </TableHead>
                <TableHead className="py-6 uppercase text-center w-1/6 bg-primary text-background   text-subheading  border-r border-app-gray lg:border-none">
                  <div className="text-background [writing-mode:vertical-rl] rotate-180 lg:[writing-mode:initial] lg:rotate-0 my-auto">
                    {metalRoofTable.col_metalRoof}
                  </div>
                </TableHead>
                <TableHead className="py-6 uppercase text-center w-1/6   text-subheading  border-r border-app-gray lg:border-none">
                  <div className="[writing-mode:vertical-rl] rotate-180 lg:[writing-mode:initial] lg:rotate-0 my-auto">
                    {metalRoofTable.col_concrete}
                  </div>
                </TableHead>
                <TableHead className="py-6 uppercase text-center w-1/6   text-subheading">
                  <div className=" [writing-mode:vertical-rl] rotate-180 lg:[writing-mode:initial] lg:rotate-0 my-auto">
                    {metalRoofTable.col_bitumen}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((i, n) => (
                <TableRow
                  key={n}
                  className={`border-y border-app-gray lg:border-none`}
                >
                  <TableCell className="w-3/6 p-4 lg:py-6 lg:px-8">
                    <div className="space-y-1">
                      <div className="text-subheading break-words">
                        {i.rowTitle}
                      </div>
                      <div className="text-caption break-words whitespace-normal">
                        {i.rowDesc}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-4 lg:py-6 lg:px-8 bg-primary text-center  border-r border-app-gray lg:border-none">
                    <div className="size-5 rounded-full flex items-center justify-center bg-app-white text-primary mx-auto">
                      {i.isMetalRoof ? (
                        <Check className="size-4" />
                      ) : (
                        <X className="size-4" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6 p-4 lg:py-6 lg:px-8 text-center  border-r border-app-gray lg:border-none">
                    <div className="size-5 rounded-full flex items-center justify-center bg-app-gray text-app-white mx-auto">
                      {i.isConcreteRoof ? (
                        <Check className="size-4" />
                      ) : (
                        <X className="size-4" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6 p-4 lg:py-6 lg:px-8 text-center">
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
