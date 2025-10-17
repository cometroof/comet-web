import BrandButton from "@/components/app/brand-button";
import { Download } from "lucide-react";

export default function AboutUsPage__Cover() {
  return (
    <section className="outer-wrapper bg-app-light-gray !py-[106px]">
      <div className="inner-wrapper  flex flex-col lg:flex-row gap-20 lg:justify-between items-start">
        <div className="w-full">
          <h2 className="text-caption">ABOUT US</h2>
          <div className="mt-4 text-heading1 span-inner-red">
            A progressive manufacturer of metal roofing, committed to delivering{" "}
            <span>minimalist, high-quality, and innovative</span> roofing
            solutions.
          </div>
        </div>
        <div className="w-full">
          <p className="text-body mt-10">
            With over 20 years of experience in the construction industry, we
            focus on sustainability, durability, and design. We strive to
            redefine the standards of modern construction and urban development.
            Our roofing products meet certified international quality standards
            and are designed for both durability and aesthetic appeal.
          </p>
          <BrandButton className="mt-16">
            <Download className="size-5" />
            <span>COMPANY PROFILE</span>
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
