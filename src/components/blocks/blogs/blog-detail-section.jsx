import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function BlogDetailSection({ data }) {
  return (
    <section className="w-full h-auto block py-3 sm:py-4 xl:py-4.75 2xl:py-6 3xl:py-7.5 bg-[#181818] overflow-hidden">
      <div className="container">
        <div className="w-full block mb-4 xl:mb-6 2xl:mb-7 3xl:mb-9">
          
          <Heading
            as="h2"
            size="h1"
            className="leading-tight text-white mb-2 xl:mb-2.4 2xl:mb-2.5 3xl:mb-3"
          >
            {parse(data.title)}
          </Heading>
          <div className="flex mb-4 xl:mb-6 2xl:mb-8 3xl:mb-10">
            <Text
              as="div"
              size="none"
              className="text-[12px] lg:text-[14px] 2xl:text-[18px] 3xl:text-[24px] leading-tight font-medium text-center text-[#008DD2] [&>before]:absolute"
            >
              {(data.date)}
            </Text>
            <div
              className="w-0.75 h-5 bg-[#008DD2] mx-5 mt-1"
            >
            </div>
            <Text
              as="div"
              size="none"
              className="text-[12px] lg:text-[14px] 2xl:text-[18px] 3xl:text-[24px] leading-tight font-medium text-center text-[#008DD2]"
            >
              {(data.author)}
            </Text>
          </div>
          <div className="w-full mb-5 xl:mb-7.5 2xl:mb-10 3xl:mb-12.5">
            <div className="w-full aspect-1720/650 overflow-hidden rounded-[6px] sm:rounded-[8px] xl:rounded-[11px] 2xl:rounded-[14px] 3xl:rounded-[18px]">
              <Image
                src={data?.media?.path}
                alt={data?.media?.alt}
                width={1720}
                height={650}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
          <div className="typography [--text-color:#fff]  ">
            {parse(data?.description)}
          </div>
          <div className="clear-both" />
          <div className="w-full my-8 xl:mt-10.5 xl:mb-9.5 2xl:mt-13.5 2xl:mb-12 3xl:mt-17.5 3xl:mb-15">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7.5">
              {data?.media?.gallery?.map((item, index) => (
                <div
                  key={index}
                  className="aspect-[528/288] overflow-hidden rounded-[6px] sm:rounded-[8px] xl:rounded-[11px] 2xl:rounded-[14px] 3xl:rounded-[18px]"
                >
                  <Image
                    src={item.path}
                    alt={item.alt}
                    width={528}
                    height={288}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="typography [--text-color:#fff]  ">
            {parse(data?.text)}
          </div>
        </div>
        
      </div>
    </section>
  );
}
