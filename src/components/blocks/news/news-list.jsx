"use client";
import React from "react";
import NewsFilters from "./news-filters";
import NewsCard from "./news-card";

const NewsList = ({ initialData, activeCategory }) => {
  if (!initialData) {
    return (
      <div className="text-center py-20">
        <p className="text-white/60">No news found.</p>
      </div>
    );
  }

  const { title, description, filters, items, pagination } = initialData;

  return (
    <div className="news-list-container">
      {/* Header with Background "NEWS" Text */}
      <div className="relative mb-16 pt-10">
        <div className="absolute top-0 left-0 text-[120px] lg:text-[180px] font-black leading-none text-white/[0.03] select-none pointer-events-none uppercase">
          NEWS
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 uppercase">
              {title}
            </h2>
            <p className="text-white/60 text-lg">{description}</p>
          </div>

          <div className="flex-shrink-0">
            <NewsFilters filters={filters} activeCategory={activeCategory} />
          </div>
        </div>
      </div>

      {/* Grid */}
      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
          <p className="text-white/60 text-xl font-medium uppercase tracking-widest">
            No news available in this category
          </p>
        </div>
      )}

      {/* Pagination (Simplified for now) */}
      {pagination && pagination.last_page > 1 && (
        <div className="mt-16 flex justify-center">
          <button className="px-10 py-4 bg-transparent border border-white/20 text-white rounded-full uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
