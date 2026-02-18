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
    <section className="w-full h-auto block bg-[#008dd2] py-[30px] sm:py-[40px] xl:py-[110px] 2xl:py-[190px_140px] overflow-hidden relative z-0">
      <div className="container">
        <div className="flex flex-wrap sm:items-center -mx-3 sm:-mx-1 3xl:-mx-3 [&>*]:p-3 sm:[&>*]:p-1 3xl:[&>*]:p-3">
          <div className="w-full xl:w-[35%]">
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
              className="text-medium text-white mb-2 xl:mb-8 3xl:mb-14"
            >
              {data?.title}
            </Heading>
            <Button
              size="lg"
              variant="none"
              className="text-white min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px]"
              asChild
            >
              <Link href={data?.button?.link}>
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
                {data?.button?.label}

              </Link>
            </Button>
          </div>

          <div className="w-full xl:w-[65%]">
            <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
              <div className="flex touch-pan-y touch-pinch-zoom -mx-2 lg:-mx-3 *:p-2 lg:*:p-3">
                {data?.items?.map((item) => (
                  <div
                    key={item?.id}
                    className={cn(
                      "flex-[0_0_220px] sm:flex-[0_0_33.333%] lg:flex-[0_0_30%] min-w-0 select-none",
                    )}
                  >
                    <div className="group relative w-full aspect-3/4 sm:aspect-3/4 xl:aspect-3/4 overflow-hidden rounded-2xl transition-all duration-300">

                      {/* Default View (Number & Title) */}
                      <div className="absolute inset-0 flex flex-col justify-between p-6 z-0 transition-opacity duration-300 group-hover:opacity-0">
                        <div className="text-[80px] sm:text-[100px] xl:text-[120px] font-bold leading-none text-white opacity-20 select-none">
                          {item?.id}
                        </div>
                        <Heading
                          as="h3"
                          size="h5"
                          className="text-white mt-auto font-medium leading-tight"
                        >
                          {item?.title}
                        </Heading>
                      </div>

                      {/* Hover View (Card with Image) */}
                      <div className="absolute inset-0 bg-white flex flex-col p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 translate-y-4 group-hover:translate-y-0 rounded-2xl shadow-lg">
                        <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden mb-4">
                          <Image
                            src={item?.media?.path}
                            alt={item?.media?.alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex flex-col flex-1 justify-between">
                          <Heading
                            as="h3"
                            size="h6"
                            className="text-black font-medium leading-tight mb-4"
                          >
                            {item?.title}
                          </Heading>
                          <Button
                            variant="none"
                            className="w-fit p-0 h-auto text-[#008dd2] hover:text-[#007bb5] transition-colors flex items-center gap-2 group/btn"
                            asChild
                          >
                            <Link href={item?.button?.link || item?.slug || "#"}>
                              <div className="w-8 h-8 bg-[#008dd2] rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                                <Image
                                  src="/images/icon-arrow-right-white.svg"
                                  alt="arrow"
                                  width={14}
                                  height={10}
                                  className="invert-0" // White arrow
                                />
                              </div>
                              <span className="font-medium text-sm">{item?.button?.label || "View Details"}</span>
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
        </div>
      </div>
    </section>
  );
}
