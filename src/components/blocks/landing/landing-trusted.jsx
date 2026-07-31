"use client";

import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Heading, Text } from "../../utils/typography";
import Image from "next/image";

export default function LandingTrusted({ data, isSidebarOpen }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 2000000000,
        stopOnInteraction: true,
        pauseOnHover: true,
      }),
    ],
  );
  return (
    <section className="w-full h-auto py-[20px_40px] sm:py-[30px_50px] 2xl:py-[35px_60px] 3xl:py-[45px_75px] block">
      <div
        className={cn("w-full", isSidebarOpen ? "isContainer" : "container")}
      >
        <div className="text-center w-auto h-auto mb-[30px] lg:mb-[35px] 2xl:mb-[40px] 3xl:mb-[50px]">
          <Heading
            as="h2"
            size="h2"
            className="text-white mb-[10px] 2xl:mb-[15px]"
          >
            {parse(data?.title)}
          </Heading>
          <Text as="div" size="p0" className="text-white">
            {parse(data?.description)}
          </Text>
        </div>
        <div
          ref={emblaRef}
          className="w-full h-full max-w-full overflow-hidden"
        >
          <div className="flex h-full -mx-[7px] sm:-mx-[12px] lg:-mx-[15px] 2xl:-mx-[17px] 3xl:-mx-[22px] touch-pan-y touch-pinch-zoom">
            {data?.trustedList?.map((item) => (
              <div
                key={item?.id}
                className={cn(
                  "flex-[0_0_80%] sm:flex-[0_0_50%] xl:flex-[0_0_33.5%] px-[7px] sm:px-[12px] lg:px-[15px] 2xl:px-[17px] 3xl:px-[22px] min-w-0 select-none",
                )}
              >
                <div className="w-full h-full min-h-[320px] 2xl:min-h-[380px] 3xl:min-h-[480px] p-[20px] sm:p-[25px] 2xl:p-[40px_35px] bg-[#212121] rounded-[5px] 2xl:rounded-[10px] overflow-hidden gap-[20px] lg:gap-[30px] 2xl:gap-[40px] flex flex-col justify-between transition-all duration-300 hover:bg-[#008DD2]/[.25]">
                  <div className="w-full h-auto">
                    <div className="w-[35px] 2xl:w-[40px] 3xl:w-[45px] h-auto aspect-square mb-[10px] 3xl:mb-[15px] overflow-hidden block">
                      <Image
                        src={"/images/trusted-icon.svg"}
                        alt={"trusted-icon"}
                        width={45}
                        height={45}
                        className="w-full h-full -ml-[5px] object-contain object-left"
                      />
                    </div>
                    <Text as="div" size="p1" className="text-white">
                      {parse(item?.description)}
                    </Text>
                  </div>
                  <div className="[--profile-size:35px] sm:[--profile-size:40px] 2xl:[--profile-size:50px] 3xl:[--profile-size:60px] w-full h-auto flex items-center">
                    <div className="w-[calc(100%-var(--profile-size))] sm:pr-[10px] 2xl:pr-[15px]">
                      <div className="text-[14px] 2xl:text-[16px] 3xl:text-[21px] leading-normal font-medium text-white mb-[5px] 3xl:mb-[10px]">
                        {item?.name}
                      </div>
                      <Text
                        as="div"
                        size="p1"
                        className="font-light text-white/80"
                      >
                        {item?.location}
                      </Text>
                    </div>
                    {item?.media?.path && (
                      <div className="w-[var(--profile-size)] h-auto aspect-square rounded-full overflow-hidden block">
                        <Image
                          src={item?.media?.path}
                          alt={item?.media?.alt}
                          width={65}
                          height={65}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
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
