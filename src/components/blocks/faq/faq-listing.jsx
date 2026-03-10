"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Plus, Minus } from "lucide-react";

export default function FaqListing({ data }) {
  const [activeFilter, setActiveFilter] = useState(
    data?.filterItems?.[0]?.slug || ""
  );

  const fetchNews = useCallback(async (category, page, isAppend = false) => {
    setIsLoading(true);
    if (!isAppend) setItems([]);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(
        `${baseUrl}/api/faq?category=${category}&page=${page}`,
      );
      if (res.ok) {
        const response = await res.json();
        const result = response.data?.faqSection || response.data;
        const newData = result;
        if (isAppend) {
          setItems((prev) => [...prev, ...(newData.items || [])]);
        } else {
          setItems(faqData.items || []);
        }
        setPagination(faqData.pagination || {});
      }
    } catch (error) {
      console.error("Error fetching faq:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFilterChange = (slug) => {
    setActiveFilter(slug);
    fetchFaq(slug, 1, false);
  };

  return (
    <section className="w-full h-auto block bg-[#181818] py-8 xl:py-13 2xl:py-15 3xl:py-20 relative z-0">

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
              items={data?.filterItems}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

        </div>
        <Accordion type="single" collapsible className="w-full">
          {data?.faqs?.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="rounded-[4px] xl:rounded-[8px] 2xl:rounded-[11px] 3xl:rounded-[14px] bg-[#212121] p-[10px_15px] sm:p-[15px_20px] xl:p-[20px_25px] 2xl:p-[25px_32px] 3xl:p-[32px_40px] mb-[18px]">
              <AccordionTrigger className="[&>svg]:hidden group flex items-center justify-between text-[12px] xl:text-[15px] 2xl:text-[19px] 3xl:text-[24px] leading-tight font-normal text-white cursor-pointer">
                <span>{index + 1}. {faq?.question}</span>
                <span className="ml-4">
                  <Plus className="h-4  xl:h-6 w-4 xl:w-6 group-data-[state=open]:hidden" />
                  <Minus className="h-6 w-6 hidden group-data-[state=open]:block" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.6] font-normal text-white  mt-[8px] xl:mt-[12px] 2xl:mt-[14px] 3xl:mt-[16px]">
                {parse(faq?.answer || "")}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
              "capitalize text-white p-0 relative z-0 transition-colors",
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



