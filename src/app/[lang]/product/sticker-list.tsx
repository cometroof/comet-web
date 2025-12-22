"use client";

const StickerList = ({
  stickers,
  thicknessCopies,
}: {
  stickers: { title: string; description: string }[];
  thicknessCopies: {
    label: string;
    sizeS: string;
    sizeM: string;
    sizeL: string;
    sizeXl: string;
    sizeXxl: string;
    sizeVl: string;
    sizeV: string;
  };
}) => {
  function toggling(index: number, event: boolean) {
    // GET ELEMENT
    const targets = document.querySelectorAll(`.sticker-marker-${index + 1}`);
    if (targets) {
      targets.forEach((target) => {
        if (event) target.classList.add("sticker-marker-active");
        else target.classList.remove("sticker-marker-active");
      });
    }
  }
  return (
    <>
      <ul className="mt-8 md:max-w-[50%] lg:max-w-[100%]">
        {stickers.map((s, n) => (
          <li
            key={s.title}
            className={`flex items-start gap-5 px-2 py-4 hover:bg-primary/10 rounded-md  sticker-item-${
              n + 1
            }`}
            onMouseEnter={(e) => {
              e.preventDefault();
              toggling(n, true);
            }}
            onMouseLeave={(e) => {
              e.preventDefault();
              toggling(n, false);
            }}
            onClick={(e) => {
              e.preventDefault();
              toggling(n, true);
            }}
          >
            <div className="size-8 rounded-full bg-primary flex items-center justify-center aspect-square text-background">
              {n + 1}
            </div>
            <div>
              <h3 className="text-subheading">{s.title}</h3>
              <p className="text-caption mt-1.5">{s.description}</p>

              {/**/}
              {n + 1 === stickers.length && (
                <>
                  <div className="mt-2 font-exo-2 text-caption font-semibold">
                    {thicknessCopies.label}
                  </div>
                  <div className="flex items-center gap-2 font-exo-2 text-caption flex-wrap">
                    <div
                      className="min-w-16"
                      dangerouslySetInnerHTML={{
                        __html: thicknessCopies.sizeS,
                      }}
                    />
                    <div
                      className="min-w-16"
                      dangerouslySetInnerHTML={{
                        __html: thicknessCopies.sizeM,
                      }}
                    />
                    <div
                      className="min-w-16"
                      dangerouslySetInnerHTML={{
                        __html: thicknessCopies.sizeL,
                      }}
                    />
                    <div
                      className="min-w-16"
                      dangerouslySetInnerHTML={{
                        __html: thicknessCopies.sizeVl,
                      }}
                    />
                    <div
                      className="min-w-16"
                      dangerouslySetInnerHTML={{
                        __html: thicknessCopies.sizeV,
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default StickerList;
