import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function AboutManufacturing({ data }) {
  return (
    <section className="w-full h-auto block py-10 xl:py-[55px_75px] 2xl:py-[65px_85px] 3xl:py-[80px_110px] bg-[#181818] overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-x-10 lg:gap-x-[65px] 2xl:gap-x-[74px] 3xl:gap-x-[100px]">
          <div className="w-full sm:w-[320px] lg:w-[420px] xl:w-[500px] 2xl:w-[600px] 3xl:w-[760px] max-lg:mb-5">
            <div className="w-full aspect-76/53 overflow-hidden rounded-[14px] 2xl:rounded-[16px] 3xl:rounded-[20px] shadow-2xl">
              <Image
                src={data?.media?.path || "/images/about-manu-1.jpg"}
                alt={data?.title}
                width={760}
                height={530}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="w-full lg:flex-1">
            <div className="w-full">
              <Heading
                as="h2"
                size="h1"
                className="text-white mb-3 xl:mb-4 2xl:mb-5 3xl:mb-7"
              >
                {data.title}
              </Heading>
              <Text
                as="div"
                size="p1"
                className="leading-normal text-white mb-8 xl:mb-8 2xl:mb-10 3xl:mb-12"
              >
                {parse(data?.description)}
              </Text>
              {data.items?.map((item) => (
                <div
                  key={item.id}
                  className="w-full py-2 sm:py-3 xl:py-4.5 2xl:py-5 3xl:py-6"
                >
                  <div className="group w-full flex flex-wrap gap-2 sm:gap-x-3 lg:gap-x-5 2xl:gap-x-6 3xl:gap-x-8">
                    <div className="w-16 2xl:w-19 3xl:w-24 aspect-square rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[14px] bg-[#2b2b2b] flex justify-center items-center transition-colors duration-300 group-hover:bg-[#3b3b3b]">
                      <Image
                        src={item?.media?.path}
                        alt={item?.media?.alt}
                        width={55}
                        height={55}
                        className="w-1/2 aspect-square object-contain"
                      />
                    </div>
                    <div className="w-full sm:flex-1">
                      <Heading
                        as="div"
                        size="h4"
                        className="xl:text-[16px] 2xl:text-[19px] 3xl:text-[24px] text-white max-lg:mb-1"
                      >
                        {item?.title}
                      </Heading>
                      <Text as="div" size="p1" className="text-white">
                        {parse(
                          item?.description ||
                            "State-of-the-art facilities equipped with modern machinery and automation to ensure precision and quality in every product.",
                        )}
                      </Text>
                    </div>
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
