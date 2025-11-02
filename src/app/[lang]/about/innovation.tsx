import { AboutUsDictionary } from "@/types/dictionary";
import { getPageDictionary } from "../dictionaries";
import { ParamsLang } from "../types-general";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function AboutUsPage__Innovation({ lang }: ParamsLang) {
  const _lang = lang || "id";
  const text = (await getPageDictionary(_lang, "about")) as AboutUsDictionary;

  const innovations = [
    {
      title: text.innovation.roofProfileTitle,
      description: text.innovation.roofProfileDescripton,
    },
    {
      title: text.innovation.integratedSystemTitle,
      description: text.innovation.integratedSystemDescription,
    },
    {
      title: text.innovation.finishingTitle,
      description: text.innovation.finishingDescription,
    },
  ];

  return (
    <section className="outer-wrapper-x py-24 bg-app-white relative">
      <div className="inner-wrapper">
        <h2 className="text-heading1 text-primary">
          2. {text.innovation.title}
        </h2>
        <p className="mt-10 text-body max-w-[572px]">
          {text.innovation.description}
        </p>

        <Accordion type="single" collapsible className="mt-8 w-full">
          {innovations.map((innovation, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <h3 className="text-heading2">{innovation.title}</h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-body max-w-[50%]">
                  {innovation.description}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
