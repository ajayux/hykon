"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
export default function HomePromotions({ data }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    // [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );
  return (
    <section className="w-full h-auto block bg-black py-10 xl:py-15 2xl:py-17.5 3xl:py-20 relative z-0">
      <div className="container">
        <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
          <div className="flex touch-pan-y touch-pinch-zoom">
            {data?.map((item) => (
              <div
                key={item?.id}
                className={cn("flex-[0_0_100%] min-w-0 select-none")}
              >
                <div className="w-full h-auto aspect-1720/720 overflow-hidden rounded-[30px] relative z-0">
                  <Image
                    src={item?.media?.path}
                    alt={item?.media?.alt}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
