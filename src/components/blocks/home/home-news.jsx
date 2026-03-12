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
import NewsCard from "@/components/common/news-card";

export default function HomeNews({ data }) {
  const [activeFilter, setActiveFilter] = useState(
    data?.filterItems?.[0]?.slug ?? "upcoming",
  );
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    if (activeFilter === data?.filterItems?.[0]?.slug && data?.items) {
      setItems(data.items);
      return;
    }

    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/api/news?category=${activeFilter}`);
      if (res.ok) {
        const response = await res.json();
        
    const items =
      response?.data?.newsSection?.items ??
      response?.data?.items ??
      response?.items ??
      [];

        setItems(items);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [activeFilter, data?.filterItems, data?.items]);

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
  }, [emblaApi, items]);

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
              <Link href={"/news"}>
                View All
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
          loading && "opacity-50 pointer-events-none transition-opacity",
        )}
      >
        {items.length > 0 ? (
          <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
            <div className="flex touch-pan-y touch-pinch-zoom -mx-1 sm:-mx-2 lg:-mx-2.5">
              {items.map((item) => (
                <div
                  key={item?.id}
                  className={cn(
                    "flex-[0_0_268px] sm:flex-[0_0_320px] lg:flex-[0_0_420px] 2xl:flex-[0_0_500px] 3xl:flex-[0_0_650px] min-w-0 select-none px-1 sm:px-2 lg:px-2.5",
                  )}
                >
                  <NewsCard isLoading={loading} item={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 px-4">
            <Text as="p" size="p1" className="text-white/50">
              {loading
                ? "Loading news..."
                : `No ${activeFilter.toLowerCase()} news available.`}
            </Text>
          </div>
        )}
      </div>
    </section>
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
        const isActive = activeFilter === item?.slug;
        return (
          <Button
            key={item?.id}
            type="button"
            onClick={() => onFilterChange(item?.slug)}
            size="lg"
            variant="none"
            className={cn(
              "capitalize text-white p-0 relative z-0",
              isActive ? "text-white" : "text-white/50",
            )}
          >
            {item?.title}
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
