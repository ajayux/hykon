"use client";
import { Heading, Text } from "@/components/utils/typography";
import useEmblaCarousel from "embla-carousel-react";

export default function AboutMilestones({ data }) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  if (!data) return null;

  return (
    <section className="w-full py-16 sm:py-24 bg-black text-white overflow-hidden">
      <div className="container">
        <Heading
          as="h2"
          size="h2"
          className="text-center mb-16 font-bold uppercase tracking-widest"
        >
          {data.title}
        </Heading>

        <div ref={emblaRef} className="cursor-grab active:cursor-grabbing">
          <div className="flex -mx-4 lg:-mx-8">
            {data.items?.map((item, index) => (
              <div
                key={item.id}
                className="flex-[0_0_280px] sm:flex-[0_0_320px] lg:flex-[0_0_25%] px-4 lg:px-8 relative pt-12"
              >
                {/* Timeline Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-800" />

                {/* Dot */}
                <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#008dd2] shadow-[0_0_15px_#008dd2]" />

                <div className="text-center group">
                  <Heading
                    as="div"
                    size="h3"
                    className="text-[#caad63] mb-4 font-bold transition-transform duration-300 group-hover:scale-110"
                  >
                    {item.year || "Year"}
                  </Heading>
                  <Text
                    as="p"
                    size="p2"
                    className="text-gray-400 leading-relaxed px-4"
                  >
                    {item.title}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
