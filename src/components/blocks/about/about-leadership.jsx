import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function AboutLeadership({ data }) {
  if (!data) return null;

  return (
    <section className="w-full py-16 sm:py-24 lg:py-32 bg-white">
      <div className="container">
        <div className="flex flex-wrap items-center -mx-4 lg:-mx-12">
          {/* Image Side */}
          <div className="w-full lg:w-5/12 px-4 lg:px-12 mb-10 lg:mb-0">
            <div className="relative group">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl shadow-xl z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  src={data?.media?.path || "/images/home-about-1.jpg"}
                  alt={data?.chairman_name || "Chairman"}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Background Element */}
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-[#f8f9fa] rounded-2xl z-0 border border-gray-100" />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12 px-4 lg:px-12">
            <div className="relative mb-8">
              {/* Quote Mark Decoration */}
              <div className="text-8xl text-gray-100 absolute -top-12 -left-8 font-serif select-none pointer-events-none">
                "
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 italic leading-loose mb-10 relative z-10">
                {data?.description ? parse(data.description) : ""}
              </div>
            </div>

            <div className="border-l-4 border-[#008dd2] pl-6">
              <Heading
                as="h4"
                size="h3"
                className="font-bold text-gray-900 mb-1"
              >
                {data?.chairman_name}
              </Heading>
              <Text
                as="div"
                size="p2"
                className="text-[#008dd2] font-semibold uppercase tracking-wider"
              >
                {data?.designation}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
