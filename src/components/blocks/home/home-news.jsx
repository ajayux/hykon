"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
export default function HomeNews({ data }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    // [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );
  return (
    <section className="w-full h-auto block bg-[#212121] 3xl:py-20 relative z-0">
      <div className="text-[120px] sm:text-[140px] xl:text-[166px] 2xl:text-[200px] 3xl:text-[250px] font-bold leading-none uppercase text-center text-gray-900 select-none opacity-40 absolute -z-1 top-0 inset-x-0 ">
        {parse(data?.title)}
      </div>
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-6 xl:mb-10 2xl:mb-11 3xl:mb-15">
          <div className="w-full xl:flex-1 flex justify-between items-end">
            <div>
              <Heading
                as="h2"
                size="h1"
                className="text-medium text-white mb-1 xl:mb-1.5 3xl:mb-2"
              >
                {parse(data?.title)}
              </Heading>
              <Text
                as="p"
                size="p1"
                className="text-medium text-white mb-1 xl:mb-2 3xl:mb-3"
              >
                {parse(data?.description)}
              </Text>
            </div>
            <div className="flex flex-wrap gap-3 xl:gap-x-8 2xl:gap-x-10 3xl:gap-x-12.5">
              {data?.filterItems?.map((item, i) => (
                <div key={"filter-" + i}>
                  <Button
                    size="lg"
                    variant="none"
                    className="underline underline-offset-15 text-white p-0"
                  >
                    {item}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full xl:w-[124px] 2xl:w-[150px] 3xl:w-[187px]">
            <Button
              size="lg"
              variant="outline"
              className="text-white min-w-[160px] xl:min-w-full justify-between pl-4 xl:pl-7"
              asChild
            >
              <Link href={data?.button?.link}>
                {data?.button?.label}
                <div className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
                  <Image
                    src={"/images/icon-arrow-right-white.svg"}
                    alt={"icon-arrow-right-white"}
                    width={18}
                    height={13}
                    className="w-4.5"
                    unoptimized
                  />
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "w-full sm:max-w-[calc(var(--breakpoint-sm)/2+50%)] md:max-w-[calc(var(--breakpoint-md)/2+50%)] lg:max-w-[calc(var(--breakpoint-lg)/2+50%)] xl:max-w-[calc(var(--breakpoint-xl)/2+50%)] 2xl:max-w-[calc(var(--breakpoint-2xl)/2+50%)] 3xl:max-w-[calc(var(--breakpoint-3xl)/2+50%)]",
          "pl-4 ml-auto [mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
        )}
      >
        <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
          <div className="flex touch-pan-y touch-pinch-zoom -mx-1 xl:-mx-2.5 ">
            {data?.items?.map((item) => (
              <div
                key={item?.id}
                className={cn(
                  "flex-[0_0_220px] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] 3xl:flex-[0_0_650px] min-w-0 select-none px-1 xl:px-2.5",
                )}
              >
                <div className="w-full h-full flex flex-col relative z-0">
                  <div className="w-full mb-4 xl:mb-6 3xl:mb-8 relative z-0">
                    <div className="w-full aspect-63/33 overflow-hidden">
                      <Image
                        src={item?.media?.path}
                        alt={item?.media?.alt}
                        width={630}
                        height={330}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="absolute z-1 bottom-0 left-4 translate-y-1/4">
                      <div className="w-full min-w-[147px] bg-[#008dd2] rounded-[20px] 3xl:py-5 3xl:px-3.5">
                        <div className="text-[28px] xl:text-[35px] 2xl:text-[42px] 3xl:text-[53px] leading-none font-normal text-center text-white mb-1 xl:mb-2">
                          {item?.publishDay}
                        </div>
                        <div className="text-[18px] xl:text-[22px] 2xl:text-[26px] 3xl:text-[22px] leading-none font-normal text-center text-white">
                          {item?.publishMonthYear}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between w-full p-2 xl:p-3.5 2xl:p-4.5 3xl:p-5.5">
                    <div>
                      <Heading
                        as="h3"
                        size="h4"
                        className="font-medium line-clamp-2 text-white mb-5 xl:mb-5 3xl:mb-6"
                      >
                        {item?.title}
                      </Heading>
                      <Text
                        as="div"
                        size="p2"
                        className="line-clamp-3 font-normal text-white mb-1 xl:mb-2 3xl:mb-3"
                      >
                        {parse(item?.description)}
                      </Text>
                    </div>
                    <div>
                      <Button
                        size="lg"
                        variant="none"
                        className="text-white px-0"
                        asChild
                      >
                        <Link href={item?.slug}>
                          Read More
                          <Image
                            src={"/images/icon-news-right.svg"}
                            alt={"icon-news-right"}
                            width={6}
                            height={10}
                            className="w-1 3xl:w-1.5 block mt-0.5"
                            unoptimized
                          />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
