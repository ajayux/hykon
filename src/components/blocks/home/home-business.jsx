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
    <section className="w-full h-auto block bg-[#008dd2] py-[30px] sm:py-[40px] xl:py-[110px] 2xl:py-[190px_140px] bg-[#181818] overflow-hidden relative z-0">
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

          <div className="w-full sm:w-[60%]">
            <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
              <div className="flex touch-pan-y touch-pinch-zoom -mx-2 lg:-mx-6 [&>*]:p-2 lg:[&>*]:p-6">
                {data?.items?.map((item) => (
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
        </div>
      </div>
    </section>
  );
}
