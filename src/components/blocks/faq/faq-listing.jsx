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
} from "@/components/ui/accordion";

import { Plus, Minus } from "lucide-react";

export default function FaqListing({ data }) {
  const [activeFilter, setActiveFilter] = useState(
    data?.filterItems?.[0]?.slug || "",
  );

  const [items, setItems] = useState(data?.faqs || []);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFaq = useCallback(async (category) => {
    setIsLoading(true);
    setItems([]);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/api/faq?category=${category}`);
      if (res.ok) {
        const response = await res.json();
        const faqSection = response.data?.faqSection;
        setItems(faqSection?.faqs || []);
      }
    } catch (error) {
      console.error("Error fetching faq:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFilterChange = (slug) => {
    setActiveFilter(slug);
    fetchFaq(slug);
  };

  return (
    <section className="w-full h-auto block bg-[#181818] py-8 xl:py-13 2xl:py-15 3xl:py-[60px_95px] relative z-0">
      <div className="container">
        <div className="flex flex-col items-center mb-6 sm:mb-7.5 xl:mb-15 2xl:mb-19.5 3xl:mb-23">
          <Heading
            as="h2"
            size="h1"
            className="leading-tight text-medium text-white mb-4 sm:mb-5 xl:mb-8 2xl:mb-10.5 3xl:mb-13"
          >
            {parse(data?.title || "")}
          </Heading>
          <div className="w-full sm:w-auto flex">
            <FilterItems
              className="ml-auto"
              items={data?.filterItems}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <svg
              className="animate-spin h-8 w-8 text-[#008dd2]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {items?.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-[4px] xl:rounded-[8px] 2xl:rounded-[11px] 3xl:rounded-[14px] bg-[#212121] p-[10px_15px] sm:p-[15px_20px] xl:p-[20px_25px] 2xl:p-[25px_32px] 3xl:p-[32px_40px] mb-[18px] shadow-none border-none"
              >
                <AccordionTrigger className="[&>svg]:hidden group flex items-center justify-between text-[12px] xl:text-[15px] 2xl:text-[19px] 3xl:text-[24px] py-0 leading-[1.5] md:leading-tight font-normal text-white cursor-pointer">
                  <span>
                    {index + 1}. {faq?.question}
                  </span>
                  <span className="ml-4">
                    <Plus className="h-4  xl:h-6 w-4 xl:w-6 group-data-[state=open]:hidden" />
                    <Minus className="h-6 w-6 hidden group-data-[state=open]:block" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.6] font-normal text-white pb-0 pr-6 xl:pr-8 2xl:pr-10  mt-[8px] xl:mt-[12px] 2xl:mt-[14px] 3xl:mt-[16px]">
                  {parse(faq?.answer || "")}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}

function FilterItems({ items, activeFilter, onFilterChange, className }) {
  return (
    <div className={cn("w-full", className)}>
      {/* Mobile Select */}
      <div className="block md:hidden">
        <select
          value={activeFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full bg-[#212121] text-white text-[12px] px-3 py-2 rounded"
        >
          {items?.map((item) => (
            <option key={item?.id} value={item?.slug}>
              {item?.title}
            </option>
          ))}
        </select>
      </div>

      <div
        className={cn(
          "hidden md:flex flex-wrap gap-2 sm:gap-3 xl:gap-x-4.5 2xl:gap-x-5.5 3xl:gap-x-7 mx-auto",
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
                "text-[10px] sm:text-[12px] xl:text-[14.1px] 2xl:text-[16.8px] 3xl:text-[20.6px] font-medium capitalize text-white p-0 relative z-0 transition-colors",
                isActive ? "text-white" : "hover:text-[#008dd2]",
              )}
            >
              <span className="px-2 xl:px-4 2xl:px-5.5 3xl:px-7 pb-1 xl:pb-2 2xl:pb-3 3xl:pb-4 block">
                {item?.title}
              </span>
              <span
                className={cn(
                  "absolute z-0 bottom-0 inset-x-0 w-full h-[2px] xl:h-[3px] transition-all duration-300",
                  isActive
                    ? "bg-[#008dd2] opacity-100"
                    : "bg-white opacity-100 group-hover:opacity-100",
                )}
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
