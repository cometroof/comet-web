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
      image: "/assets/innovation-interlocking.webp",
      position: "right",
    },
    {
      title: text.innovation.integratedSystemTitle,
      description: text.innovation.integratedSystemDescription,
      image: "/assets/innovation-integrated-system.webp",
      position: "bottom",
    },
    {
      title: text.innovation.finishingTitle,
      description: text.innovation.finishingDescription,
      image: "/assets/innovation-finishing-color.webp",
      position: "right",
    },
  ];

  return (
    <section className="outer-wrapper-x py-10 lg:py-24 bg-app-white relative">
      <div className="inner-wrapper">
        <h2 className="text-heading1 text-primary">
          2. {text.innovation.title}
        </h2>
        <p className="mt-10 text-body max-w-[572px]">
          {text.innovation.description}
        </p>

        <Accordion
          type="single"
          collapsible
          className="mt-8 w-full"
          defaultValue="item-0"
        >
          {innovations.map((innovation, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left [&>svg.lucide]:hidden fill-primary">
                <h3 className="text-heading2">{innovation.title}</h3>
                <svg
                  width="15"
                  height="11"
                  viewBox="0 0 15 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-primary"
                >
                  <path d="m0 0 7.478 11L15 0z" fill="" />
                </svg>
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className={`flex gap-10 ${
                    innovation.position === "right"
                      ? "flex-col lg:flex-row"
                      : "flex-col"
                  }`}
                >
                  <div className="text-body lg:max-w-[50%]">
                    {innovation.description}
                  </div>
                  <div className="w-full max-w-2xl">
                    {innovation.image && (
                      <img
                        alt={innovation.title}
                        src={innovation.image}
                        className="h-auto block"
                      />
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
