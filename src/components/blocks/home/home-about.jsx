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
    <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[110px] 2xl:py-[190px_140px] bg-[#181818] overflow-hidden relative z-0">
      <div className="container">
        <div className="flex flex-wrap sm:items-center -mx-3 sm:-mx-1 3xl:-mx-3 [&>*]:p-3 sm:[&>*]:p-1 3xl:[&>*]:p-3">
          <div className="w-full sm:w-[40%]">
            <Heading
              as="div"
              size="h6"
              className="tracking-widest uppercase text-[#008dd2] mb-1 xl:mb-2.5 2xl:mb-4"
            >
              {data?.subTitle}
            </Heading>
            <Heading
              as="h2"
              size="h1"
              className="text-medium text-white mb-2 xl:mb-4 3xl:mb-14"
            >
              {data?.title}
            </Heading>
            {data?.achievement && (
              <div className="w-full max-w-9/12">
                <Heading
                  as="h6"
                  size="h5"
                  className="font-normal tracking-widest uppercase text-[#caad63] mb-3 sm:mb-1 xl:mb-2"
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
                          "flex-[0_0_220px] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 select-none",
                        )}
                      >
                        <div className="w-20 aspect-square transition-all duration-300 hover:scale-105">
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

          <div className="w-full sm:w-[60%]">
            <div className="flex flex-wrap items-center 3xl:gap-x-20">
              {data?.chairman && (
                <div className="w-full sm:w-[455px] relative z-0">
                  <div className="w-full aspect-[45/60] overflow-hidden">
                    <Image
                      src={data?.chairman?.media?.path}
                      alt={data?.chairman?.media?.alt}
                      width={454}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Image
                    src={"/images/home-about-bg.png"}
                    alt={"home-about-bg"}
                    width={576}
                    height={576}
                    className="min-w-[657px] aspect-square absolute -z-1 bottom-[25%] right-[33%]"
                  />
                  <div className="absolute z-1 bottom-0 inset-x-0 flex items-center translate-y-8/10">
                    <div className="flex-1 h-[1px] bg-[#008dd2]" />
                    <div className="w-full max-w-9/12 h-auto bg-[#181818] rounded-tl-[30px] rounded-bl-[30px] pl-10 py-5">
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

              <div className="flex-1">
                <Text as="div" size="p1" className="text-white mb-15 mt-15">
                  {parse(data?.description)}
                </Text>
                <div className="flex flex-wrap -mx-3 mb-16 3xl:mb-20">
                  {data?.statistics?.map((item) => (
                    <div key={item?.id} className="w-full sm:w-1/2 py-2 px-3">
                      <div className="w-full bg-[#252525] rounded-[10px] py-4.5 px-6">
                        <Heading
                          as="div"
                          size="h3"
                          className={cn(
                            "font-bold text-[#008dd2] mb-1  2xl:mb-2",
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
                          className="text-[12px] lg:text-[13px] 2xl:text-[15px] 3xl:text-[20px] leading-none font-light text-white"
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
                  className="text-white min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px]"
                  asChild
                >
                  <Link href={data?.button?.link}>
                    {data?.button?.label}

                    <div className="w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
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
        </div>
      </div>
    </section>
  );
}
