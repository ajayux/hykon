import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading, Text } from "../utils/typography";

export default function LandingFeatures({ data, isSidebarOpen }) {
  return (
    <section className="w-full h-auto py-[40px_20px] lg:py-[45px_30px] 2xl:py-[50px_40px] 3xl:py-[70px_50px] block">
      <div
        className={cn("w-full", isSidebarOpen ? "isContainer" : "container")}
      >
        <div className="[--width:100%] lg:[--width:320px] xl:[--width:390px] 2xl:[--width:470px] 3xl:[--width:590px] flex flex-wrap">
          <div className="w-full lg:w-[calc(100%-var(--width))] lg:pr-[20px] xl:pr-[60px] 2xl:pr-[80px] 3xl:pr-[100px] max-sm:mb-[20px] max-lg:mb-[30px]">
            <div className="w-full h-auto">
              <Heading
                as="h2"
                size="h2"
                className="text-white mb-[10px] 2xl:mb-[15px]"
              >
                {parse(data?.title)}
              </Heading>
              <div className="typography 3xl:[&_p]:text-[17px] mb-[20px] sm:mb-[30px] xl:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px] [--text-color:#d1d1d1]">
                {parse(data?.description)}
              </div>
              <Text
                as="div"
                size="p0"
                className="text-white mb-[10px] xl:mb-[15px] 2xl:mb-[25px]"
              >
                <b>{parse(data?.feature_title)}</b>
              </Text>
              <div className="typography [&_li]:not-last:mb-[10px] xl:[&_li]:not-last:mb-[15px] 3xl:[&_li]:not-last:mb-[20px] [&_li]:list-image-[url('/images/landing-li-check.svg')] [--text-color:#d1d1d1]">
                {parse(data?.feature_description)}
              </div>
            </div>
          </div>
          <div className="w-[var(--width)]">
            <div className="w-full h-[350px] lg:h-full rounded-[5px] 2xl:rounded-[10px] overflow-hidden block">
              <Image
                src={data?.media?.path}
                alt={data?.media?.alt}
                width="590"
                height="520"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
