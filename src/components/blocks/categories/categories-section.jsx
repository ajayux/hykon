"use client";

import { useState, useCallback } from "react";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesSection({ data, filterData }) {
  const [categoryItems, setCategoryItems] = useState(data?.items ?? []);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = useCallback(async (value) => {
    setIsLoading(true);
    try {
      const url =
        value === "all"
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?use_case=${value}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setCategoryItems(json?.data?.categoriesSection?.items ?? []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="w-full h-auto block bg-[#444142] py-10 xl:py-16 2xl:py-18 3xl:py-22.5">
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 sm:mb-10 xl:mb-12 2xl:mb-18 3xl:mb-20">
          <div className="w-full sm:flex-1">
            <Heading
              as="h2"
              size="h1"
              className="xl:text-[54px] 2xl:text-[58px] 3xl:text-[72px] leading-tight font-medium text-white mb-1 sm:mb-0 lg:max-w-[60%] xl:max-w-[80%]"
            >
              {parse(filterData?.title || "")}
            </Heading>
          </div>

          <div className="w-[120px] sm:w-[140px] xl:w-[170px] 2xl:w-[200px] 3xl:w-[245px] lg:mb-2 ml-auto">
            <Select onValueChange={(value) => fetchCategories(value)}>
              <SelectTrigger className="text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[22px] leading-tight font-normal text-white data-[placeholder]:text-white/80 w-full p-0 border-0 border-b-2 border-b-[#008dd2] focus-visible:border-b-[#008dd2] rounded-none hover:scale-100 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Use Case" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem
                    value="all"
                    className="block text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px]"
                  >
                    All Use Case
                  </SelectItem>
                  {filterData?.useCasees?.map((item) => (
                    <SelectItem
                      key={item?.id}
                      value={item?.slug}
                      className="text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px]"
                    >
                      {item?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-wrap justify-center -mx-1 xl:-mx-1.5 2xl:-mx-[7px] 3xl:-mx-[9px] [&>*]:p-1 xl:[&>*]:p-1.5 2xl:[&>*]:p-[7px] 3xl:[&>*]:p-[9px] transition-opacity duration-300",
            isLoading && "opacity-50 pointer-events-none",
          )}
        >
          {categoryItems?.map((item, index) => (
            <Link
              href={`/category/${item?.slug}`}
              key={index}
              className={cn("w-1/2 min-[468px]:w-1/3 sm:w-1/4 lg:w-1/6")}
            >
              <div className="group w-full h-full bg-[#171f23] rounded-[10px] 2xl:rounded-[13px] 3xl:rounded-[15px] flex flex-col px-2 sm:px-3 xl:px-4 2xl:px-5 3xl:px-6 pt-5 sm:pt-5 xl:pt-7.5 2xl:pt-9 3xl:pt-11 pb-12 sm:pb-15 lg:pb-5 xl:pb-7.5 2xl:pb-9 3xl:pb-11 transition-all duration-300 relative z-0 hover:bg-[#008dd2]">
                <div className="w-full h-auto flex justify-center items-center mb-4 xl:mb-6 2xl:mb-7 3xl:mb-8.5">
                  {item?.iconPath && item?.iconWhitePath && (
                    <div className="w-[40px] 2xl:w-[48px] 3xl:w-[60px] aspect-square relative group-hover:translate-y-[-10px] transition-all duration-300">
                      <Image
                        src={item?.iconPath}
                        alt={item?.name}
                        width={56}
                        height={56}
                        className="w-full aspect-square object-contain opacity-100 group-hover:opacity-0 transition-all duration-300 absolute z-0"
                      />
                      <Image
                        src={item?.iconWhitePath}
                        alt={item?.name}
                        width={56}
                        height={56}
                        className="w-full aspect-square object-contain opacity-0 group-hover:opacity-100 transition-all duration-300 absolute z-1"
                      />
                    </div>
                  )}
                </div>
                <Heading
                  as="div"
                  size="none"
                  className="text-[15px] lg:text-[15px] 2xl:text-[18px] 3xl:text-[22px] leading-tight font-medium text-center text-white group-hover:translate-y-[-20px] 2xl:group-hover:translate-y-[-25px] 3xl:group-hover:translate-y-[-30px] transition-all duration-300 mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5"
                >
                  {item?.name}
                </Heading>
                <Text
                  as="div"
                  size="p1"
                  className="max-sm:text-[12px] xl:leading-[1.4] font-normal text-center line-clamp-3 text-white group-hover:translate-y-[-20px] 2xl:group-hover:translate-y-[-25px] 3xl:group-hover:translate-y-[-30px] transition-all duration-300"
                >
                  {parse(item?.description)}
                </Text>
                <div className="absolute z-1 bottom-[18px] inset-x-0 flex justify-center items-center gap-x-1 2xl:gap-x-2 3xl:gap-x-3 lg:opacity-0 lg:translate-y-full lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300">
                  <span className="w-4 2xl:w-5 3xl:w-6 aspect-square bg-white rounded-full flex items-center justify-center">
                    <Image
                      src={"/images/icon-arrow-right-blue.svg"}
                      alt={"icon-arrow-right-blue"}
                      width={13}
                      height={10}
                      className="w-1/2"
                      unoptimized
                    />
                  </span>
                  <span className="text-[10px] 2xl:text-[11px] 3xl:text-[13px] leading-none font-normal text-white">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
