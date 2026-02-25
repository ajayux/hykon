import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPresence({ data }) {
  if (!data) return null;

  return (
    <div className="w-full">
      {/* Presence Section */}
      <section className="w-full py-16 sm:py-24 bg-[#008dd2] relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0">
              <Heading as="h2" size="h2" className="text-white font-bold mb-4">
                {data.title}
              </Heading>
              <Text
                as="p"
                size="p1"
                className="text-white/80 mb-8 max-w-[500px]"
              >
                With a robust network across the country, Hykon ensures support
                and service are always within reach.
              </Text>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#008dd2]"
                >
                  Explore Our Network
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#008dd2]"
                >
                  Contact Sales Team
                </Button>
              </div>
            </div>

            <div className="w-full lg:w-1/2 px-4">
              <div className="relative aspect-video w-full">
                {/* Normally an interactive map would go here, using a placeholder image for now */}
                <Image
                  src={data.media?.path || "/images/home-footer-loc.svg"}
                  alt="Presence Across India"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background circles */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -ml-64" />
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 sm:py-24 bg-[#f8f9fa]">
        <div className="container">
          <div className="bg-white rounded-[40px] p-8 sm:p-16 lg:p-24 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="text-center lg:text-left">
                <Heading
                  as="h2"
                  size="h2"
                  className="font-bold text-gray-900 mb-4"
                >
                  Have Any Questions?
                </Heading>
                <Text as="p" size="p1" className="text-gray-600 max-w-[500px]">
                  Our expert team is here to help you find the perfect power
                  solution for your needs.
                </Text>
              </div>

              <Button
                size="lg"
                className="bg-[#008dd2] hover:bg-[#007bbd] text-white px-12 py-8 text-xl rounded-full transition-transform hover:scale-105 active:scale-95"
              >
                Get in Touch
              </Button>
            </div>

            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#008dd2]/5 rounded-bl-full -mr-20 -mt-20 group-hover:bg-[#008dd2]/10 transition-colors" />
          </div>
        </div>
      </section>
    </div>
  );
}
