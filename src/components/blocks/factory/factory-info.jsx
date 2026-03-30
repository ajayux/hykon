import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function FactoryInfo({ data }) {
  return (
    <section className="w-full h-auto block pt-8 xl:pt-13 2xl:pt-15 3xl:pt-20 pb-10 xl:pb-15 2xl:pb-17 3xl:pb-25 bg-[#181818] overflow-hidden">
      <div className="container">
        <div className="w-full max-w-[576px] sm:max-w-[768px] xl:max-w-[880px] 2xl:max-w-[1010px] 3xl:max-w-[1190px] mx-auto mb-5 xl:mb-10 2xl:mb-12 3xl:mb-15">
          <Heading
            as="h2"
            size="h1"
            className="text-center text-white mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5"
          >
            {data.title}
          </Heading>
          <Text
            as="div"
            size="p1"
            className="text-center leading-normal text-white mb-8 xl:mb-8 2xl:mb-10 3xl:mb-12"
          >
            {parse(data?.description)}
          </Text>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5 xl:gap-7 2xl:gap-8 3xl:gap-10">
          {data?.items?.map((item) => (
            <div
              key={item?.id}
              className="w-[130px] min-[376px]:w-[160px] sm:w-[268px] xl:w-[270px] 2xl:w-[325px] 3xl:w-[395px]"
            >
              <div className="group w-full bg-[#171f23] rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[12px] px-3 xl:px-5 2xl:px-6.5 3xl:px-8 py-5 xl:py-7 2xl:py-8 3xl:py-10 flex flex-wrap items-center gap-3 sm:gap-x-5 lg:gap-x-7 2xl:gap-x-8.5 3xl:gap-x-10">
                <div className="w-8.5 2xl:w-10 3xl:w-15 aspect-square transition-transform duration-300 mx-auto sm:m-0 group-hover:scale-110">
                  <Image
                    src={item?.media?.path || "/images/factory-info-1.svg"}
                    alt={item?.media?.alt || "Factory"}
                    width={55}
                    height={55}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full sm:flex-1">
                  <Heading
                    as="div"
                    size="h4"
                    className="leading-tight font-medium text-center sm:text-start text-white max-lg:mb-1"
                  >
                    {item?.title || "Battery Manufacturing Unit"}
                  </Heading>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
