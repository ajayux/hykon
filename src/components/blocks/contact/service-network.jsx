"use client";

import { useState, Suspense } from "react";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { apiClient } from "@/lib/api/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceNetwork({ data }) {
  const [activeFilter, setActiveFilter] = useState(
    data?.locationFilter?.[0]?.slug || "kerala",
  );
  const [items, setItems] = useState(data?.items || []);
  const [loading, setLoading] = useState(false);

  async function handleTabChange(slug) {
    setActiveFilter(slug);
    setLoading(true);
    try {
      const res = await apiClient(
        `/get-service-by-category?categorySlug=${slug}`,
      );
      setItems(res?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full h-auto block py-10 xl:py-11 2xl:py-13 3xl:py-15 bg-[#444142]">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="text-center font-medium text-white mb-4 xl:mb-7 2xl:mb-9 3xl:mb-11"
        >
          {data?.title}
        </Heading>

        <div className="flex flex-wrap justify-center gap-2 xl:gap-3 2xl:gap-4 3xl:gap-5 mb-4 sm:mb-6 lg:mb-10 2xl:mb-12 3xl:mb-15">
          {data?.locationFilter?.map((item) => (
            <button
              key={item?.id}
              onClick={() => handleTabChange(item?.slug)}
              className={cn(
                "text-[12px] lg:text-[11.5px] 2xl:text-[13.2px] 3xl:text-[16px] leading-tight font-normal px-3 xl:px-5 2xl:px-6 3xl:px-7 py-1 xl:py-1.5 2xl:py-2 3xl:py-2.5 rounded-full border border-[#d0d0d0] transition-all duration-300",
                activeFilter === item?.slug
                  ? "text-white bg-[#008dd2]"
                  : "text-white/80 bg-[#444142] hover:border-[#008dd2]",
              )}
            >
              {item?.title}
            </button>
          ))}
        </div>

        <hr className="border-dashed border-white/20 mb-4 lg:mb-6 2xl:mb-8 3xl:mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 2xl:gap-3.5 3xl:gap-4">
          <Suspense
            fallback={Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <ServiceSkeleton />
              </div>
            ))}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <ServiceSkeleton />
                  </div>
                ))
              : items.map((item) => (
                  <div
                    key={item.id}
                    className="w-full bg-[#212121] rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px] transition-all hover:bg-[#27333a]"
                  >
                    <div className="px-4 xl:px-5 2xl:px-6 3xl:px-8 py-2 xl:py-2 2xl:py-3 3xl:py-4 border-b border-white/10">
                      <div className="text-[15px] lg:text-[14px] 2xl:text-[17.6px] 3xl:text-[21.5px] leading-normal font-medium tracking-[0.020rem] text-white mt-1">
                        {item.title}
                      </div>
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
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function ServiceSkeleton() {
  return (
    <div className="w-full bg-[#212121] rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px]">
      <div className="px-4 xl:px-5 2xl:px-6 3xl:px-8 py-2 xl:py-2 2xl:py-3 3xl:py-4 border-b border-white/10">
        <Skeleton className="h-4 w-3/4 mt-1 bg-white/10" />
      </div>
      <div className="px-4 xl:px-5 2xl:px-6 3xl:px-8 py-2 xl:py-2 2xl:py-3 3xl:py-4">
        <div className="flex gap-3 xl:gap-4 my-2 xl:my-2.5 2xl:my-3 3xl:my-3.5">
          <Skeleton className="w-3 2xl:w-3.5 3xl:w-4 aspect-square shrink-0 bg-white/10" />
          <Skeleton className="h-3 w-2/3 bg-white/10" />
        </div>
        <div className="flex gap-3 xl:gap-4 my-2 xl:my-2.5 2xl:my-3 3xl:my-3.5">
          <Skeleton className="w-3 2xl:w-4 3xl:w-5 aspect-square shrink-0 bg-white/10" />
          <Skeleton className="h-3 w-3/4 bg-white/10" />
        </div>
      </div>
    </div>
  );
}
