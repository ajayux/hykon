"use client";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";

export default function FeaturedProducts({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full h-auto block bg-[#111111] py-12 lg:py-20 2xl:py-28 3xl:py-36">
      <div className="container">
        <div className="text-center mb-10 lg:mb-16 2xl:mb-20 3xl:mb-24">
          <Heading as="h2" size="h2" className="text-white mb-4">
            {data?.title}
          </Heading>
          {data?.description && (
            <Text size="p1" className="text-white/60 max-w-[600px] mx-auto">
              {data.description}
            </Text>
          )}
          {!data?.description && (
            <Text size="p1" className="text-white/60 max-w-[600px] mx-auto">
              Explore our best-selling and high-performance models.
            </Text>
          )}
        </div>

        <div className="relative group">
          <div
            ref={emblaRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="flex touch-pan-y touch-pinch-zoom -ml-4 lg:-ml-6 2xl:-ml-8 3xl:-ml-10">
              {data?.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_280px] sm:flex-[0_0_320px] lg:flex-[0_0_360px] 2xl:flex-[0_0_420px] 3xl:flex-[0_0_500px] min-w-0 pl-4 lg:pl-6 2xl:pl-8 3xl:pl-10"
                >
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-full w-10 lg:w-12 2xl:w-14 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center transition-all duration-300 z-10 disabled:opacity-30 disabled:cursor-not-allowed",
              !canScrollPrev && "opacity-0 invisible",
            )}
          >
            <Image
              src="/images/icon-arrow-right-white.svg"
              alt="prev"
              width={20}
              height={15}
              className="w-1/2 rotate-180"
            />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-full w-10 lg:w-12 2xl:w-14 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center transition-all duration-300 z-10 disabled:opacity-30 disabled:cursor-not-allowed",
              !canScrollNext && "opacity-0 invisible",
            )}
          >
            <Image
              src="/images/icon-arrow-right-white.svg"
              alt="next"
              width={20}
              height={15}
              className="w-1/2"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ item }) {
  return (
    <div className="w-full flex flex-col group/card bg-transparent">
      <div className="w-full aspect-[4/3] bg-transparent rounded-2xl overflow-hidden mb-6 lg:mb-8 2xl:mb-10 3xl:mb-12 flex items-center justify-center">
        <div className="w-full h-full relative transition-transform duration-700 group-hover/card:scale-110">
          <Image
            src={item?.media?.path || "/images/product-placeholder.png"}
            alt={item?.image_alt_text || item.title}
            fill
            className="object-contain p-4"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <Heading as="h4" size="h4" className="text-white mb-2 lg:mb-3 2xl:mb-4">
          {item.title}
        </Heading>
        <Text size="p2" className="text-white/60 mb-6 lg:mb-8 line-clamp-2">
          {item.description ||
            "The first Innovative UPS from Hykon comes with a built-in battery..."}
        </Text>

        <Link
          href={`/products/${item.slug}`}
          className="flex items-center gap-3 group/link w-fit"
        >
          <div className="w-6 lg:w-8 2xl:w-10 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center transition-transform duration-300 group-hover/link:scale-110">
            <Image
              src="/images/icon-arrow-right-white.svg"
              alt="arrow"
              width={18}
              height={14}
              className="w-1/2"
            />
          </div>
          <span className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-white font-medium uppercase tracking-wider">
            View Details
          </span>
        </Link>
      </div>
    </div>
  );
}
