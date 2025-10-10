import FooterNew from "@/components/app/footer";

export default function ArticlePage() {
  return (
    <>
      <div>
        <section className="bg-app-black text-app-white h-[360px]  outer-wrapper ">
          <div className="inner-wrapper">
            <h2 className="text-caption">ARTICLES</h2>
            <div className="text-heading1 span-inner-red max-w-[600px] mt-6">
              Expert <span>roofing articles</span> to guide your home
              improvement decisions
            </div>
          </div>
        </section>
      </div>
      <FooterNew />
    </>
  );
}
