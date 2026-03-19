"use client";
import Image from "next/image";
import React, { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import Fancybox from "@/components/common/fancybox";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "../../utils/embla-carousel-dot-button";

export default function BusinessVideos({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const options = useMemo(
    () => ({
      Carousel: {
        infinite: false,
      },
    }),
    [],
  );

  return (
    <section className="w-full h-auto py-[30px] bg-black block">
      <div className="container">
        <div className="text-[28px] leading-normal font-medium text-white mb-[20px]">
          {data?.title}
        </div>
        <Fancybox options={options}>
          <div ref={emblaRef} className="w-full max-w-full relative z-0">
            <div className="flex touch-pan-y touch-pinch-zoom mx-[-10px] [&>*]:px-[10px]">
              {data?.Videos?.map((item, index) => (
                <div
                  key={item?.id || index}
                  className="flex-[0_0_100%] min-w-0 select-none"
                >
                  <a
                    data-fancybox="gallery"
                    href={item?.path}
                    className="w-full aspect-[345/200] rounded-[8px] overflow-hidden block relative z-0"
                  >
                    <video
                      src={item?.path}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 pointer-events-none"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all duration-300 pointer-events-none">
                      <div className="w-[50px] h-auto aspect-[50/30] overflow-hidden block">
                        <Image
                          src={"/images/youtuble-play-icon.svg"}
                          alt={"Play Icon"}
                          width={45}
                          height={30}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Fancybox>
        <div className="w-auto h-auto gap-[15px] flex justify-center">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-[6px] h-auto aspect-square rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-[#008DD2]" : "bg-[#D9D9D9]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
