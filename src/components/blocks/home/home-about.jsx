"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import CountUp from "react-countup";
import { cn } from "@/lib/utils";

export default function HomeAbout({ data }) {
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
    <section className="w-full h-auto block py-[30px] sm:py-[40px] lg:py-[120px_80px] 2xl:py-[150px_110px] 3xl:py-[190px_140px] bg-[#181818] overflow-hidden relative z-0">
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1408px] 3xl:max-w-[1700px]">
        <div className="flex flex-wrap sm:items-center -mx-3 lg:-mx-1 3xl:-mx-3 [&>*]:p-3 lg:[&>*]:p-1 3xl:[&>*]:p-3">
          <div className="w-full lg:w-[36%] xl:w-[37%] 2xl:w-[38%] 3xl:w-[37%]">
            <Heading
              as="div"
              size="h6"
              className="tracking-[0.4rem] font-normal uppercase text-[#008dd2] mb-3 xl:mb-4 2xl:mb-6 3xl:mb-7"
            >
              {data?.subTitle}
            </Heading>
            <Heading
              as="h2"
              size="h1"
              className="text-medium text-white mb-6 xl:mb-12 2xl:mb-13 3xl:mb-14 lg:max-w-11/12"
            >
              {data?.title}
            </Heading>
            {data?.achievement && (
              <div className="w-full lg:max-w-8/12 2xl:max-w-9/12">
                <Heading
                  as="h6"
                  size="h5"
                  className="font-normal tracking-[0.18rem] uppercase text-[#caad63] mb-0.5 xl:mb-1 3xl:mb-2"
                >
                  {data?.achievement?.title}
                </Heading>

                <div
                  ref={emblaRef}
                  className="w-full max-w-full overflow-hidden"
                >
                  <div className="flex touch-pan-y touch-pinch-zoom -mx-2 lg:-mx-6 [&>*]:p-2 lg:[&>*]:p-6">
                    {data?.achievement?.items?.map((item) => (
                      <div
                        key={item?.id}
                        className={cn(
                          "flex-[0_0_80px] sm:flex-[0_0_100px] lg:flex-[0_0_25%] min-w-0 select-none",
                        )}
                      >
                        <div className="w-10 xl:w-13 2xl:w-16 3xl:w-20 aspect-square transition-all duration-300 hover:scale-105">
                          <Image
                            src={item?.media?.path}
                            alt={item?.media?.alt}
                            width={80}
                            height={80}
                            className="w-full h-full block object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[64%] xl:w-[63%] 2xl:w-[62%] 3xl:w-[63%]">
            <div className="flex flex-wrap items-center gap-x-13 2xl:gap-x-16 3xl:gap-x-20">
              {data?.chairman && (
                <div className="w-full sm:w-[368px] lg:w-[268px] xl:w-[305px] 2xl:w-[362px] 3xl:w-[452px] relative z-0">
                  <div className="w-full aspect-[45/60] overflow-hidden shadow-2xl rounded-[15px] 2xl:rounded-[18px] 3xl:rounded-[23px]">
                    <Image
                      src={data?.chairman?.media?.path}
                      alt={data?.chairman?.media?.alt}
                      width={454}
                      height={600}
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <Image
                    src={"/images/home-about-bg.png"}
                    alt={"home-about-bg"}
                    width={576}
                    height={576}
                    className="min-w-[320px] xl:min-w-[440px] 2xl:min-w-[526px] 3xl:min-w-[657px] aspect-square absolute -z-1 bottom-[25%] right-[33%]"
                  />
                  <div className="absolute z-1 bottom-0 inset-x-0 flex items-center translate-y-2/10 lg:translate-y-8/10">
                    <div className="flex-1 h-[1px] xl:h-[0.5px] bg-[#008dd2]" />
                    <div className="w-full max-w-8/12 h-auto bg-[#181818] rounded-tl-[20px] lg:rounded-tl-[30px] rounded-bl-[20px] lg:rounded-bl-[30px] pl-4 lg:pl-6 2xl:pl-8 py-3 lg:py-5">
                      <Heading
                        as="div"
                        size="h4"
                        className="uppercase text-white mb-0.5 2xl:mb-1"
                      >
                        {data?.chairman?.title}
                      </Heading>
                      <Text as="div" size="p1" className="text-white">
                        {data?.chairman?.description}
                      </Text>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full lg:flex-1">
                <Text
                  as="div"
                  size="p1"
                  className="xl:leading-[1.7] text-white mb-4 xl:mb-8 2xl:mb-12 3xl:mb-14 mt-10 2xl:mt-13 3xl:mt-15"
                >
                  {parse(data?.description)}
                </Text>
                <div className="flex flex-wrap -mx-2 2xl:-mx-3 mb-4 lg:mb-8 2xl:mb-12 3xl:mb-20">
                  {data?.statistics?.map((item) => (
                    <div
                      key={item?.id}
                      className="w-1/2 sm:w-1/2 lg:w-[160px] 2xl:w-[195px] 3xl:w-[240px] py-1.5 3xl:py-2 px-2 3xl:px-3"
                    >
                      <div className="w-full bg-[#252525] rounded-[6px] lg:rounded-[7px] 3xl:rounded-[8px] py-3 2xl:py-4 px-4 hover:bg-[#2d2d2d] transition-all duration-300">
                        <Heading
                          as="div"
                          size="h3"
                          className={cn(
                            "font-bold text-[#008dd2] mb-0.5 3xl:mb-1",
                          )}
                        >
                          <CountUp
                            end={parseInt(item?.number)}
                            duration={2.75}
                            separator=""
                            suffix={item?.suffix || ""}
                            enableScrollSpy
                          />
                        </Heading>
                        <Text
                          as="div"
                          size="none"
                          className="text-[12px] lg:text-[12.5px] 2xl:text-[14.5px] 3xl:text-[17.5px] leading-none font-light text-white"
                        >
                          {item?.label}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-center text-white min-w-[100px] xl:min-w-[115px] 2xl:min-w-[137px] 3xl:min-w-[167px]"
                  asChild
                >
                  <Link
                    href={`/about-us`}
                    aria-label={data?.button?.label ?? "Learn more about Hykon"}
                  >
                    <span className="flex-1 text-center">
                      {data?.button?.label}
                    </span>
                    <div className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
                      <Image
                        src={"/images/icon-arrow-right-white.svg"}
                        alt={"icon-arrow-right-white"}
                        width={18}
                        height={13}
                        className="w-1/2"
                        unoptimized
                      />
                    </div>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
