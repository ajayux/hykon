"use client";
import { Heading } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import parse from "html-react-parser";
import ProductCard from "@/components/common/product-card";

export default function ProductSimilar({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full h-auto block bg-[#181818] py-10 xl:py-[75px_40px] 2xl:py-[90px_50px] 3xl:py-[110px_60px]">
      <div className="container">
        <div className="flex flex-wrap justify-between gap-4 mb-4 xl:mb-6 2xl:mb-8 3xl:mb-9">
          <Heading
            as="h2"
            size="h2"
            className="lg:text-[30px] 2xl:text-[36px] 3xl:text-[44px] leading-tight text-white"
          >
            {parse(data?.title)}
          </Heading>
          <div>
            <div className="flex flex-wrap gap-2 xl:gap-2.5 2xl:gap-3 3xl:gap-4">
              <button
                className="w-6 xl:w-6.5 2xl:w-8 3xl:w-10 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center"
                onClick={scrollPrev}
              >
                <Image
                  src={"/images/icon-arrow-right-white.svg"}
                  alt={"icon-arrow-right-white"}
                  width={18}
                  height={13}
                  className="w-1/2 rotate-180"
                  unoptimized
                />
              </button>
              <button
                className="w-6 xl:w-6.5 2xl:w-8 3xl:w-10 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center"
                onClick={scrollNext}
              >
                <Image
                  src={"/images/icon-arrow-right-white.svg"}
                  alt={"icon-arrow-right-white"}
                  width={18}
                  height={13}
                  className="w-1/2"
                  unoptimized
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "container",
          "max-sm:pr-0 max-sm:[mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
        )}
      >
        <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
          <div className="flex touch-pan-y touch-pinch-zoom -mx-1 xl:-mx-1.2 2xl:-mx-1.5 3xl:-mx-2 [&>div]:p-1 xl:[&>div]:p-1.2 2xl:[&>div]:p-1.5 3xl:[&>div]:p-2">
            {data?.productItems?.map((item, i) => (
              <div
                key={item?.id}
                className={cn(
                  "flex-[0_0_200px] sm:flex-[0_0_25%] lg:flex-[0_0_16.666%] min-w-0 select-none",
                )}
              >
                <ProductCard item={item} variant="variant-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
