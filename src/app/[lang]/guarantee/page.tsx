import Guarantee__ClaimForm from "./claim-form";

export default function Guarantee() {
  return (
    <>
      <section className="sticky top-header h-[calc(566px-80px)] bg-dash">
        <div className="outer-wrapper h-full  relative">
          <div
            className="absolute bottom-0 right-0 h-full w-1/2 pointer-events-none  flex items-end"
            style={{
              backgroundImage: `url(/assets/roof-guarantee.webp)`,
              backgroundPosition: "left center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="relative  h-full flex justify-center flex-col inner-wrapper">
            <div className="w-full lg:w-1/2 max-w-[542px]">
              <h2 className="text-caption">GUARANTEE CLAIM</h2>
              <div className="text-heading1 span-inner-red mt-6">
                Use the guide below to understand the steps involved in making a
                roofing product <span>guarantee claim</span>.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="outer-wrapper !py-32 bg-app-white">
        <div className="inner-wrapper">
          <h2 className="text-heading1 span-inner-red">
            How To Claim <span>Guarantee</span>
          </h2>
        </div>
      </section>
      <section className="outer-wrapper bg-black text-app-white !py-32">
        <div className="inner-wrapper">
          <div className="flex flex-col lg:flex-row gap-10 items-start pb-20 border-b border-app-gray">
            <div className="w-full lg:w-1/2">
              <h2 className="text-heading1 span-inner-red">
                Warranty Authorization
                <br />
                <span>Claim Form</span>
              </h2>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="max-w-[460px]">
                Every panel comes with a 10-year corrosion warranty and a 5-year
                warranty on sand adhesive and colors, giving you confidence in
                long-lasting performance. To make it clear and easy, each
                product carries a sticker that details these warranty terms for
                quick reference.
              </div>
            </div>
          </div>
          <Guarantee__ClaimForm />
        </div>
      </section>
    </>
  );
}
