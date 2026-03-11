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
import BlogsCard from "@/components/common/blogs-card";

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
    <section className="w-full h-auto block bg-[#181818] py-[20px_45px] sm:py-[25px_60px] xl:py-[30px_60px] 2xl:py-[40px_76px] 3xl:py-[50px_95px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap items-center gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 sm:mb-10 xl:mb-12.5 2xl:mb-16 3xl:mb-20">
          <div className="w-full sm:flex-1 flex justify-between items-end">
            <div className="w-auto lg:w-auto">
              <Heading
                as="h2"
                size="h1"
                className="text-[24px] sm:text-[30px] lg:text-[38px] 2xl:text-[48px] 3xl:text-[60px] leading-tight text-medium text-white"
              >
                {parse(data?.title || "")}
              </Heading>
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
                    <BlogsCard isLoading={loading} item={item} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-20 px-4">
              <Text as="p" size="p1" className="text-white/50">
                {loading ? "Loading blogs..." : "No blogs available."}
              </Text>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 xl:gap-6 2xl:gap-6 3xl:gap-7 mt-8 lg:mt-10 2xl:mt-15 3xl:mt-20">
          <button
            onClick={scrollPrev}
            className="w-8 h-8 xl:w-10 xl:h-10 2xl:w-13.5 2xl:h-13.5 3xl:w-16.25 3xl:h-16.25 flex items-center justify-center rounded-full bg-[#008dd2] hover:border hover:border-white text-white -scale-x-100 transition cursor-pointer"
          >
            <Image
              src="/images/icon-arrow-right-white.svg"
              alt="Previous"
              width={28}
              height={20}
              className="object-contain w-4 h-3 2xl:w-5.5 2xl:h-4 3xl:w-7 3xl:h-5"
            />
          </button>

          <button
            onClick={scrollNext}
            className="w-8 h-8 xl:w-10 xl:h-10 2xl:w-13.5 2xl:h-13.5 3xl:w-16.25 3xl:h-16.25 flex items-center justify-center rounded-full bg-[#008dd2] hover:border hover:border-white text-white transition cursor-pointer"
          >
            <Image
              src="/images/icon-arrow-right-white.svg"
              alt="Next"
              width={28}
              height={20}
              className="object-contain w-4 h-3 2xl:w-5.5 2xl:h-4 3xl:w-7 3xl:h-5"
            />
          </button>
        </div>
      </div>
    </section>
  );
}


