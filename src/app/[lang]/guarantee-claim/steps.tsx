import { ChevronRight } from "lucide-react";
import { ParamsLang } from "../types-general";

const en = [
  {
    name: "Check Your Warranty Coverage",
    description:
      "Review your warranty terms to make sure the issue is covered before starting a claim.",
  },
  {
    name: "Gather Documentation",
    description:
      "Collect proof of purchase, photos of the issue, and any other relevant documents.",
  },
  {
    name: "Contact Us",
    description:
      "Reach out to our support team to start the claim process or ask any questions.",
  },
  {
    name: "Inspection (If Required)",
    description:
      "Our team will review your claim and may schedule an inspection to assess the issue.",
  },
  {
    name: "Claim Resolution",
    description:
      "Once reviewed, we will inform you of the decision and the next steps to resolve your claim.",
  },
];

const steps = { en, id: en };

export default function Guarantee__Steps({ lang }: ParamsLang) {
  const _lang = lang || "en";
  const loops = steps[_lang];

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
          <div className="text-caption">Step {i + 1}</div>
          <div className="mt-4 text-subheading h-12">{l.name}</div>
          <div className="mt-2.5 text-caption">{l.description}</div>
        </div>
      ))}
    </div>
  );
}
