import Image from "next/image";
import { cn } from "@/lib/utils";
import CountUp from "react-countup";
import { Heading, Text } from "../../utils/typography";
import parse from "html-react-parser"
export default function LandingHomes({ data, isSidebarOpen }) {
  return (
    <section className="w-full h-auto py-[25px] sm:py-[35px] 2xl:py-[40px] bg-[#008DD2] block">
      <div
        className={cn("w-full", isSidebarOpen ? "isContainer" : "container")}
      >
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-[35%] max-xl:mb-[30px]">
            <Heading
              as="div"
              size="h2"
              className={cn(
                "font-semibold text-white mb-[10px] 2xl:mb-[15px] 3xl:mb-[20px]",
              )}
            >
              <CountUp
                end={parseInt(data?.countNumber)}
                duration={2.75}
                separator=""
                suffix={data?.suffix || ""}
                enableScrollSpy
              />
              <span className="font-light block">{data?.title}</span>
            </Heading>
            <Text as="div" size="p1" className="font-light text-white">
              {parse(data?.description??"")}
            </Text>
          </div>
          <div className="w-full xl:w-[65%] xl:pl-[20px]">
            <div className="flex flex-wrap relative">
              {data?.featureList?.length > 1 && (
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" />
              )}
              {data?.featureList?.map((item, index) => (
                <div key={item?.id} className="contents">
                  {index > 0 && index % 2 === 0 && (
                    <div className="w-full h-[1px] bg-linear-to-r from-transparent via-white/70 to-transparent" />
                  )}
                  <div className="w-1/2 h-auto p-[15px] sm:p-[30px] 2xl:p-[40px_50px] 3xl:p-[45px_60px] relative z-0">
                    <div className="[--icon-size:35px] sm:[--icon-size:40px] 2xl:[--icon-size:50px] 3xl:[--icon-size:60px] w-full h-full flex flex-col sm:flex-row items-center">
                      <div className="w-[var(--icon-size)] h-auto max-sm:mb-[10px] aspect-square overflow-hidden flex items-center justify-center">
                        <Image
                          src={item?.iconPath}
                          alt={item?.title}
                          width={60}
                          height={60}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-full sm:w-[calc(100%-var(--icon-size))] sm:pl-[15px] 3xl:pl-[20px] max-sm:text-center">
                        <Text
                          as="div"
                          size="p1"
                          className="font-medium text-white"
                        >
                          {item?.title}
                        </Text>
                      </div>
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
