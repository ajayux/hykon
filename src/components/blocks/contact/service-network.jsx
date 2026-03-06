"use client";

import { useState } from "react";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ServiceNetwork({ data }) {
  const [activeFilter, setActiveFilter] = useState(
    data?.locationFilter?.[0]?.slug || "kerala",
  );

  return (
    <section className="w-full h-auto block py-10 xl:py-11 2xl:py-13 3xl:py-15 bg-[#181818]">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="text-center font-medium text-white mb-4 xl:mb-6 2xl:mb-8 3xl:mb-10"
        >
          {data?.title}
        </Heading>

        <div className="flex flex-wrap justify-center gap-2 xl:gap-3 2xl:gap-4 3xl:gap-5 mb-4 sm:mb-6 lg:mb-10 2xl:mb-12 3xl:mb-15">
          {data?.locationFilter?.map((item) => (
            <button
              key={item?.id}
              onClick={() => setActiveFilter(item?.slug)}
              className={cn(
                "text-[14px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[17px] leading-tight font-normal text-white px-3 xl:px-5 2xl:px-6 3xl:px-7 py-1 xl:py-1.5 2xl:py-2 3xl:py-2.5 rounded-full border border-[#d0d0d0] transition-all duration-300",
                activeFilter === item?.slug
                  ? "bg-[#008dd2]"
                  : "bg-[#181818] hover:border-[#008dd2]",
              )}
            >
              {item?.title}
            </button>
          ))}
        </div>

        <hr className="border-dashed border-white/20 mb-4 lg:mb-6 2xl:mb-8 3xl:mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 2xl:gap-3.5 3xl:gap-4">
          {data?.items?.map((item) => (
            <div
              key={item.id}
              className="w-full bg-[#212121] rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px] transition-all hover:bg-[#27333a]"
            >
              <div className="px-4 xl:px-5 2xl:px-6 3xl:px-8 py-2 xl:py-2 2xl:py-3 3xl:py-4 border-b border-white/10">
                <Text as="div" size="p0" className="text-white mt-1">
                  {item.title}
                </Text>
              </div>
              <div className="px-4 xl:px-5 2xl:px-6 3xl:px-8 py-2 xl:py-2 2xl:py-3 3xl:py-4">
                <Text
                  as="div"
                  size="p1"
                  className="text-white flex gap-3 xl:gap-4 my-2 xl:my-2.5 2xl:my-3 3xl:my-3.5 hover:text-[#008dd2]"
                >
                  <Image
                    src="/images/icon-contact-call.svg"
                    alt={item.title || "address"}
                    width={20}
                    height={20}
                    className="w-3 2xl:w-3.5 3xl:w-4 aspect-square object-contain"
                  />
                  <a href={`tel:${item?.phone}`}>{item?.phone}</a>
                </Text>

                <Text
                  as="div"
                  size="p1"
                  className="text-white flex gap-3 xl:gap-4 my-2 xl:my-2.5 2xl:my-3 3xl:my-3.5 hover:text-[#008dd2]"
                >
                  <Image
                    src="/images/icon-contact-mail.svg"
                    alt={item.title || "address"}
                    width={20}
                    height={20}
                    className="w-3 2xl:w-4 3xl:w-5 aspect-square object-contain"
                  />
                  <a href={`mailto:${item?.email}`}>{item?.email}</a>
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
