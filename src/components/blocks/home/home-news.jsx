"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";

const FILTER_MAP = {
  Upcoming: "upcoming",
  Featured: "featured",
  Archives: "archives",
};

export default function HomeNews({ data }) {
  const [activeFilter, setActiveFilter] = useState(
    data?.filterItems?.[0] ?? "Upcoming",
  );

  const filteredItems =
    data?.items?.filter(
      (item) => item?.category === FILTER_MAP[activeFilter],
    ) ?? [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0, true);
    }
  }, [emblaApi, filteredItems]);

  return (
    <section className="w-full h-auto block bg-[#212121] py-8 xl:py-13 2xl:py-15 3xl:py-20 relative z-0">
      <div className="text-[80px] sm:text-[140px] xl:text-[166px] 2xl:text-[200px] 3xl:text-[250px] font-bold leading-none uppercase text-center text-[#212121] select-none opacity-40 absolute -z-1 top-0 inset-x-0 [-webkit-text-stroke:1px_#595959]">
        {parse(data?.title)}
      </div>
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 xl:mb-10 2xl:mb-11 3xl:mb-15">
          <div className="w-full sm:flex-1 flex justify-between items-end">
            <div className="w-auto lg:w-auto">
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
            <FilterItems
              className="hidden lg:flex"
              items={data?.filterItems}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
          <div className="w-full sm:w-[100px] xl:w-[124px] 2xl:w-[150px] 3xl:w-[187px]">
            <Button
              size="lg"
              variant="outline"
              className="text-white min-w-[100px] lg:min-w-full justify-between pl-4 xl:pl-7"
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
                    className="w-1/2"
                    unoptimized
                  />
                </div>
              </Link>
            </Button>
          </div>
          <div className="w-full lg:hidden">
            <FilterItems
              items={data?.filterItems}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "w-full sm:max-w-[calc(var(--breakpoint-sm)/2+50%)] md:max-w-[calc(var(--breakpoint-md)/2+50%)] lg:max-w-[calc(var(--breakpoint-lg)/2+50%)] xl:max-w-[calc(var(--breakpoint-xl)/2+50%)] 2xl:max-w-[calc(var(--breakpoint-2xl)/2+50%)] 3xl:max-w-[calc(var(--breakpoint-3xl)/2+50%)]",
          "pl-4 ml-auto [mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
        )}
      >
        {filteredItems.length > 0 ? (
          <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
            <div className="flex touch-pan-y touch-pinch-zoom -mx-1 sm:-mx-2 lg:-mx-2.5">
              {filteredItems.map((item) => (
                <NewsCard key={item?.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 px-4">
            <Text as="p" size="p1" className="text-white/50">
              No {activeFilter.toLowerCase()} news available.
            </Text>
          </div>
        )}
      </div>
    </section>
  );
}

function NewsCard({ item }) {
  return (
    <div
      className={cn(
        "flex-[0_0_268px] sm:flex-[0_0_320px] lg:flex-[0_0_420px] 2xl:flex-[0_0_500px] 3xl:flex-[0_0_650px] min-w-0 select-none px-1 sm:px-2 lg:px-2.5",
      )}
    >
      <div className="group w-full h-full flex flex-col relative z-0">
        <div className="w-full mb-6 xl:mb-9 2xl:mb-11 3xl:mb-14 relative z-0">
          <div className="w-full aspect-63/33 rounded-[14px] 2xl:rounded-[16px] 3xl:rounded-[20px] overflow-hidden">
            <Image
              src={item?.media?.path}
              alt={item?.media?.alt}
              width={630}
              height={330}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="absolute z-1 bottom-0 left-4 translate-y-1/3 3xl:translate-y-1/4">
            <div
              className={cn(
                "w-full min-w-[80px] lg:min-w-[100px] 2xl:min-w-[120px] 3xl:min-w-[147px] bg-[#262626] rounded-[14px] 3xl:rounded-[20px] py-2 xl:py-3 2xl:py-4 3xl:py-5 px-2 xl:px-3 2xl:px-3.5 3xl:px-3.5 transition-all duration-300",
                "group-hover:bg-[#008dd2]",
              )}
            >
              <div className="text-[20px] sm:text-[24px] lg:text-[28px] xl:text-[35px] 2xl:text-[42px] 3xl:text-[53px] leading-none font-normal text-center text-white mb-1 xl:mb-2">
                {item?.publishDay}
              </div>
              <div className="text-[10px] lg:text-[12px] xl:text-[15px] 2xl:text-[18px] 3xl:text-[22px] leading-none font-normal text-center text-white">
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
              className="font-medium line-clamp-2 text-white mb-3 lg:mb-5 3xl:mb-6"
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
  );
}

function FilterItems({ items, activeFilter, onFilterChange, className }) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-5 xl:gap-x-8 2xl:gap-x-10 3xl:gap-x-12.5",
        className,
      )}
    >
      {items?.map((item) => {
        const isActive = activeFilter === item;
        return (
          <Button
            key={item}
            type="button"
            onClick={() => onFilterChange(item)}
            size="lg"
            variant="none"
            className={cn(
              "text-white p-0 relative z-0",
              isActive ? "text-white" : "text-white/50",
            )}
          >
            {item}
            <span
              className={cn(
                "absolute z-0 bottom-0 inset-x-0 w-full h-0.5 bg-white",
                isActive ? "bg-[#008dd2]" : "bg-white/50",
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}
