"use client";
import Image from "next/image";
import { useState } from "react";
import Fancybox from "@/components/common/fancybox";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BusinessGallery({ data }) {
  const allItems = data?.items || [];
  const perPage = data?.pagination?.per_page || 3;

  const [visibleCount, setVisibleCount] = useState(perPage);

  const handleToggle = () => {
    if (visibleCount < allItems.length) {
      // Show all
      setVisibleCount(allItems.length);
    } else {
      // Show less
      setVisibleCount(perPage);
    }
  };

  const visibleItems = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;

  return (
    <section className="w-full h-auto block bg-black py-7.5">
      <div className="container">
        <div className="text-[28px] leading-normal font-medium text-white mb-2">
          {data?.title}
        </div>

        <Fancybox
          options={{
            Carousel: {
              infinite: false,
            },
          }}
        >
          <div className="flex flex-wrap -mx-2.5">
            {visibleItems.map((item, index) => (
              <div
                key={item?.id || index}
                className="w-full sm:w-1/2 md:w-1/3 p-2.5 group cursor-pointer lg:cursor-zoom-in"
              >
                <a
                  data-fancybox="gallery"
                  href={item?.path}
                  className="w-full aspect-square rounded-[5px] overflow-hidden relative block"
                >
                  {item?.type === "video" ? (
                    <>
                      <video
                        src={item?.path}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 pointer-events-none"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all duration-300 pointer-events-none">
                        <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play
                            className="text-white fill-white ml-1"
                            size={24}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={item?.path}
                      alt={item?.alt || "Gallery Image"}
                      width={420}
                      height={420}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  )}
                </a>
              </div>
            ))}
          </div>
        </Fancybox>

        {allItems.length > perPage && (
          <div className="flex justify-center my-4 xl:my-6 2xl:my-8 3xl:my-10">
            <Button
              size="lg"
              variant="none"
              className="flex text-white px-0 mx-auto hover:text-[#008dd2] transition-colors"
              onClick={handleToggle}
            >
              {hasMore ? "Load More" : "Show Less"}
              <Image
                src={"/images/icon-news-right.svg"}
                alt={"icon-news-right"}
                width={6}
                height={10}
                className={cn(
                  "w-1 3xl:w-1.5 block mt-0.5 ml-2",
                  !hasMore && "rotate-180",
                )}
                unoptimized
              />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
