"use client";
import { Text } from "@/components/utils/typography";
import Image from "next/image";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

export default function HomeHero({ data }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );
  return (
    <section className="w-full h-auto bg-black overflow-hidden relative z-0">
      <div ref={emblaRef} className="w-full h-full max-w-full overflow-hidden">
        <div className="flex h-full touch-pan-y touch-pinch-zoom">
          {data?.sliders?.map((item) => (
            <div
              key={item?.id}
              className={cn(
                "flex-[0_0_100%] min-w-0 lg:h-screen min-h-[468px] sm:min-h-[576px] lg:min-h-[520px] 2xl:min-h-[620px] 3xl:min-h-[768px] select-none",
              )}
            >
              {item?.mediaType === "video" ? (
                <video
                  src={item?.media?.video}
                  autoPlay
                  muted
                  loop
                  poster={item?.media?.image ?? "/images/placeholder.jpg"}
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <picture className="w-full h-full block">
                  <source
                    srcSet={item?.media?.image}
                    media="(min-width: 640px)"
                  />
                  <Image
                    src={item?.media?.mobilePath || item?.media?.image}
                    alt={item?.media?.alt || "Hero background"}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                  />
                </picture>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute z-1 inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      <div className="absolute z-2 bottom-0 inset-x-0 container lg:px-0 flex justify-end pb-4 lg:pb-12.5 2xl:pb-15 3xl:pb-19">
        <div className="bg-white/12 backdrop-blur-[18px] border border-white/15 rounded-full py-2 xl:py-3 2xl:py-4.5 3xl:py-5 px-4 xl:px-4.5 2xl:px-5 3xl:px-7 flex flex-wrap items-center">
          <div className="pl-2 2xl:pl-2.5 3xl:pl-3 pr-5 2xl:pr-6 3xl:pr-7.5">
            <Text as="p" size="p2" className="text-white">
              {data?.contactInfo?.title}
              <br />
              <span className="text-[110%] sm:text-[125%] font-medium">
                {data?.contactInfo?.phone}
              </span>
            </Text>
          </div>
          <div className="w-7 h-7 2xl:w-7 2xl:h-7 3xl:w-11 3xl:h-11 bg-[#d9d9d9] rounded-full flex items-center justify-center">
            <a href={`tel:${data?.contactInfo?.phone}`} target="_blank">
              <Image
                src={"/images/icon-arrow-right.svg"}
                alt={"icon-arrow-right"}
                width={18}
                height={13}
                className="w-2/3 m-auto"
                unoptimized
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
