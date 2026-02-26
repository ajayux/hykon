"use client";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const achievementData = [
  {
    id: 1,
    media: {
      type: "image",
      path: "/images/achievements-1.png",
      alt: "achievements-1",
    },
  },
  {
    id: 2,
    media: {
      type: "image",
      path: "/images/achievements-2.png",
      alt: "achievements-2",
    },
  },
  {
    id: 3,
    media: {
      type: "image",
      path: "/images/achievements-3.png",
      alt: "achievements-3",
    },
  },
  {
    id: 4,
    media: {
      type: "image",
      path: "/images/achievements-4.png",
      alt: "achievements-4",
    },
  },
];

export default function AboutAwards({ awardData, certificationData }) {
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
    <section className="w-full block py-10 xl:py-17.5 2xl:py-21.5 3xl:py-25 bg-[#212121]">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-x-10 lg:gap-x-[65px] 2xl:gap-x-[74px] 3xl:gap-x-[100px]">
          {awardData && (
            <div className="w-full lg:flex-1">
              <div className="w-full">
                <Heading
                  as="h2"
                  size="h1"
                  className="text-white mb-3 xl:mb-4 2xl:mb-5 3xl:mb-7"
                >
                  {awardData?.title}
                </Heading>
                <Text
                  as="div"
                  size="p1"
                  className="leading-normal text-white mb-5 xl:mb-7 2xl:mb-10 3xl:mb-12 xl:max-w-17/20"
                >
                  {parse(awardData?.description)}
                </Text>
                {awardData?.items && (
                  <div className="w-full lg:max-w-8/12 2xl:max-w-9/12">
                    <div
                      ref={emblaRef}
                      className="w-full max-w-full overflow-hidden"
                    >
                      <div className="flex touch-pan-y touch-pinch-zoom -mx-2 lg:-mx-6 [&>*]:p-2 lg:[&>*]:p-6">
                        {achievementData?.map((item) => (
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
            </div>
          )}

          {certificationData && (
            <div className="w-full lg:w-[476px] xl:w-[556px] 2xl:w-[667px] 3xl:w-[834px] py-8 px-10 lg:py-10 lg:px-12.5 2xl:py-12.5 2xl:px-15 3xl:py-15 3xl:px-19 bg-[#262626] rounded-[30px] lg:rounded-[46px] 2xl:rounded-[56px] 3xl:rounded-[70px]">
              <Heading
                as="h2"
                size="h1"
                className="text-white mb-2 xl:mb-3 2xl:mb-4 3xl:mb-6"
              >
                {certificationData?.title}
              </Heading>
              <div className="typography [--text-color:#fff] lg:[&_li]:text-[14px] 2xl:[&_li]:text-[16px] 3xl:[&_li]:text-[20px] [&_ul]:ml-5  [&_ul]:mt-6 2xl:[&_ul]:mt-8 3xl:[&_ul]:mt-10 [&_li]:pl-2 [&_li]:my-5 [&_li]:list-image-[url('/images/li-check.svg')] [&_li]:marker:size-2 [&_li]:marker:vertical-align-middle ">
                {parse(certificationData?.description)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
