"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

export default function Landing({ data }) {
  const items = data?.items || [];
  const [loading, setLoading] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })]
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0, true);
    }
  }, [emblaApi, items]);

  return (
    <section className="w-full bg-[#181818] py-10">
        <div className="w-[75%]">
            {items.length > 0 ? (
            <div ref={emblaRef} className="overflow-hidden">
                <div className="w-full">
                {items.map((item) => (
                    <div
                    key={item?.id}
                    className="flex-[0_0_100%]"
                    >
                    {
                        <div className="w-full h-[255px] sm:h-[300px] xl:h-[355px] 2xl:h-[458px] 3xl:h-[568px] overflow-hidden">
                            <Image
                            src={item?.image}
                            alt={item.title}
                            width={1600}
                            height={568}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    }
                    </div>
                ))}
                </div>
            </div>
            ) : (
            <p className="text-white/50 text-center py-20">
                {loading ? "Loading banner..." : "No banners available."}
            </p>
            )}
        </div>
        <div className="w-[25%]">

        </div>
    </section>
  );
}