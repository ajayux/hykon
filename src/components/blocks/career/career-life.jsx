"use client";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";

export default function CareerLife({ data }) {
  return (
    <section className="w-full h-auto block bg-[#444142] py-6 xl:py-9 2xl:py-10 3xl:py-11.5">
      <div className="container">
        <div className="flex flex-wrap lg:items-center lg:gap-x-[100px] 2xl:gap-x-[110px] 3xl:gap-x-[130px]">
          <div className="w-full lg:flex-1 max-lg:mb-5">
            <Heading
              as="h2"
              size="h1"
              className="text-white mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5 flex items-center gap-3 xl:gap-4.5 2xl:gap-5 3xl:gap-6"
            >
              {parse(data?.title)}
              <Image
                src={data?.iconPath}
                alt={data?.title}
                width={200}
                height={60}
                className="w-[100px] xl:w-[140px] 2xl:w-[160px] 3xl:w-[200px] object-cover"
              />
            </Heading>
            <div className="typography [--text-color:#fff]">
              {parse(data?.description)}
            </div>
          </div>
          <div className="w-full lg:w-[576px] xl:w-[655px] 2xl:w-[720px] 3xl:w-[880px]">
            <div className="aspect-[88/53] flex flex-wrap -mx-1 lg:-mx-2 2xl:-mx-2.5 3xl:-mx-3 [&>div>div]:p-1 lg:[&>div>div]:p-2 2xl:[&>div>div]:p-2.5 3xl:[&>div>div]:p-3">
              <div className="w-4/10 flex flex-col">
                <div className="w-full h-1/2 rounded-[10px] overflow-hidden">
                  <div className="w-full h-full rounded-[10px] overflow-hidden relative">
                    <Image
                      src={data?.mediaOne?.path}
                      alt={data?.mediaOne?.alt || "mediaOne"}
                      fill
                      className="object-cover hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="w-full h-1/2 ">
                  <div className="w-full h-full rounded-[10px] overflow-hidden relative">
                    <Image
                      src={data?.mediaThree?.path}
                      alt={data?.mediaThree?.alt || "mediaThree"}
                      fill
                      className="object-cover hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
              <div className="w-6/10 flex flex-col">
                <div className="w-full flex-1">
                  <div className="w-full h-full rounded-[10px] overflow-hidden relative">
                    <Image
                      src={data?.mediaTwo?.path}
                      alt={data?.mediaTwo?.alt}
                      fill
                      className="object-cover hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="w-full h-auto">
                  <div className="w-full h-full bg-[#252525] rounded-[10px] py-4 xl:py-5 3xl:py-6.5 px-4 xl:px-6.5 2xl:px-7.5 3xl:px-8 hover:bg-[#2d2d2d] transition-all duration-300">
                    <Heading
                      as="div"
                      size="h3"
                      className={cn(
                        "lg:text-[26px] 2xl:text-[32px] 3xl:text-[38px] leading-tight font-bold text-[#008dd2] mb-0.5 3xl:mb-1",
                      )}
                    >
                      <CountUp
                        end={parseInt(data?.statistics?.number)}
                        duration={2.75}
                        separator=""
                        suffix={data?.statistics?.suffix || ""}
                        enableScrollSpy
                      />
                    </Heading>
                    <Text
                      as="div"
                      size="none"
                      className="text-[14px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[24px] leading-none font-normal text-white"
                    >
                      {data?.statistics?.label}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
