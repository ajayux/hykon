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

export default function BlogRelatedBlogs({ data }) {

  const items = data?.items || [];
  const [loading, setLoading] = useState(false);
  // const [activeFilter, setActiveFilter] = useState("All");

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0, true);
    }
  }, [emblaApi, items]);

  return (
    <section className="w-full h-auto block bg-[#181818] py-8 xl:py-13 2xl:py-15 3xl:py-20 relative z-0">
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 xl:mb-10 2xl:mb-11 3xl:mb-15">
          <div className="w-full sm:flex-1 flex justify-between items-end">
            <div className="w-auto lg:w-auto">
              <Heading
                as="h2"
                size="h1"
                className="text-[24px] sm:text-[30px] lg:text-[38px] 2xl:text-[48px] 3xl:text-[60px] text-medium text-white mb-1 xl:mb-1.5 3xl:mb-2"
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
          </div>
          <div className="w-full sm:w-[100px] xl:w-[124px] 2xl:w-[150px] 3xl:w-[187px]">
            <Button
              size="lg"
              variant="outline"
              className="text-white min-w-[100px] lg:min-w-full justify-between font-medium pl-4 xl:pl-7"
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
        </div>
      

        <div
          className={cn(
            "w-full",
            "mx-auto",
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
                      "flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 select-none px-1 sm:px-2 lg:px-2.5",
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

        <div className="flex justify-center gap-4 xl:gap-6 2xl:gap-6 3xl:gap-7 mt-8 lg:mt-10 2xl:mt-15 3xl:mt-20">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 3xl:w-[65px] 3xl:h-[65px] flex items-center justify-center rounded-full bg-[#008dd2] hover:border hover:border-white text-white -scale-x-100 transition cursor-pointer"
          >
            <Image
              src="/images/icon-arrow-right-white.svg"
              alt="Previous"
              width={28}
              height={20}
              className="object-contain"
            />
          </button>

          <button
            onClick={scrollNext}
            className="w-10 h-10 3xl:w-[65px] 3xl:h-[65px]  flex items-center justify-center rounded-full bg-[#008dd2] hover:border hover:border-white text-white transition cursor-pointer"
          >
            <Image
              src="/images/icon-arrow-right-white.svg"
              alt="Next"
              width={28}
              height={20}
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </section>
  );
}


