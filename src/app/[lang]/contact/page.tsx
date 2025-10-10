import Image from "next/image";
import { getDictionary } from "../dictionaries";
import { ParamsLang } from "../types-general";
import FormContact from "./form-contact";
import ContactPage__Locations from "./locations";
import ContactPage__ContactSection from "./contact-section";
import FooterNew from "@/components/app/footer";

export default async function ContactPage({
  params,
}: {
  params: Promise<ParamsLang>;
}) {
  const { lang = "en" } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <div className="min-h-screen bg-app-white text-app-gray">
        <section className="outer-wrapper">
          <div className="inner-wrapper">
            <div className="text-caption">CONTACT US</div>
            <div className="mt-8">
              <h2 className="w-full max-w-[430px] span-inner-red text-heading1">
                <div>
                  <span>We&apos;re here to assist you.</span>
                </div>
                Connect with us for more information
              </h2>
            </div>
            <div className="mt-8 w-full h-px bg-app-gray" />
            <FormContact dictionary={dictionary} />
          </div>
        </section>
        <section className="outer-wrapper bg-app-light-gray !py-16">
          <div className="inner-wrapper">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="w-full lg:w-2/5">
                <h2 className="text-heading1">
                  {dictionary.contact.coverage.heading}
                </h2>
                <div className="mt-8 flex gap-10 items-center flex-wrap justify-start">
                  <Image
                    src="/assets/mitra-10-logo.webp"
                    alt="Mitra 10"
                    title="Mitra 10"
                    width={153}
                    height={70}
                  />
                  <Image
                    src="/assets/csa-logo.webp"
                    alt="CSA"
                    title="CSA"
                    width={148}
                    height={108}
                  />
                </div>
              </div>
              <div className="flex-1">
                <ContactPage__Locations />
              </div>
            </div>
          </div>
        </section>
        <section className="outer-wrapper bg-app-black !py-40">
          <div className="inner-wrapper">
            <ContactPage__ContactSection />
          </div>
        </section>
      </div>
      <FooterNew className="bg-app-black" />
    </>
  );
}
