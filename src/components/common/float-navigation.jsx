import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const local_data = [
  {
    id: 1,
    icon: "/images/floatIcon-call.svg",
    link: "tel:+919020121121",
    label: "Call Us",
  },
  {
    id: 2,
    icon: "/images/floatIcon-mail.svg",
    link: "mailto:into@company.com",
    label: "Email Us",
  },
];

export default function FloatNavigation({ data = local_data }) {
  return (
    <div
      className={cn(
        "fixed z-1 right-0 bottom-0 sm:bottom-10 xl:bottom-15 2xl:bottom-20 flex flex-row sm:flex-col max-sm:w-full bg-black sm:bg-white shadow-lg shadow-white/20 overflow-hidden",
        "sm:p-1 xl:p-1.5 2xl:p-2 rounded-t-[6px] sm:rounded-t-none sm:rounded-l-[6px] 2xl:rounded-l-[8px]",
      )}
    >
      {data.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-1/2 sm:w-6 2xl:w-7 3xl:w-8.5 max-sm:h-11 sm:aspect-3/4 rounded-none bg-black sm:bg-white flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#008dd2]/10 translate-y-0 sm:hover:translate-x-[1px] gap-2",
            "border-r sm:border-r-0 sm:border-b border-[#212121] sm:border-[#d9d9d9] last:border-0",
          )}
        >
          <Image
            src={item.icon}
            alt={item.icon}
            width={50}
            height={50}
            className="w-4.5 sm:w-2/4"
          />
          <span className="text-[12px] leading-tight truncate text-white uppercase sm:hidden">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
}
