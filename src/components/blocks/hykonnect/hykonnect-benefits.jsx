import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";

export default function HykonnectBenefits({ data }) {
  return (
    <section className="w-full h-auto block bg-[#121212] py-10 sm:py-15 lg:py-21 2xl:py-25 3xl:py-30">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="text-center font-medium text-white mb-3 xl:mb-8 2xl:mb-10 3xl:mb-15"
        >
          {parse(data.title)}
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-4 xl:gap-6 2xl:gap-7.5 3xl:gap-8">
          {data.items?.map((item) => (
            <div
              key={item.id}
              className="w-full bg-[#171f23] p-4 sm:p-6 lg:p-8 2xl:p-9 3xl:p-10 rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[12px] transition-transform hover:-translate-y-1 duration-300"
            >
              <Heading
                as="h3"
                size="none"
                className="text-[16px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-tight font-normal text-white mb-2 xl:mb-2.5 3xl:mb-3"
              >
                {item.title}
              </Heading>
              <Text as="p" size="p1" className="text-white">
                {item.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
