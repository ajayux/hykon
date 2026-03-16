"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/typography";

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
    <section className="w-full h-auto block py-8 lg:py-3 bg-[#008dd2] lg:bg-linear-to-b from-[#181818] to-black overflow-hidden">
      <div
        className={cn(
          "w-full bg-[#008dd2]",
          "max-lg:[mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)] max-lg:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
        )}
      >
        <div className="container max-lg:pr-0">
          <div className="flex flex-wrap sm:items-center -mx-3 sm:-mx-2 3xl:-mx-3 [&>*]:px-3 sm:[&>*]:px-2 3xl:[&>*]:px-3">
            <div className="w-full lg:w-[24%] xl:w-[22%] relative z-1 max-lg:mb-4 max-lg:pr-4">
              <Heading
                as="div"
                size="h6"
                className="tracking-1 font-normal uppercase text-white mb-1 xl:mb-2.5 2xl:mb-4"
              >
                {data?.title}
              </Heading>
              <Heading
                as="h2"
                size="h3"
                className="text-medium text-white mb-2 xl:mb-8 3xl:mb-12"
              >
                {parse(data?.description)}
              </Heading>
              <Button
                size="lg"
                variant="none"
                className="text-white min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] px-0"
                asChild
              >
                <Link href={data?.button?.link}>
                  <div className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-white rounded-full flex items-center justify-center">
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

            <div className="w-full lg:w-[76%] xl:w-[78%]">
              <div
                ref={emblaRef}
                className="w-full max-w-full max-lg:overflow-hidden"
              >
                <div className="flex touch-pan-y touch-pinch-zoom -mx-1">
                  {data?.items?.map((item) => (
                    <div
                      key={item?.id}
                      className={cn(
                        "flex-[0_0_220px] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 select-none max-lg:px-1",
                      )}
                    >
                      <div className="group w-full h-full block relative z-0">
                        <div className="w-full absolute z-0 inset-0 flex flex-col justify-center max-lg:hidden">
                          <div className="text-[52px] sm:text-[68px] xl:text-[83px] 2xl:text-[100px] 3xl:text-[125px] font-medium leading-none text-transparent bg-linear-to-b from-white to-transparent bg-clip-text select-none opacity-40 mb-2 xl:mb-5 2xl:mb-6 3xl:mb-7.5">
                            {item?.id}
                          </div>
                          <Heading
                            as="h3"
                            size="none"
                            className="text-[12px] sm:text-[14px] xl:text-[15px] 2xl:text-[17px] 3xl:text-[22px] leading-tight font-normal line-clamp-2 text-white max-w-8/10 lg:max-w-6/10"
                          >
                            {item?.title}
                          </Heading>
                        </div>

                        <div className="w-full h-full 3xl:min-h-[410px] bg-white px-3 xl:px-4 3xl:px-5 py-4 xl:py-6 3xl:py-8 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 lg:-translate-x-1/6 lg:translate-y-4 lg:group-hover:translate-y-0 lg:group-hover:scale-105 rounded-2xl shadow-lg flex flex-col">
                          <div className="relative w-full aspect-34/18 overflow-hidden rounded-[6px] 2xl:rounded-[8px] 3xl:rounded-[10px] mb-2 xl:mb-4.5 3xl:mb-6.5">
                            <Image
                              src={item?.media?.path}
                              alt={item?.media?.alt}
                              fill
                              className="object-cover transition-transform duration-700 hover:scale-110"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <Heading
                              as="h3"
                              size="none"
                              className="text-[12px] sm:text-[14px] xl:text-[15px] 2xl:text-[17px] 3xl:text-[22px] leading-tight font-normal line-clamp-2 text-black mb-2 xl:mb-3 2xl:mb-4 3xl:mb-6"
                            >
                              {item?.title}
                            </Heading>
                            <div>
                              <Button
                                size="lg"
                                variant="none"
                                className="text-black min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] h-auto px-0"
                                asChild
                              >
                                <Link href={data?.button?.link}>
                                  <div className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
