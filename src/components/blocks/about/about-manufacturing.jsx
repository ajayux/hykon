import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function AboutManufacturing({ data }) {
  if (!data) return null;

  return (
    <section className="w-full py-16 sm:py-24 lg:py-32 bg-white">
      <div className="container">
        <div className="flex flex-wrap items-center -mx-4 lg:-mx-12">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 px-4 lg:px-12 mb-10 lg:mb-0">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src={
                  data.items?.[0]?.media?.path || "/images/address-loc-1.jpg"
                }
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 px-4 lg:px-12">
            <Heading
              as="h2"
              size="h2"
              className="font-bold mb-6 lg:mb-8 text-black"
            >
              {data.title}
            </Heading>
            <div className="prose prose-lg text-gray-600 mb-10">
              {data.description ? parse(data.description) : ""}
            </div>

            <div className="space-y-6">
              {data.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-[#f8f9fa] transition-colors"
                >
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#008dd2]/10 rounded-lg">
                    <Image
                      src={
                        item.media?.path || "/images/product-cat-white-5.png"
                      }
                      alt={item.title}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <Heading
                      as="h4"
                      size="p1"
                      className="font-bold text-gray-900 mb-1"
                    >
                      {item.title}
                    </Heading>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
