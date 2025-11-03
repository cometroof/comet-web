import { ParamsLang } from "../types-general";

export default function AboutUsPage__Distribution({ lang }: ParamsLang) {
  return (
    <section className="outer-wrapper-x py-24 bg-app-white relative">
      <div className="inner-wrapper">
        <h2 className="text-heading1 text-primary">
          5. Nationwide Distribution
        </h2>
        <div className="flex flex-col lg:flex-row mt-8 gap-10 lg:gap-[100px]">
          <div className="lg:w-2/5">
            <p>
              Our products are available through 42 distribution points across
              Indonesia, including major cities such as Jabodetabek, Cibarusah,
              Cikarang, Karawang, Cirebon, Yogyakarta, Solo, Sidoarjo, Surabaya,
              Malang, Bali, Lampung, Palembang, Medan, Batam, Lombok, Makassar,
              and Balikpapan.
            </p>
          </div>
          <div className="lg:w-3/5">
            <div className="aspect-[3/1] bg-app-black" />
          </div>
        </div>
        <div className="h-px w-full mt-20 bg-app-gray"></div>
        <div className="text-caption mt-5">OUR STRATEGIC PARTNERS</div>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[100px] mt-8">
          <div className="lg:w-2/3">
            <p className="max-w-[658px]">
              Supported by our strategic partners,{" "}
              <b>
                PT Catur Sentosa Adiprana Tbk, Mitra10 (MTO), and some local
                distributors
              </b>
              , this growing distribution network ensures that our high-quality
              roofing products are always within reach, making it easier for
              customers to access our products wherever they are.
            </p>
          </div>
          <div className="lg:w-1/3 flex items-center gap-10">
            <img
              src="/assets/csa-logo.webp"
              alt="CSA Logo"
              className="w-[154px] h-auto"
            />
            <img
              src="/assets/mitra-10-logo.webp"
              alt="Mitra10 Logo"
              className="w-[154px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
