"use client";
import { Heading } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoriesGrid from "./categories-grid";

export default function CategoriesSection({ filterData, categoriesData }) {
  return (
    <section className="w-full h-auto block bg-black py-8 lg:py-12 2xl:py-16 3xl:py-20">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between mb-8 lg:mb-12 2xl:mb-16 3xl:mb-20">
          <div className="w-full lg:w-2/3">
            <Heading
              as="h2"
              size="h2"
              className="text-white font-medium max-w-[800px]"
            >
              {filterData?.title}
            </Heading>
          </div>
          <div className="w-full lg:w-auto mt-6 lg:mt-0 flex items-center gap-4">
            <div className="relative group min-w-[180px] lg:min-w-[220px]">
              <Select defaultValue="">
                <SelectTrigger className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/30 rounded-none text-white focus:ring-0 focus:ring-offset-0 px-0 h-10 2xl:h-12 3xl:h-14 text-[14px] 2xl:text-[16px] 3xl:text-[20px]">
                  <SelectValue placeholder="Use-Case." />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                  {filterData?.useCasees?.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.slug}
                      className="focus:bg-[#008dd2] focus:text-white cursor-pointer"
                    >
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <CategoriesGrid items={categoriesData?.items} />
      </div>
    </section>
  );
}
