"use client";

import { cn } from "@/lib/utils";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Text } from "@/components/utils/typography";

export default function HomeCategories({ data }) {
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
    <section className="w-full h-auto bg-[#171d1f] block py-6 xl:py-10 2xl:py-11 3xl:py-13 overflow-hidden">
      <div
        className={cn(
          "w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1080px] xl:max-w-[1250px] 2xl:max-w-[1500px] 3xl:max-w-[1870px] mx-auto",
          "px-4 [mask-image:linear-gradient(to_right,transparent_0%,black_2%,black_98%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_2%,black_98%,transparent_100%)]",
        )}
      >
        <div
          ref={emblaRef}
          className="w-full max-w-full overflow-hidden"
          data-cursor="carousel"
        >
          <div className="flex touch-pan-y touch-pinch-zoom -mx-1 3xl:-mx-2 [&>*]:p-1 3xl:[&>*]:p-2">
            {data?.map((item) => (
              <div
                key={item?.id}
                className={cn(
                  "flex-[0_0_220px] sm:flex-[0_0_33.333%] xl:flex-[0_0_130px] 2xl:flex-[0_0_150px] 3xl:flex-[0_0_185px] min-w-0 select-none",
                )}
              >
                <div className="group w-full h-full bg-[#16242A] rounded-[17px] flex flex-col px-2 py-5 transition-all duration-300 relative z-0 hover:bg-[#008dd2]">
                  <div className="w-full h-[100px] 2xl:h-[120px] 3xl:h-[140px] flex justify-center items-center">
                    <div className="w-[40px] 2xl:w-[48px] 3xl:w-[60px] aspect-square relative group-hover:translate-y-[-10px] transition-all duration-300">
                      <Image
                        src={item?.iconPath}
                        alt={item?.name}
                        width={44}
                        height={56}
                        className="w-full aspect-square object-contain opacity-100 group-hover:opacity-0 transition-all duration-300 absolute z-0"
                      />
                      <Image
                        src={item?.iconWhitePath}
                        alt={item?.name}
                        width={44}
                        height={56}
                        className="w-full aspect-square object-contain opacity-0 group-hover:opacity-100 transition-all duration-300 absolute z-1"
                      />
                    </div>
                  </div>
                  <Text
                    as="div"
                    size="p1"
                    className="leading-tight font-medium text-center text-white group-hover:translate-y-[-20px] 2xl:group-hover:translate-y-[-25px] 3xl:group-hover:translate-y-[-30px] transition-all duration-300"
                  >
                    {item?.name}
                  </Text>

                  <div className="absolute z-1 bottom-[18px] inset-x-0 flex justify-center items-center gap-x-1 2xl:gap-x-2 3xl:gap-x-3 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-4 2xl:w-5 3xl:w-6 aspect-square bg-white rounded-full flex items-center justify-center">
                      <Image
                        src={"/images/icon-arrow-right-blue.svg"}
                        alt={"icon-arrow-right-blue"}
                        width={13}
                        height={10}
                        className="w-3"
                        unoptimized
                      />
                    </div>
                    <div className="text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-normal text-white">
                      View Details
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
