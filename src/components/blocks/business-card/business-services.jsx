"use client";
import Image from "next/image";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function BusinessServices({ data }) {
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
    <section className="w-full h-auto py-[45px] bg-[#272727] block">
      <div className="container">
        <div className="text-[28px] leading-normal font-medium text-white mb-[25px]">
          {data?.title}
        </div>
        <div ref={emblaRef} className="w-full max-w-full relative z-0">
          <div className="flex touch-pan-y touch-pinch-zoom mx-[-10px] [&>*]:px-[10px]">
            {data?.gallery?.map((item) => (
              <div
                key={item?.id}
                className="flex-[0_0_100%] min-w-0 select-none"
              >
                <div className="w-full h-auto aspect-[350/470] rounded-[8px] overflow-hidden block">
                  <Image
                    src={item?.path}
                    alt={item?.alt}
                    width={350}
                    height={470}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="w-[35px] aspect-square bg-[#323232] rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-[-15px]"
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
            className="w-[35px] aspect-square bg-[#323232] rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-[-15px]"
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
    </section>
  );
}
