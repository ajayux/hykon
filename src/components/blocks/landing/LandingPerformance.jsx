import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading, Text } from "../../utils/typography";

export default function LandingPerformance({ data, isSidebarOpen }) {
  return (
    <section className="w-full h-auto py-[20px] sm:py-[20px_25px] lg:py-[25px_30px] 2xl:py-[30px_40px] 3xl:py-[35px_50px] block">
      <div
        className={cn("w-full", isSidebarOpen ? "isContainer" : "container")}
      >
        <div className="w-full h-auto p-[30px_15px_20px_15px] sm:p-[40px_20px_30px_20px] lg:p-[50px_10px_40px_30px] 2xl:p-[60px_20px_50px_35px] 3xl:p-[75px_30px_60px_45px] bg-[#212121] rounded-[10px] overflow-hidden">
          <div className="w-auto h-auto mb-[20px] sm:mb-[30px] 2xl:mb-[40px] 3xl:mb-[50px]">
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
          <div className="w-full h-auto xl:-mx-[5px] 3xl:-mx-[7px] xl:[&>*]:px-[5px] 2xl:[&>*]:px-[7px] [&>*]:flex [&>*]:flex-col flex flex-wrap">
            <div className="w-full xl:w-[45%] max-xl:mb-[30px]">
              <div className="text-[14px] lg:text-[15px]  2xl:text-[18px] 3xl:text-[22px] leading-normal font-medium text-white mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[35px]">
                Key Highlights
              </div>
              <div className="w-full p-[15px] 2xl:p-[20px] 3xl:p-[25px] gap-[20px] xl:gap-[25px] 2xl:gap-[30px] 3xl:gap-[35px] bg-[#008DD2]/[.06] rounded-[7px] 2xl:rounded-[10px] overflow-hidden flex flex-1 flex-col">
                {data?.highlight_list?.map((item) => (
                  <div key={item?.id} className="w-full h-auto block">
                    <div className="[--icon-size:50px] 2xl:[--icon-size:55px] 3xl:[--icon-size:70px] w-full h-full flex items-center">
                      <div className="w-[var(--icon-size)] h-auto aspect-square p-[8px] 2xl:p-[10px] bg-[#008DD2]/[.07] rounded-[7px] 2xl:rounded-[10px] overflow-hidden flex items-center justify-center">
                        <Image
                          src={item?.iconPath}
                          alt={item?.title}
                          width={70}
                          height={70}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-[calc(100%-var(--icon-size))] pl-[15px] 2xl:pl-[25px]">
                        <div className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-normal font-medium text-white mb-[2px] 2xl:mb-[5px]">
                          {item?.title}
                        </div>
                        <div className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-normal font-normal text-white/80">
                          {item?.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full xl:w-[55%]">
              <div className="text-[14px] lg:text-[15px]  2xl:text-[18px] 3xl:text-[22px] leading-normal font-medium text-white mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[35px]">
                Technical Specifications
              </div>
              <div className="w-full rounded-[7px] 2xl:rounded-[10px] overflow-hidden flex-1">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="[&_th]:text-[12px] 2xl:[&_th]:text-[14px] 3xl:[&_th]:text-[16px] [&_th]:leading-normal [&_th]:font-medium [&_th]:text-left [&_th]:text-white [&_th]:p-[10px_20px] sm:[&_th]:p-[10px_35px] 2xl:[&_th]:p-[10px_40px] 3xl:[&_th]:p-[15px_50px] w-full h-auto bg-[#008DD2]">
                      <th>Specifications</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.specifications_list?.map((item) => (
                      <tr
                        key={item?.id}
                        className={cn(
                          "[&_td]:text-[12px] 2xl:[&_td]:text-[13px] 3xl:[&_td]:text-[15px] [&_td]:leading-normal [&_td]:font-normal [&_td]:text-white/80 [&_td]:p-[12px_10px_12px_20px] sm:[&_td]:p-[12px_10px_12px_35px] 2xl:[&_td]:p-[13px_10px_13px_40px] 3xl:[&_td]:p-[15px_10px_15px_50px] bg-[#008DD2]/[.06] not-last:border-b border-white/[.06] [&_td]:not-last:border-r [&_td]:border-white/[.06]",
                        )}
                      >
                        <td>{item?.label}</td>
                        <td>{item?.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
