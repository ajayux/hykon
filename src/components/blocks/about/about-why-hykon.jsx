import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";

export default function AboutWhyHykon({ data }) {
  return (
    <section className="w-full h-auto block bg-[#444142] py-12 xl:py-[70px_55px] 2xl:py-[85px_65px] 3xl:py-[110px_80px] relative z-0">
      <div className="container lg:px-5 xl:px-6 2xl:px-8 3xl:px-10">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3 max-lg:mb-5">
            <div className="w-full max-w-8/10">
              <div className="w-full pr-2 pb-2">
                <Heading
                  as="h2"
                  size="h1"
                  className="text-white mb-4 xl:mb-6 2xl:mb-9 3xl:mb-10"
                >
                  {data.title}
                </Heading>
                <Text as="div" size="p0" className="text-white">
                  {parse(data?.description)}
                </Text>
              </div>
            </div>
          </div>

          {data.items?.map((item) => (
            <div key={item.id} className="w-1/2 sm:w-1/3 lg:w-1/3">
              <div
                className={cn(
                  "w-full h-full border-1 border-white/25 flex flex-wrap flex-col justify-between p-4 sm:p-6 xl:p-8 2xl:p-10 3xl:p-11.5",
                  "transition-all duration-300 hover:border-white/50 hover:bg-[#3a3a3a]",
                  item.id === 1 && "lg:rounded-tl-[20px]",
                  item.id === 2 && "lg:rounded-tr-[20px]",
                  item.id === 3 && "lg:rounded-tl-[20px]",
                  item.id === data.items?.length - 2 && "lg:rounded-bl-[20px]",
                  item.id === data.items?.length && "lg:rounded-br-[20px]",
                  item.id % 2 === 0 ? "lg:bg-[#212121]" : "lg:bg-[#292929]",
                  item.id % 2 === 0 ? "bg-[#212121]" : "bg-[#292929]",
                )}
              >
                <div className="w-8 sm:w-10 lg:w-[45px] 2xl:w-[60px] 3xl:w-[70px] h-[50px] 2xl:h-[60px] 3xl:h-[70px] mb-12 xl:mb-20 2xl:mb-22 3xl:mb-25">
                  <Image
                    src={item?.media?.path}
                    alt={item?.media?.alt}
                    width={84}
                    height={84}
                    className="w-full h-full object-contain"
                  />
                </div>
                <Heading
                  as="div"
                  size="h4"
                  className="xl:text-[16px] 2xl:text-[19px] 3xl:text-[24px] text-white"
                >
                  {item?.title}
                </Heading>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
