import React from "react";
import Link from "next/link";
import Image from "next/image";

const NewsCard = ({ item }) => {
  return (
    <div className="group relative flex flex-col h-full bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={item.media.path}
          alt={item.media.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Date Overlay */}
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex flex-col items-center min-w-[60px]">
          <span className="text-xl font-bold text-white leading-none">
            {item.publishDay}
          </span>
          <span className="text-[10px] uppercase tracking-tighter text-white/60 mt-1 whitespace-nowrap">
            {item.publishMonthYear}
          </span>
        </div>

        {/* Hover Accent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-[#00AEEF] transition-colors duration-300">
          {item.title}
        </h3>

        <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
          {item.description ||
            "Learn more about this latest update from Hykon India, powering a smarter tomorrow."}
        </p>

        <div className="mt-auto">
          <Link
            href={`/news/${item.slug}`}
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-white group-hover:text-[#00AEEF] transition-all duration-300"
          >
            Read More
            <svg
              className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
