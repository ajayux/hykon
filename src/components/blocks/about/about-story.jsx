"use client";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";

export default function AboutStory({ data }) {
  return (
    <section className="w-full py-12 sm:py-20 lg:py-[58px] 2xl:py-[70px] 3xl:py-[90px] bg-[#181818]">
      <div className="container">
        <div className="flex flex-wrap items-center gap-x-10 lg:gap-x-[65px] 2xl:gap-x-[74px] 3xl:gap-x-[94px]">
          <div className="w-full lg:w-[420px] xl:w-[495px] 2xl:w-[595px] 3xl:w-[740px] aspect-74/76 overflow-hidden rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[16px]">
            <Image
              src={data?.media?.path}
              alt={data?.media?.alt}
              width={750}
              height={760}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>

          <div className="w-full lg:flex-1">
            <Heading
              as="h2"
              size="h1"
              className="text-white mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6"
            >
              {parse(data?.title)}
            </Heading>

            <Text
              as="div"
              size="p1"
              className="text-white mb-4 xl:mb-7 2xl:mb-8.5 3xl:mb-10"
            >
              {parse(data?.description)}
            </Text>

            <div className="flex flex-wrap -mx-5">
              {data?.statistics?.map((item) => (
                <div key={item?.id} className="py-2 3xl:py-2.5 px-5">
                  <div className="w-full xl:min-w-[220px] 2xl:min-w-[260px] 3xl:min-w-[326px] bg-[#252525] rounded-[10px] py-4 xl:py-5 3xl:py-6.5 px-4 xl:px-6.5 2xl:px-7.5 3xl:px-8 hover:bg-[#2d2d2d] transition-all duration-300">
                    <Heading
                      as="div"
                      size="h3"
                      className={cn(
                        "lg:text-[31px] 2xl:text-[37px] 3xl:text-[46px] font-bold text-[#008dd2] mb-1 3xl:mb-1.5",
                      )}
                    >
                      <CountUp
                        end={parseInt(item?.number)}
                        duration={2.75}
                        separator=""
                        suffix={item?.suffix || ""}
                        enableScrollSpy
                      />
                    </Heading>
                    <Text
                      as="div"
                      size="none"
                      className="text-[14px] lg:text-[20px] 2xl:text-[24px] 3xl:text-[30px] leading-none font-light text-white"
                    >
                      {item?.label}
                    </Text>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics Grid */}
            {/* <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:gap-8">
              {data?.statistics?.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-[#f8f9fa] rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-md"
                >
                  <Heading
                    as="div"
                    size="h3"
                    className="font-bold text-[#008dd2] mb-1"
                  >
                    <CountUp
                      end={parseInt(stat.number)}
                      duration={2.5}
                      suffix={stat.suffix || ""}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </Heading>
                  <Text
                    as="div"
                    size="p2"
                    className="text-gray-500 font-medium"
                  >
                    {stat.label}
                  </Text>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
