"use client";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesGrid({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-3 lg:gap-4 2xl:gap-5 3xl:gap-6">
      {items?.map((item, index) => (
        <CategoryCard key={item.id} item={item} active={index === 1} />
      ))}
    </div>
  );
}

function CategoryCard({ item, active }) {
  return (
    <div
      className={cn(
        "group w-full h-full rounded-[12px] 2xl:rounded-[16px] 3xl:rounded-[20px] flex flex-col p-4 sm:p-6 2xl:p-8 3xl:p-10 transition-all duration-300 relative overflow-hidden",
        active ? "bg-[#008dd2]" : "bg-[#16242A] hover:bg-[#008dd2]",
      )}
    >
      <div className="w-full flex justify-center items-center mb-6 lg:mb-8 2xl:mb-10 3xl:mb-12">
        <div className="w-[40px] lg:w-[48px] 2xl:w-[56px] 3xl:w-[64px] aspect-square relative transition-transform duration-300 group-hover:-translate-y-2">
          {/* Placeholder icons since API doesn't provide them yet, but following the structure of HomeCategories */}
          <Image
            src={item?.iconWhitePath || "/images/icon-solar-white.svg"}
            alt={item.title}
            width={60}
            height={60}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <Heading
          as="h4"
          size="h4"
          className="text-white text-center mb-2 lg:mb-3 2xl:mb-4 transition-transform duration-300 group-hover:-translate-y-2"
        >
          {item.title}
        </Heading>

        {active && (
          <Text
            size="p2"
            className="text-white/80 text-center mb-4 lg:mb-6 line-clamp-2 transition-transform duration-300 group-hover:-translate-y-2"
          >
            Sustainable lighting solutions powered by solar energy
          </Text>
        )}
      </div>

      <div
        className={cn(
          "flex justify-center items-center gap-2 transition-all duration-300",
          active
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0",
        )}
      >
        <Link
          href={`/products/${item.slug}`}
          className="flex items-center gap-2 group/btn"
        >
          <div className="w-5 2xl:w-6 3xl:w-8 aspect-square bg-white rounded-full flex items-center justify-center">
            <Image
              src="/images/icon-arrow-right-blue.svg"
              alt="arrow"
              width={16}
              height={12}
              className="w-1/2"
            />
          </div>
          <span className="text-[10px] 2xl:text-[12px] 3xl:text-[14px] text-white font-medium uppercase tracking-wide">
            View Details
          </span>
        </Link>
      </div>
    </div>
  );
}
