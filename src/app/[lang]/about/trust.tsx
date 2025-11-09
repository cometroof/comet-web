import Image from "next/image";
import { ParamsLang } from "../types-general";

export default function AboutUsPage__Trust({
  lang,
}: {
  lang: ParamsLang["lang"];
}) {
  const content = `<p>Our relationships with customers, partners, and employees are built on trust, professionalism, transparency, and integrity. We believe strong collaboration is key to success. This approach helps ensure every project is executed with precision and completed on time.</p>
  <p>We actively support our business partners by providing product knowledge, technical assistance, and reliable solutions that strengthen their value and drive long-term growth.</p>
  <p>Within our team, we foster a culture of mutual respect and accountability. We are fully committed to safeguarding our workforce by maintaining a secure, healthy, and productive workplace environment at every stage of the production process.</p>`;
  return (
    <section className="outer-wrapper-x py-24 bg-app-light-gray relative">
      <div className="inner-wrapper">
        <h2 className="text-heading1 text-primary">3. Trust and Integrity</h2>
        <div className="flex flex-col-reverse lg:flex-row items-end gap-10 lg:gap-20 mt-10 lg:mt-10">
          <div
            className="text-body max-w-[572px] [&>p]:my-4"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className="w-full">
            <div className="bg-app-black aspect-[3.3/2] w-full relative">
              <Image
                fill
                className="size-full object-cover"
                alt="Trust & Integrity"
                src="https://comet-roof.my.id/images/about-trust-integrity-1762703250427.webp"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
