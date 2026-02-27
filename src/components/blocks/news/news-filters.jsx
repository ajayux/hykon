"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NewsFilters = ({ filters, activeCategory }) => {
  const router = useRouter();

  const handleFilterClick = (slug) => {
    router.push(`/news?category=${slug}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-6 mb-12 border-b border-white/10 pb-4">
      {filters?.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.slug)}
          className={`text-sm uppercase tracking-widest transition-all duration-300 relative pb-4 -mb-4 ${
            activeCategory === filter.slug
              ? "text-white font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#00AEEF]"
              : "text-white/60 hover:text-white"
          }`}
        >
          {filter.title}
        </button>
      ))}
    </div>
  );
};

export default NewsFilters;
