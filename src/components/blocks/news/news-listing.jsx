"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import NewsCard from "@/components/common/news-card";
import { useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewsListing({ data, variant }) {
  const [activeFilter, setActiveFilter] = useState(
    data?.filters?.[0]?.slug || "upcoming",
  );
  const [items, setItems] = useState(data?.items ?? []);
  const [pagination, setPagination] = useState(data?.pagination ?? {});
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = useCallback(async (category, page, isAppend = false) => {
    setIsLoading(true);
    if (!isAppend) setItems([]);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(
        `${baseUrl}/api/${variant}?category=${category}&page=${page}`,
      );
      if (res.ok) {
        const response = await res.json();
        const result = response.data?.newsSection || response.data;
        const newData = result;
        if (isAppend) {
          setItems((prev) => [...prev, ...(newData.items || [])]);
        } else {
          setItems(newData.items || []);
        }
        setPagination(newData.pagination || {});
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFilterChange = (slug) => {
    setActiveFilter(slug);
    fetchNews(slug, 1, false);
  };

  const handleLoadMore = () => {
    if (pagination.has_more) {
      fetchNews(activeFilter, pagination.current_page + 1, true);
    } else if (items.length > 6) {
      // Show Less functionality: simply slice to initial 6 items locally
      setItems(items.slice(0, 6));
      setPagination({
        ...pagination,
        current_page: 1,
        has_more: true,
      });
    }
  };

  return (
    <section className="w-full h-auto block bg-[#181818] py-8 xl:py-13 2xl:py-15 3xl:py-20 relative z-0">
      <div className="text-[80px] sm:text-[140px] xl:text-[166px] 2xl:text-[200px] 3xl:text-[250px] font-bold leading-none uppercase text-center text-transparent select-none opacity-40 absolute -z-1 top-0 inset-x-0 [-webkit-text-stroke:1px_#595959]">
        {parse(data?.title || "")}
      </div>
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 xl:mb-10 2xl:mb-10 3xl:mb-12">
          <div className="w-full sm:flex-1">
            <Heading
              as="h2"
              size="h1"
              className="text-medium text-white mb-1 xl:mb-1.5 3xl:mb-2"
            >
              {parse(data?.title || "")}
            </Heading>
            <Text
              as="p"
              size="p1"
              className="text-medium text-white mb-1 xl:mb-2 3xl:mb-3"
            >
              {parse(data?.description || "")}
            </Text>
          </div>
          <div className="w-full sm:w-auto flex">
            <FilterItems
              className="ml-auto"
              items={data?.filters}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-1 xl:-mx-[5px] 2xl:-mx-1.5 3xl:-mx-2">
          {isLoading && items.length === 0 ? (
            <>
              <Skeleton />
              <NewsCardSkeleton />
              <NewsCardSkeleton />
            </>
          ) : items.length > 0 ? (
            items.map((item) => (
              <div
                key={item?.id}
                className="w-full lg:w-1/3 p-1 xl:p-[5px] 2xl:p-1.5 3xl:p-2"
              >
                <NewsCard item={item} variant={variant} />
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center py-20">
              <Text as="p" size="p1" className="text-center text-white/50">
                No {activeFilter.toLowerCase()} {variant} available.
              </Text>
            </div>
          )}

          {(pagination.has_more || items.length > 6) && (
            <div className="w-full flex justify-center mt-10 xl:mt-22.5 2xl:mt-25 3xl:mt-30">
              <Button
                size="lg"
                variant="none"
                className="text-white px-0 hover:text-[#008dd2] transition-colors"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : pagination.has_more
                    ? "Load More"
                    : "Show Less"}
                <Image
                  src={"/images/icon-news-right.svg"}
                  alt={"icon-news-right"}
                  width={6}
                  height={10}
                  className={cn(
                    "w-1 3xl:w-1.5 block mt-0.5 ml-2",
                    !pagination.has_more && "rotate-180",
                  )}
                  unoptimized
                />
              </Button>
            </div>
          )}
        </div>
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
            disabled={isActive}
            className={cn(
              "capitalize cursor-pointer text-white p-0 relative z-0 transition-colors disabled:opacity-100",
              isActive ? "text-white" : "text-white/50 hover:text-white",
            )}
          >
            <span className="pb-2 block">{item?.title}</span>
            <span
              className={cn(
                "absolute z-0 bottom-0 inset-x-0 w-full h-[2px] transition-all duration-300",
                isActive
                  ? "bg-[#008dd2] opacity-100"
                  : "bg-white/20 opacity-0 group-hover:opacity-100",
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}

function NewsCardSkeleton() {
  return (
    <div className="w-full lg:w-1/3 p-1 xl:p-[5px] 2xl:p-1.5 3xl:p-2">
      <div className="group w-full h-full flex flex-col">
        <Skeleton className="w-full aspect-63/33 rounded-[14px] 2xl:rounded-[16px] 3xl:rounded-[20px] bg-[#1c1c1c] mb-1 xl:mb-2 2xl:mb-4 3xl:mb-6 " />

        <Skeleton className="flex-1 flex flex-col justify-between w-full p-2 xl:p-3.5 2xl:p-4.5 3xl:p-5.5">
          <div>
            <Skeleton className="w-full h-5 bg-white/10 mb-3 lg:mb-5 3xl:mb-6" />
            <Skeleton className="w-full h-4 bg-white/10 mb-1 xl:mb-2 3xl:mb-3" />
          </div>
          <div>
            <Skeleton className="w-full max-w-[80px] lg:max-w-[100px] 2xl:max-w-[120px] 3xl:max-w-[147px] h-10 bg-white/10" />
          </div>
        </Skeleton>
      </div>
    </div>
  );
}
