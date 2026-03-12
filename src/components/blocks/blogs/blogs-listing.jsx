"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import BlogsCard from "@/components/common/blogs-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function BlogsListing({ data }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [items, setItems] = useState(data?.items ?? []);
  const [pagination, setPagination] = useState(data?.pagination ?? {});
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = useCallback(async (category, page, isAppend = false) => {
    setIsLoading(true);
    if (!isAppend) setItems([]);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(
        `${baseUrl}/api/blogs?category=${category}&page=${page}`,
      );
      if (res.ok) {
        const response = await res.json();
        const result = response.data?.blogSection || response.data;
        const blogData = result;
        if (isAppend) {
          setItems((prev) => [...prev, ...(blogData.items || [])]);
        } else {
          setItems(blogData.items || []);
        }
        setPagination(blogData.pagination || {});
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFilterChange = (value) => {
    setActiveFilter(value);
    fetchBlogs(value, 1, false);
  };

  const handleLoadMore = () => {
    if (pagination.has_more) {
      fetchBlogs(activeFilter, pagination.current_page + 1, true);
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
    <section className="w-full h-auto block bg-[#181818] py-8 xl:py-[52px_42px] 2xl:py-[60px_50px] 3xl:py-[80px_60px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-4 sm:mb-8 xl:mb-10 2xl:mb-12.5 3xl:mb-16.5">
          <div className="w-full flex-1">
            <Heading
              as="h2"
              size="h1"
              className="leading-tight font-medium text-white mb-1 sm:mb-0"
            >
              {parse(data?.title || "")}
            </Heading>
          </div>

          <div className="w-[120px] sm:w-[140px] xl:w-[170px] 2xl:w-[200px] 3xl:w-[245px]">
            <Select value={activeFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-tight font-normal text-white data-placeholder:text-white/80 w-full p-0 border-0 border-b-2 border-b-[#008dd2] rounded-none hover:scale-100 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value="all" className="block text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px]">Category</SelectItem>
                  {data?.filters?.map((item) => (
                    <SelectItem key={item?.id} value={item?.slug} className="text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px]">
                      {item?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap -mx-1 -mx-[5px] xl:-mx-[6px] 2xl:-mx-[7px] 3xl:-mx-[9px] relative min-h-[400px]">
          {isLoading && items.length === 0 ? (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          ) : items?.length > 0 ? (
            items.map((item) => (
              <div
                key={item?.id}
                className="w-full min-[376px]:w-1/2 lg:w-1/3 p-[7px_5px] xl:p-[9px_6px] 2xl:p-[11px_7px] 3xl:p-[14px_9px]"
              >
                <BlogsCard item={item} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-20 bg-[#1c1c1c] rounded-[20px]">
              <Text
                as="p"
                size="p1"
                className="text-white/30 text-center mx-auto"
              >
                No {activeFilter.toLowerCase()} blogs available.
              </Text>
            </div>
          )}
        </div>

        {(pagination.has_more || items.length > 6) && (
          <Button
            size="lg"
            variant="none"
            className="flex text-white px-0 mt-[15px] sm:mt-[20px] xl:mt-[30px] 2xl:mt-[40px] 3xl:mt-[50px] mx-auto hover:text-[#008dd2] transition-colors"
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
        )}
      </div>
    </section>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="w-full min-[376px]:w-1/2 lg:w-1/3 p-[7px_5px] xl:p-[8px_6px] 2xl:p-[11px_7px] 3xl:p-[16px_9px]">
      <div className="w-full aspect-square rounded-[20px] bg-[#1c1c1c] animate-pulse overflow-hidden relative">
        <div className="absolute inset-x-2 sm:inset-x-3 xl:inset-x-6 2xl:inset-x-7 3xl:inset-x-9 bottom-4 sm:bottom-4 xl:bottom-8 2xl:bottom-9.5 3xl:bottom-12">
          <Skeleton className="w-full h-24 bg-white/10 rounded-[14px]" />
        </div>
      </div>
    </div>
  );
}
