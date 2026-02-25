import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function AboutWhyHykon({ data }) {
  if (!data) return null;

  return (
    <section className="w-full py-16 sm:py-24 lg:py-32 bg-[#181818] text-white">
      <div className="container">
        <div className="flex flex-wrap -mx-4 lg:-mx-8 items-start">
          <div className="w-full lg:w-4/12 px-4 lg:px-8 mb-12 lg:mb-0">
            <Heading
              as="h2"
              size="h1"
              className="font-bold mb-6 lg:mb-10 leading-tight"
            >
              {data.title}
            </Heading>
            <div className="prose prose-invert prose-lg opacity-70">
              {data.description ? parse(data.description) : ""}
            </div>
          </div>

          <div className="w-full lg:w-8/12 px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {data.items?.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#222222] p-8 lg:p-10 rounded-2xl border border-gray-800 transition-all duration-300 hover:bg-[#282828] hover:border-[#008dd2]/30"
                >
                  <div className="w-16 h-16 mb-8 flex items-center justify-center bg-[#2d2d2d] rounded-xl group-hover:bg-[#008dd2]/10 transition-colors">
                    <Image
                      src={
                        item.media?.path || "/images/product-cat-white-1.png"
                      }
                      alt={item.title}
                      width={48}
                      height={48}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <Heading
                    as="h3"
                    size="h4"
                    className="font-bold mb-1 group-hover:text-[#008dd2] transition-colors"
                  >
                    {item.title}
                  </Heading>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
