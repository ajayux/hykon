"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
export default function HomeBusiness({ data }) {
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
    // py-[30px] sm:py-[40px] xl:py-[110px] 2xl:py-[46px_75px] 3xl:py-[46px_75px] overflow-hidden relative z-0
    <section className="w-full h-auto block bg-[#008dd2]">
      <div className="container">
        <div className="flex flex-wrap sm:items-center -mx-3 sm:-mx-1 3xl:-mx-3 [&>*]:px-3 sm:[&>*]:px-1 3xl:[&>*]:px-3">
          <div className="w-full xl:w-[22%]">
            <Heading
              as="div"
              size="h6"
              className="tracking-1 uppercase text-white mb-1 xl:mb-2.5 2xl:mb-4"
            >
              {data?.subTitle}
            </Heading>
            <Heading
              as="h2"
              size="h3"
              className="text-medium text-white mb-2 xl:mb-8 3xl:mb-12"
            >
              {parse(data?.title)}
            </Heading>
            <Button
              size="lg"
              variant="none"
              className="text-white min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] px-0"
              asChild
            >
              <Link href={data?.button?.link}>
                <div className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-white rounded-full flex items-center justify-center">
                  <Image
                    src={"/images/icon-arrow-right-blue.svg"}
                    alt={"icon-arrow-right-blue"}
                    width={18}
                    height={13}
                    className="w-1/2"
                    unoptimized
                  />
                </div>
                {data?.button?.label}
              </Link>
            </Button>
          </div>

          <div className="w-full xl:w-[78%]">
            <div ref={emblaRef} className="w-full max-w-full">
              <div className="flex touch-pan-y touch-pinch-zoom ">
                {data?.items?.map((item) => (
                  <div
                    key={item?.id}
                    className={cn(
                      "flex-[0_0_220px] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 select-none",
                    )}
                  >
                    <div className="group w-full block relative z-0">
                      <div className="w-full absolute z-0 inset-0 flex flex-col justify-center">
                        <div className="text-[80px] sm:text-[100px] xl:text-[120px] 2xl:text-[120px] font-medium leading-none text-transparent bg-linear-to-b from-white to-transparent bg-clip-text select-none opacity-40 mb-2 xl:mb-4 3xl:mb-6">
                          {item?.id}
                        </div>
                        <Heading
                          as="h3"
                          size="none"
                          className="text-[12px] sm:text-[14px] xl:text-[15px] 2xl:text-[18px] 3xl:text-[22px] leading-normal font-normal line-clamp-2 text-white xl:max-w-7/10"
                        >
                          {item?.title}
                        </Heading>
                      </div>

                      <div className="w-full 3xl:min-h-[410px] bg-white px-3 xl:px-4 3xl:px-5 py-4 xl:py-6 3xl:py-8 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 translate-y-4 group-hover:translate-y-0 group-hover:scale-105 rounded-2xl shadow-lg">
                        <div className="relative w-full aspect-34/18 overflow-hidden rounded-[6px] 2xl:rounded-[8px] 3xl:rounded-[10px] mb-2 xl:mb-4.5 3xl:mb-6.5">
                          <Image
                            src={item?.media?.path}
                            alt={item?.media?.alt}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-110"
                          />
                        </div>
                        <Heading
                          as="h3"
                          size="none"
                          className="text-[12px] sm:text-[14px] xl:text-[15px] 2xl:text-[18px] 3xl:text-[22px] leading-normal font-normal line-clamp-2 text-black 3xl:mb-5"
                        >
                          {item?.title}
                        </Heading>
                        <Button
                          size="lg"
                          variant="none"
                          className="text-black min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] px-0"
                          asChild
                        >
                          <Link href={data?.button?.link}>
                            <div className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
                              <Image
                                src={"/images/icon-arrow-right-white.svg"}
                                alt={"icon-arrow-right-white"}
                                width={18}
                                height={13}
                                className="w-1/2"
                                unoptimized
                              />
                            </div>
                            {data?.button?.label}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
