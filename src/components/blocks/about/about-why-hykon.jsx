import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";

export default function AboutWhyHykon({ data }) {
  return (
    <section className="w-full h-auto block bg-[#181818] py-10 xl:py-[70px_55px] 2xl:py-[85px_65px] 3xl:py-[110px_80px] relative z-0">
      <div className="container px-2 lg:px-5 2xl:px-8 3xl:px-10">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3">
            <div className="w-full max-w-8/10">
              <div className="w-full pr-2 pb-2">
                <Heading
                  as="h2"
                  size="h1"
                  className="text-white mb-6 xl:mb-6 2xl:mb-9 3xl:mb-10"
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
            <div key={item.id} className="w-full lg:w-1/3">
              <div
                className={cn(
                  "w-full h-full border-1 border-white/25 bg-[#292929] flex flex-wrap flex-col justify-between p-6 xl:p-8 2xl:p-10 3xl:p-11.5",
                  "transition-all duration-300 hover:border-white/50 hover:bg-[#3a3a3a]",
                  // item.id === 1 && "border-t border-s",
                  // item.id === 2 && "border-t border-s",
                  // item.id === 3 && "border-t border-s",
                  item.id === 1 && "lg:rounded-tl-[20px]",
                  item.id === 2 && "lg:rounded-tr-[20px]",
                  item.id === 3 && "lg:rounded-tl-[20px]",
                  item.id === data.items?.length - 2 && "lg:rounded-bl-[20px]",
                  item.id === data.items?.length && "lg:rounded-br-[20px]",
                )}
              >
                <div className="w-[50px] 2xl:w-[60px] 3xl:w-[70px] h-[50px] 2xl:h-[60px] 3xl:h-[70px] mb-12 xl:mb-20 2xl:mb-22 3xl:mb-25">
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
