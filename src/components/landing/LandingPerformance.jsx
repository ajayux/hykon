import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading, Text } from "../utils/typography";

export default function LandingPerformance({ data, isSidebarOpen }) {
  return (
    <section className="w-full h-auto py-[35px_50px] block">
      <div
        className={cn("w-full", isSidebarOpen ? "isContainer" : "container")}
      >
        <div className="w-full h-auto p-[75px_30px_60px_45px] bg-[#212121] rounded-[10px] overflow-hidden">
          <div className="w-auto h-auto mb-[50px]">
            <Heading
              as="h2"
              size="h2"
              className="text-white mb-[10px] 2xl:mb-[15px]"
            >
              {parse(data?.title)}
            </Heading>
            <Text as="p" size="p0" className="text-white">
              {parse(data?.description)}
            </Text>
          </div>
          <div className="w-full h-auto flex flex-wrap">
            <div className="w-[50%]">
              <Heading
                as="h2"
                size="h4"
                className="text-white mb-[10px] 2xl:mb-[30px]"
              >
                Key Highlights
              </Heading>
              <div className="w-full h-auto p-[25px] gap-[35px] bg-[#008DD2]/[.06] flex flex-col">
                {data?.highlight_list?.map((item) => (
                  <div key={item?.id} className="w-full h-auto block">
                    <div className="[--icon-size:70px] w-full h-full flex items-center">
                      <div className="w-[var(--icon-size)] h-auto aspect-square p-[10px] bg-[#008DD2]/[.07] rounded-[10px] overflow-hidden flex items-center justify-center">
                        <Image
                          src={item?.icon?.path}
                          alt={item?.icon?.alt}
                          width={70}
                          height={70}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-[calc(100%-var(--icon-size))] pl-[25px]">
                        <div className="text-[16px] leading-normal font-medium text-white mb-[5px]">
                          {item?.title}
                        </div>
                        <div className="text-[16px] leading-normal font-normal text-white">
                          {item?.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
