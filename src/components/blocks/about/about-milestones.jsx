"use client";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import Image from "next/image";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function AboutMilestones({ data }) {
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
    <section className="w-full h-auto block bg-[#444142]">
      <div className="container xl:max-w-[1250px] 2xl:max-w-[1500px] 3xl:max-w-[1870px]">
        <div className="w-full bg-[linear-gradient(to_bottom,#008dd2b3_0%,#181818b3_20%,#181818b3_70%,#008dd2b3_100%)] rounded-[13px] 2xl:rounded-[16px] 3xl:rounded-[20px] px-4 sm:px-6 xl:px-10 2xl:px-12.5 3xl:px-[60px] py-5 sm:py-10 xl:py-13 2xl:py-20 3xl:py-[100px] relative z-0 overflow-hidden">
          <div className="text-[40px] sm:text-[140px] xl:text-[166px] 2xl:text-[200px] 3xl:text-[250px] font-bold leading-none text-center text-transparent select-none opacity-40 absolute -z-1 top-0 inset-x-0 [-webkit-text-stroke:1px_#595959]">
            {parse(data?.title)}
          </div>
          <Heading
            as="h2"
            size="h1"
            className="font-medium text-center text-white mb-2 sm:mb-8 xl:mb-20 2xl:mb-23 3xl:mb-25"
          >
            {parse(data?.title)}
          </Heading>

          <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
            <div className="flex touch-pan-y touch-pinch-zoom">
              {data.items?.map((item, i) => (
                <div
                  key={item?.id}
                  className={cn(
                    "flex-[0_0_220px] sm:flex-[0_0_33.333%] lg:flex-[0_0_200px] xl:flex-[0_0_227px] 2xl:flex-[0_0_273px] 3xl:flex-[0_0_342px] min-w-0 select-none",
                  )}
                >
                  <div
                    className={cn(
                      "group w-full h-[140px] sm:h-[240px] lg:h-[240px] xl:h-[276px] 2xl:h-[300px] 3xl:h-[340px] relative z-0 flex justify-center px-1 xl:px-2 ",
                      i % 2 === 0
                        ? "items-end sm:items-end"
                        : "items-end sm:items-start",
                    )}
                  >
                    {i === 0 && (
                      <div className="w-2 h-2 rounded-full bg-white absolute -z-1 inset-y-0 left-0 m-auto pointer-events-none" />
                    )}
                    {i === data?.items?.length - 1 && (
                      <div className="w-2 h-2 rounded-full bg-white absolute -z-1 inset-y-0 right-0 m-auto pointer-events-none" />
                    )}
                    <div className="absolute z-1 inset-y-0 left-0 m-auto w-full h-[1px] bg-white" />

                    <div className="absolute z-2 inset-0 m-auto w-2 2xl:w-3 3xl:w-4 aspect-square rounded-full bg-[#008dd2] border-3 border-white stroke-1 outline-2 outline-[#008dd2] group-hover:animate-pulse transition-transform duration-300" />

                    <div
                      className={cn(
                        "w-0.5 sm:w-[3px] lg:w-[5px] h-auto absolute z-1 inset-x-0 m-auto",
                        // group-hover:animate-bounce",
                        i % 2 === 0
                          ? "top-[57%] rotate-180"
                          : "top-[57%] sm:top-auto rotate-0 sm:bottom-[57%] sm:rotate-0",
                      )}
                    >
                      <Image
                        src="/images/milstone-line.svg"
                        alt="milstone-line"
                        width={8}
                        height={110}
                        unoptimized
                      />
                    </div>

                    <div
                      className={cn(
                        "flex flex-col h-9/10 sm:h-7/10 sm:h-8/10 justify-between",
                        i % 2 === 0 ? "sm:flex-col" : "sm:flex-col-reverse",
                      )}
                    >
                      <Heading
                        as="div"
                        size="h3"
                        className="truncate text-center lg:text-[30px] 2xl:text-[36px] 3xl:text-[45px] text-white"
                      >
                        {item.year}
                      </Heading>
                      <Text
                        as="div"
                        size="p0"
                        className="line-clamp-2 text-center font-normal text-white mx-auto max-sm:text-[12px]"
                      >
                        {item.title}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
