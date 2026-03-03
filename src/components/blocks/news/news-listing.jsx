"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import NewsCard from "@/components/common/news-card";
import { useState, useCallback } from "react";

export default function NewsListing({ data, activeCategory }) {
  const [activeFilter, setActiveFilter] = useState(
    activeCategory || data?.filters?.[0]?.slug || "upcoming",
  );
  const [items, setItems] = useState(data?.items ?? []);
  const [pagination, setPagination] = useState(data?.pagination ?? {});
  const [loading, setLoading] = useState(false);

  const fetchNews = useCallback(async (category, page, isAppend = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news?category=${category}&page=${page}`);
      if (res.ok) {
        const response = await res.json();
        const newData = response.data;
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
      setLoading(false);
    }
  }, []);

  const handleFilterChange = (slug) => {
    setActiveFilter(slug);
    fetchNews(slug, 1, false);
  };

  const handleLoadMore = () => {
    if (pagination.has_more) {
      fetchNews(activeFilter, pagination.current_page + 1, true);
    } else if (items.length > 12) {
      // Show Less functionality
      setItems(items.slice(0, 12));
      setPagination({
        ...pagination,
        current_page: 1,
        has_more: true, // Assuming there's more after shrinking
      });
      // Better way to handle Show Less: just reset to first page
      handleFilterChange(activeFilter);
    }
  };

  return (
    <section className="w-full h-auto block bg-[#181818] py-8 xl:py-13 2xl:py-15 3xl:py-20 relative z-0">
      <div className="text-[80px] sm:text-[140px] xl:text-[166px] 2xl:text-[200px] 3xl:text-[250px] font-bold leading-none uppercase text-center text-transparent select-none opacity-40 absolute -z-1 top-0 inset-x-0 [-webkit-text-stroke:1px_#595959]">
        {parse(data?.title || "News")}
      </div>
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 xl:mb-10 2xl:mb-10 3xl:mb-12">
          <div className="w-full sm:flex-1">
            <Heading
              as="h2"
              size="h1"
              className="text-medium text-white mb-1 xl:mb-1.5 3xl:mb-2"
            >
              {parse(data?.title || "News")}
            </Heading>
            <Text
              as="p"
              size="p1"
              className="text-medium text-white mb-1 xl:mb-2 3xl:mb-3"
            >
              {parse(data?.description || "News listing page")}
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

        <div className="flex flex-wrap -mx-1 xl:-mx-[5px] 2xl:-mx-1.5 3xl:-mx-2 min-h-[400px]">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item?.id}
                className="w-full lg:w-1/3 p-1 xl:p-[5px] 2xl:p-1.5 3xl:p-2"
              >
                <NewsCard isLoading={loading} item={item} />
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center py-20">
              <Text as="p" size="p1" className="text-center text-white/50">
                {loading
                  ? "Loading news..."
                  : `No ${activeFilter.toLowerCase()} news available.`}
              </Text>
            </div>
          )}

          {(pagination.has_more || items.length > 12) && (
            <div className="w-full flex justify-center mt-10 xl:mt-22.5 2xl:mt-25 3xl:mt-30">
              <Button
                size="lg"
                variant="none"
                className="text-white px-0 hover:text-[#008dd2] transition-colors"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {pagination.has_more ? "Load More" : "Show Less"}
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
            className={cn(
              "text-white p-0 relative z-0 transition-colors",
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
