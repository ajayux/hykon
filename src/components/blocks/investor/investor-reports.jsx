"use client";

import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import parse from "html-react-parser";

import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function InvestorReports({ data }) {
  const [activeFilter, setActiveFilter] = useState(
    data?.filters?.[0]?.slug || "investor-relations",
  );
  const [items, setItems] = useState(data?.items ?? []);
  const [pagination, setPagination] = useState(data?.pagination ?? {});
  const [isLoading, setIsLoading] = useState(false);

  const fetchReports = useCallback(async (category, page, isAppend = false) => {
    setIsLoading(true);
    if (!isAppend) setItems([]);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const res = await fetch(
        `${baseUrl}/api/reports?category=${category}&page=${page}`,
      );
      if (res.ok) {
        const response = await res.json();
        const reportsData = response.data?.reportsSection || response.data;

        if (isAppend) {
          setItems((prev) => [...prev, ...(reportsData.items || [])]);
        } else {
          setItems(reportsData.items || []);
        }
        setPagination(reportsData.pagination || {});
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFilterChange = (slug) => {
    setActiveFilter(slug);
    fetchReports(slug, 1, false);
  };

  const handleLoadMore = () => {
    if (pagination.has_more) {
      fetchReports(activeFilter, pagination.current_page + 1, true);
    } else if (items.length > 6) {
      // Show Less functionality
      setItems(items.slice(0, 6));
      setPagination({
        ...pagination,
        current_page: 1,
        has_more: true,
      });
    }
  };

  return (
    <section className="w-full h-auto block py-10 xl:py-15 2xl:py-20 3xl:py-24 bg-[#444142]">
      <div className="container">
        <div className="w-full bg-[#212121] py-6 sm:py-8 xl:py-12 2xl:py-14 3xl:py-18 px-8 sm:px-10 xl:px-14 2xl:px-16 3xl:px-20 rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px]">
          <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 xl:mb-10 2xl:mb-15 3xl:mb-20">
            <div className="w-full sm:flex-1">
              <Heading
                as="h2"
                size="h1"
                className="text-medium text-white mb-2 sm:mb-0"
              >
                {parse(data?.filters?.[0]?.title || "")}
              </Heading>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-5.5 2xl:gap-7 3xl:gap-8">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ReportCardSkelton key={"skeleton" + index} />
              ))
            ) : items?.length > 0 ? (
              items.map((item, index) => (
                <>
                  <ReportCard key={"report" + index} item={item} />
                </>
              ))
            ) : (
              <div className="w-full text-center py-10 xl:py-15 2xl:py-20 bg-[#1c1c1c] rounded-[20px]">
                <Text as="p" size="p1" className="text-white/30">
                  No positions found matching your criteria.
                </Text>
              </div>
            )}
          </div>

          {items?.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <Text size="p0" className="text-gray-400">
                No reports found for this category.
              </Text>
            </div>
          )}

          {(pagination.has_more || items.length > 6) && (
            <div className="flex justify-center mt-12">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="border-[#008dd2] text-[#008dd2] hover:bg-[#008dd2] hover:text-white"
              >
                {pagination.has_more ? "Load More" : "Show Less"}
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
              "cursor-pointer capitalize text-white py-0 px-2 sm:px-4 xl:px-6 2xl:px-7 3xl:px-9 relative z-0 transition-colors",
              isActive ? "text-white" : "text-white/50 hover:text-white",
            )}
          >
            <span>{item?.title}</span>
            <span
              className={cn(
                "absolute z-0 bottom-0 inset-x-0 w-full h-[2px] transition-all duration-300",
                isActive ? "bg-[#008dd2] opacity-100" : "bg-white/20 opacity-0",
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}

function ReportCard({ item }) {
  return (
    <div className="w-full border border-white/30 rounded-[6px] 2xl:rounded-[7px] 3xl:rounded-[8px] p-4 xl:p-5.5 2xl:p-6.5 3xl:p-8 flex flex-wrap items-center justify-between gap-2 hover:border-white/60 transition-colors group">
      <div className="flex-1">
        <div className="text-[14px] lg:text-[14px] 2xl:text-[17px] 3xl:text-[21px] leading-none font-medium text-white">
          {item.title}
        </div>
      </div>
      <Link
        href={item.file}
        target="_blank"
        className="text-[12px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[17px] leading-none font-normal text-white inline-flex items-center gap-2 hover:text-[#008dd2] px-1 xl:px-2 group/link"
      >
        <Image
          src="/images/icon-pdf.svg"
          alt="pdf"
          width={35}
          height={37}
          className="w-5 2xl:w-6.5 3xl:w-8"
          unoptimized
        />
        <span>View PDF</span>
      </Link>
    </div>
  );
}
function ReportCardSkelton() {
  return (
    <div className="w-full border border-white/10 rounded-[6px] 2xl:rounded-[7px] 3xl:rounded-[8px] p-4 xl:p-5.5 2xl:p-6.5 3xl:p-8 flex items-center justify-between gap-2">
      <div className="flex-1">
        <Skeleton className="h-[14px] 2xl:h-[17px] 3xl:h-[21px] w-[60%] bg-white/10" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 2xl:w-6.5 3xl:w-8 h-5 2xl:h-6.5 3xl:h-8 bg-white/10 rounded-sm" />
        <Skeleton className="h-[12px] 2xl:h-[14px] 3xl:h-[17px] w-20 bg-white/10" />
      </div>
    </div>
  );
}
