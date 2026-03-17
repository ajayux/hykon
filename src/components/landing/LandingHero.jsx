"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import Fade from "embla-carousel-fade";
import { Heading } from "../utils/typography";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "../utils/embla-carousel-dot-button";

export default function LandingHero({ data, isSidebarOpen }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [
      Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true }),
      Fade(),
    ],
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <section className="w-full h-auto block">
      <div ref={emblaRef} className="w-full h-full max-w-full overflow-hidden">
        <div className="flex h-full touch-pan-y touch-pinch-zoom">
          {data?.sliders?.map((item, index) => (
            <div
              key={item?.id}
              className={cn(
                "flex-[0_0_100%] min-w-0 lg:h-screen min-h-[576px] sm:min-h-[768px] lg:min-h-[520px] 2xl:min-h-[620px] 3xl:min-h-[768px] select-none relative z-0",
              )}
            >
              <div className="w-full h-full absolute -z-1 inset-0">
                {item?.media?.type === "video" ? (
                  <video
                    src={item?.media?.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <picture className="w-full h-full block">
                    <source
                      srcSet={item?.media?.path}
                      media="(min-width: 640px)"
                    />
                    <Image
                      src={item?.media?.mobilePath || item?.media?.path}
                      alt={item?.media?.alt || "Hero background"}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={item?.id === 1}
                    />
                  </picture>
                )}
              </div>
              <div
                className={cn(
                  "w-full h-full py-[70px] lg:py-[90px] 2xl:py-[100px] 3xl:py-[130px] flex items-end",
                  isSidebarOpen ? "isContainer" : "container",
                )}
              >
                <div className="max-w-[630px]">
                  <Heading
                    as="h2"
                    size="h1"
                    className="text-[20px] sm:text-[22px] lg:text-[26px] 2xl:text-[32px] 3xl:text-[40px] font-semibold text-white mb-1 xl:mb-1.5 3xl:mb-2"
                  >
                    {parse(item?.title)}
                  </Heading>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container relative z-0">
        <div
          className={cn(
            "absolute z-1 inset-[auto_auto_0_0] translate-y-[-40px] lg:translate-y-[-50px] 2xl:translate-y-[-60px] 3xl:translate-y-[-70px] gap-[10px] flex",
            isSidebarOpen ? "isContainer" : "container",
          )}
        >
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-[6px] 2xl:w-[8px] h-auto aspect-square rounded-full border-1 border-[#FFFFFF]/60 transition-all duration-300 ${index === selectedIndex && "bg-white outline outline-2 outline-offset-2 outline-[#008DD2]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
