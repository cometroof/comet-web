import { ChevronRight } from "lucide-react";
import { ParamsLang } from "../types-general";
import { GuaranteeDictionary } from "@/types/dictionary";

export default function Guarantee__Steps({
  lang,
  dictionary,
}: {
  lang: ParamsLang["lang"];
  dictionary: GuaranteeDictionary;
}) {
  const loops = [
    {
      name: dictionary.claim_steps.step1Title,
      description: dictionary.claim_steps.step1Description,
    },
    {
      name: dictionary.claim_steps.step2Title,
      description: dictionary.claim_steps.step2Description,
    },
    {
      name: dictionary.claim_steps.step3title,
      description: dictionary.claim_steps.step3Description,
    },
    {
      name: dictionary.claim_steps.step4title,
      description: dictionary.claim_steps.step4Description,
    },
    {
      name: dictionary.claim_steps.step5title,
      description: dictionary.claim_steps.step5Description,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row mt-20">
      {loops.map((l, i) => (
        <div
          key={i}
          className="border-l-[3px] border-l-primary last:border-l-transparent lg:border-l-0  lg:border-t-[3px] lg:border-t-primary lg:last:border-t-transparent p-5 pl-10 pt-0 pb-10 lg:pb-5 lg:pl-5 lg:pt-16 relative group"
        >
          {/*{i < loops.length - 1 && (*/}
          <div className="size-9 rounded-full bg-primary absolute left-0 -translate-x-[50%] top-0 lg:translate-x-[0] lg:-translate-y-[50%] text-app-white flex items-center justify-center"></div>
          <div className="hidden lg:block text-primary  absolute top-0 left-[50%] -translate-x-[50%] -translate-y-[55%] group-last:hidden">
            <ChevronRight className="size-8" />
          </div>
          {/*)}*/}
          <div className="text-caption">
            {lang === "id" ? "Langkah" : "Step"} {i + 1}
          </div>
          <div className="mt-4 text-subheading h-12">{l.name}</div>
          <div className="mt-2.5 text-caption">{l.description}</div>
        </div>
      ))}
    </div>
  );
}
