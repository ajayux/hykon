"use client";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import parse from "html-react-parser";
import ProductCard from "@/components/common/product-card";

export default function CategoriesFeaturedProducts({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);


  return (
    <section className="w-full h-auto block bg-[#212121] py-10 xl:py-16 2xl:py-18 3xl:py-22.5">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="font-medium text-center text-white mb-2 xl:mb-3 2xl:mb-3.5 3xl:mb-5"
        >
          {parse(data?.title)}
        </Heading>
        <Text
          as="div"
          size="p1"
          className="text-center text-white mb-6 xl:mb-7 2xl:mb-8 3xl:mb-10"
        >
          {parse(data?.description)}
        </Text>
      </div>
      <div
        className={cn(
          "container",
          "max-sm:pr-0 max-sm:[mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
        )}
      >

        <div ref={emblaRef} className="w-full max-w-full overflow-hidden relative z-0 px-4 xl:px-6 2xl:px-8 3xl:px-10">
          <div className="flex touch-pan-y touch-pinch-zoom">
            {data.items?.map((item, i) => (
              <div
                key={item?.id}
                className={cn(
                  "flex-[0_0_220px] sm:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 select-none",
                )}
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>

          <button className="w-6 xl:w-8 2xl:w-10 3xl:w-12 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-0" onClick={scrollPrev}>
            <Image
              src={"/images/icon-arrow-right-white.svg"}
              alt={"icon-arrow-right-white"}
              width={18}
              height={13}
              className="w-1/2 rotate-180"
              unoptimized
            />
          </button>
          <button className="w-6 xl:w-8 2xl:w-10 3xl:w-12 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2 sm:right-0" onClick={scrollNext}>
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
    </section >
  );
}