"use client";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, Suspense } from "react";

import useEmblaCarousel from "embla-carousel-react";

import dynamic from "next/dynamic";
import parse from "html-react-parser";
const ProductCard = dynamic(() => import("@/components/common/product-card"), {
  ssr: false,
  loading: () => <ProductCardSkeleton />,
});
import { Skeleton } from "@/components/ui/skeleton";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

export default function HomeProducts({ data }) {
  const { corporateItems, domesticItems } = data;

  return (
    <section className="w-full h-auto block bg-[#181818] py-6 lg:py-8 xl:py-10 2xl:py-15 3xl:py-20 relative z-0">
      {corporateItems?.items?.length > 0 && (
        <ProductBlock sectionData={corporateItems} parentTitle={data?.title} />
      )}
      {domesticItems?.items?.length > 0 && (
        <ProductBlock
          sectionData={domesticItems}
          parentTitle={data?.title}
          reversed
        />
      )}
    </section>
  );
}

function ProductBlock({ sectionData, parentTitle, reversed }) {
  const [activeItem, setActiveItem] = useState(
    sectionData?.items?.[0]?.id || 1,
  );

  const [fetchedProducts, setFetchedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchProductsBySlug = useCallback(async (slug) => {
    if (!slug) return;
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/home-category-wise-product?category_slug=${slug}`,
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const json = await res.json();
      setFetchedProducts(
        json?.success && Array.isArray(json?.data?.items)
          ? json.data.items
          : [],
      );
    } catch (err) {
      setFetchError(err.message || "Something went wrong.");
      setFetchedProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const activeItemSlug = sectionData?.items?.find(
    (i) => i.id === activeItem,
  )?.slug;

  useEffect(() => {
    if (activeItemSlug) fetchProductsBySlug(activeItemSlug);
  }, [activeItemSlug, fetchProductsBySlug]);

  const displayedProducts =
    fetchedProducts !== null
      ? fetchedProducts
      : (sectionData?.productsItems ?? []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  return (
    <div className="w-full h-auto block py-8 sm:py-10 lg:py-5 xl:py-6 2xl:py-7 3xl:py-8">
      <div
        className={cn(
          "container xl:max-w-[1250px] 2xl:max-w-[1500px] 3xl:max-w-[1870px]",
          "max-sm:pr-0 max-sm:[mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
        )}
      >
        <div
          className={cn(
            "flex flex-wrap items-center",
            reversed && "lg:flex-row-reverse",
          )}
        >
          <div className="w-full lg:w-[376px] xl:w-[474px] 2xl:w-[535px] 3xl:w-[670px]">
            <div
              className={cn(
                "w-full",
                reversed
                  ? "lg:pr-7 xl:pr-9.5 2xl:pr-12 3xl:pr-18"
                  : "lg:pl-7 xl:pl-9.5 2xl:pl-12 3xl:pl-18",
              )}
            >
              <div className={cn("lg:max-w-9/12", reversed && "ml-auto")}>
                <div className={cn("w-auto flex")}>
                  <span className="text-[10px] lg:text-[11px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal truncate text-white w-auto min-w-[90px] xl:min-w-[96px] 2xl:min-w-[115px] 3xl:min-w-[140px] h-auto border border-white rounded-[6px] flex items-center gap-2 p-1 mb-10 xl:mb-20 2xl:mb-[96px] 3xl:mb-[120px]">
                    <span className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#02a3f2] rounded-full flex items-center justify-center p-1">
                      {sectionData?.id}
                    </span>
                    {sectionData?.title}
                  </span>
                </div>
                <Heading
                  as="div"
                  size="none"
                  className={cn(
                    "text-[7px] lg:text-[7.5px] 2xl:text-[9px] 3xl:text-[11px] font-normal tracking-[0.05rem] uppercase text-[#008dd2] mb-3 xl:mb-4 2xl:mb-6 3xl:mb-7",
                  )}
                >
                  {parentTitle}
                </Heading>
              </div>

              <MediaQuery minWidth={1024}>
                <div className="flex flex-wrap gap-y-4 xl:gap-y-6 2xl:gap-y-7 3xl:gap-y-9">
                  {sectionData?.items?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveItem(item.id)}
                      className="w-full"
                    >
                      <CategoryItem
                        item={item}
                        activeItem={activeItem}
                        reversed={reversed}
                      />
                    </div>
                  ))}
                </div>
              </MediaQuery>
            </div>
          </div>
          <MediaQuery maxWidth={1023}>
            <div
              ref={emblaRef}
              className="w-full max-w-full overflow-hidden pb-8"
            >
              <div className="flex touch-pan-y touch-pinch-zoom -mx-1 sm:-mx-2 lg:-mx-2.5">
                {sectionData?.items?.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveItem(item.id);
                      if (emblaApi) emblaApi.scrollTo(index);
                    }}
                    className={cn(
                      "flex-[0_0_200px] sm:flex-[0_0_268px] min-w-0 select-none px-1 sm:px-2 lg:px-2.5",
                    )}
                  >
                    <CategoryItem
                      item={item}
                      activeItem={activeItem}
                      reversed={reversed}
                    />
                  </div>
                ))}
              </div>
            </div>
          </MediaQuery>
          <div className={cn("w-full lg:flex-1 max-sm:pr-4")}>
            <div className="w-full lg:min-h-[570px] xl:min-h-[680px] 2xl:min-h-[870px] 3xl:min-h-[1000px] bg-[linear-gradient(to_bottom,#008dd2b3_0%,#181818b3_30%,#181818b3_70%,#008dd2b3_100%)] rounded-[13px] 2xl:rounded-[16px] 3xl:rounded-[20px] px-1 min-[376px]:px-5 sm:px-10 lg:px-15 xl:px-18 2xl:px-7 3xl:px-25 py-5 sm:py-10 xl:py-[45px] 2xl:py-[55px] 3xl:py-[70px] ">
              <div className="flex flex-wrap">
                <Suspense
                  fallback={
                    <>
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="w-1/2 sm:w-1/3">
                          <ProductCardSkeleton />
                        </div>
                      ))}
                    </>
                  }
                >
                  {isLoading ? (
                    <>
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="w-1/2 sm:w-1/3">
                          <ProductCardSkeleton />
                        </div>
                      ))}
                    </>
                  ) : fetchError ? (
                    <div className="w-full flex items-center justify-center py-10">
                      <span className="text-white/60 text-sm">
                        {fetchError}
                      </span>
                    </div>
                  ) : displayedProducts.length === 0 ? (
                    <div className="w-full flex items-center justify-center py-10">
                      <span className="text-white/40 text-sm">
                        No products available.
                      </span>
                    </div>
                  ) : (
                    displayedProducts.map((item) => (
                      <div key={item.id} className="w-1/2 sm:w-1/3">
                        <ProductCard item={item} />
                      </div>
                    ))
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="w-full h-auto px-4 xl:px-8 3xl:px-10 py-4 xl:py-6 3xl:py-8 animate-pulse">
      <Skeleton className="w-full aspect-10/8 bg-white/10 mb-2 xl:mb-5 3xl:mb-6" />
      <Skeleton className="w-3/4 h-5 bg-white/10 mb-2 xl:mb-3 2xl:mb-5 3xl:mb-6" />
      <Skeleton className="w-full h-3 bg-white/5 mb-1" />
      <Skeleton className="w-full h-3 bg-white/5 mb-1" />
      <Skeleton className="w-2/3 h-3 bg-white/5 mb-3 xl:mb-4 2xl:mb-6 3xl:mb-7" />
      <Skeleton className="w-24 h-4 bg-white/10 rounded-full" />
    </div>
  );
}

function CategoryItem({ item, activeItem, reversed }) {
  return (
    <div className="group w-full relative z-0 cursor-pointer pb-6 lg:pb-0">
      <div
        className={cn(
          "w-full max-w-9/10 lg:max-w-9/12",
          reversed && "lg:ml-auto",
        )}
      >
        <div
          className={cn(
            "w-full max-w-7/10 h-[1px] bg-white lg:bg-black absolute z-1 bottom-0 inset-x-0",
            activeItem === item.id ? "opacity-80" : "opacity-10",
          )}
        />
        <Heading
          as="div"
          size="none"
          className={cn(
            "text-[14px] sm:text-[16px] lg:text-[20px] 2xl:text-[24px] 3xl:text-[30px] leading-tight font-medium text-white transition-all duration-300",
            activeItem === item.id
              ? "opacity-100"
              : "opacity-50 lg:opacity-90 group-hover:text-[#008dd2] group-hover:opacity-100",
          )}
        >
          {parse(item?.title)}
        </Heading>
        <div
          className={cn(
            "transition-all duration-300 overflow-hidden",
            activeItem === item.id
              ? "h-auto visible opacity-100"
              : "lg:h-0 lg:invisible opacity-50 lg:opacity-90",
          )}
        >
          <Text
            as="div"
            size="p2"
            className={cn(
              "line-clamp-2 lg:line-clamp-4 text-white pt-3 xl:pt-4 2xl:pt-6 3xl:pt-7 transition-all duration-300",
              activeItem === item.id
                ? "translate-y-0"
                : "lg:translate-y-full lg:opacity-50",
            )}
          >
            {parse(item?.description)}
          </Text>
        </div>
        <div
          className={cn(
            "absolute z-1 bottom-0 lg:bottom-auto lg:top-1/2 translate-y-1/2 lg:-translate-y-1/2 transition-opacity duration-400 ease-out",
            activeItem === item.id
              ? "opacity-100 scale-100"
              : "opacity-0 scale-0",
            reversed
              ? "right-5 lg:right-auto lg:left-0 translate-x-0 lg:-translate-x-1/2 rotate-90 lg:rotate-180"
              : "right-5 lg:right-0 translate-x-0 lg:translate-x-1/2 rotate-90 lg:rotate-0",
          )}
        >
          <div className="w-8 lg:w-[60px] xl:w-[78px] 2xl:w-[98px] 3xl:w-[118px] aspect-square rounded-full bg-white/10 border-1 border-[#efefef] p-1 lg:p-2 xl:p-4 2xl:p-5 3xl:p-6 ">
            <div className="w-full aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
              <Image
                src={"/images/icon-arrow-right-white.svg"}
                alt={"icon-arrow-right-white"}
                width={18}
                height={13}
                className="w-1/2"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
