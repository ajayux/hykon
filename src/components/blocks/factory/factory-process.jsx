"use client";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

export default function FactoryProcess({ data }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );
  return (
    <section className="w-full h-auto block py-10 xl:py-15 2xl:py-18 3xl:py-23 bg-[#008dd2] overflow-hidden">
      <div
        className={cn(
          "container",
          "max-sm:pr-0 max-sm:[mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
        )}
      >
        <Heading
          as="h2"
          size="h2"
          className="text-center text-white mb-6 xl:mb-10 2xl:mb-12 3xl:mb-15"
        >
          {data?.title}
        </Heading>

        <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
          <div className="flex touch-pan-y touch-pinch-zoom">
            {data?.items?.map((item, i) => (
              <div
                key={item?.id}
                className={cn(
                  "flex-[0_0_50%] sm:flex-[0_0_33.3333%] lg:flex-[0_0_25%] min-w-0 select-none",
                )}
              >
                <div
                  className={cn(
                    "group w-full h-auto relative z-0 flex-col justify-between px-1 xl:px-2 ",
                  )}
                >
                  <div
                    className={cn(
                      "absolute -z-1 top-[40px] sm:top-[40px] xl:top-[65px] 2xl:top-[75px] 3xl:top-[95px] inset-x-0 m-auto w-full h-[1px] bg-white/0 border-1 border-dashed border-white/50",
                      i === 0 && "max-w-1/2 ml-auto mr-0",
                      i === data?.items?.length - 1 && "max-w-1/2 mr-auto ml-0",
                    )}
                  />

                  <div className="w-[80px] sm:w-[100px] xl:w-[130px] 2xl:w-[155px] 3xl:w-[190px] aspect-square rounded-full bg-[#1496d6] border-1 border-[#82c7e9] flex items-center justify-center mb-4 xl:mb-6 2xl:mb-7.5 3xl:mb-9 mx-auto relative z-0 group-hover:bg-white transition-all duration-500">
                    <Image
                      src={item?.media?.pathWhite}
                      alt={item?.media?.alt}
                      width={70}
                      height={70}
                      className="w-[48px] 2xl:w-[58px] 3xl:w-[70px] aspect-square object-contain visible group-hover:hidden"
                    />
                    <Image
                      src={item?.media?.path}
                      alt={item?.media?.alt}
                      width={70}
                      height={70}
                      className="w-[48px] 2xl:w-[58px] 3xl:w-[70px] aspect-square object-contain hidden group-hover:block"
                    />
                    <div className="text-[8px] lg:text-[10px] 2xl:text-[11.7px] 3xl:text-[14.3px] leading-none font-medium truncate text-center text-[#1d1d1d] bg-white rounded-full py-[4px_4px] 2xl:py-[5px_3px] 3xl:py-[6px_4px] px-2.5 2xl:px-3 3xl:px-4 absolute z-1 bottom-0 inset-x-auto translate-y-1/2 border-1 border-white group-hover:border-[#008dd2] transition-all duration-500">
                      {item?.step}
                    </div>
                    <div className="absolute z-1 inset-0 border-1 border-[#008dd2] rounded-full scale-0 group-hover:scale-80 transition-transform duration-500" />
                  </div>
                  <Text
                    as="div"
                    size="none"
                    className="text-[12px] lg:text-[15px] 2xl:text-[18px] 3xl:text-[22px] leading-tight font-medium line-clamp-2 text-center text-white xl:max-w-3/4 mx-auto"
                  >
                    {item.title}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="w-full relative">
          <div className="hidden lg:block absolute top-[60px] 3xl:top-[75px] left-0 w-full h-px border-t border-dashed border-white/30 -z-1" />

          <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between gap-10 lg:gap-5">
            {data?.items?.map((item, index) => (
              <div
                key={item?.id}
                className="w-full sm:w-[250px] lg:w-1/4 flex flex-col items-center text-center relative"
              >
                <div className="relative group">
                  <div className="w-24 xl:w-28 2xl:w-32 3xl:w-38 aspect-square bg-white rounded-full flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                    <div className="w-10 xl:w-12 2xl:w-14 3xl:w-16 h-10 xl:h-12 2xl:h-14 3xl:h-16 relative">
                      <Image
                        src={item?.media?.path || "/images/icon-process-1.svg"}
                        alt={item?.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#002f56] text-white text-[10px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] px-3 py-1 rounded-full z-20 font-medium">
                    Step {index + 1}
                  </div>
                </div>

                <Heading
                  as="h4"
                  size="h4"
                  className="text-white mt-8 xl:mt-10 2xl:mt-12 3xl:mt-15 font-medium leading-tight"
                >
                  {item?.title}
                </Heading>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
