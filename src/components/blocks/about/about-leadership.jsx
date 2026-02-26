import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function AboutLeadership({ data }) {
  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px] lg:py-[165px_75px] 2xl:py-[200px_90px] 3xl:py-[250px_110px] bg-[#181818] overflow-hidden">
      <div className="container xl:max-w-[768px] 2xl:max-w-[920px] 3xl:max-w-[1140px] xl:translate-x-[8%]">
        <div className="flex flex-wrap items-center justify-between gap-x-10 lg:gap-x-[65px] 2xl:gap-x-[74px] 3xl:gap-x-[100px]">
          <div className="w-[140px] sm:w-[180px] lg:w-[200px] xl:w-[240px] 2xl:w-[288px] 3xl:w-[360px] relative z-0">
            <div className="w-full aspect-36/40 overflow-hidden rounded-[12px] 2xl:rounded-[14px] 3xl:rounded-[18px] shadow-2xl">
              <Image
                src={data?.media?.path}
                alt={data?.chairman_name}
                width={360}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <Image
              src={"/images/home-about-bg.png"}
              alt={"home-about-bg"}
              width={576}
              height={576}
              className="min-w-[240px] xl:min-w-[305px] 2xl:min-w-[365px] 3xl:min-w-[457px] aspect-square absolute -z-1 bottom-[30%] right-[25%]"
            />
          </div>

          <div className="w-full lg:flex-1">
            <div className="w-full">
              <Heading
                as="div"
                size="h4"
                className="text-white mb-8 xl:mb-13 2xl:mb-16 3xl:mb-18"
              >
                {parse(data?.description)}
              </Heading>
              <div className="w-full xl:max-w-6/10 flex gap-x-3 xl:gap-x-4 2xl:gap-x-5 3xl:gap-x-5.5">
                <div className="flex-1 h-[1px] bg-[#008dd2] my-2 xl:my-3 2xl:my-4 3xl:my-4.5" />
                <div className="w-full max-w-9/12 h-auto">
                  <Heading
                    as="div"
                    size="h4"
                    className="uppercase text-white mb-0.5 2xl:mb-1"
                  >
                    {data?.chairman_name}
                  </Heading>
                  <Text as="div" size="p1" className="text-white">
                    {data?.designation}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
