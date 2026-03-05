import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function BlogDetailSection({ data }) {
  return (
    <section className="w-full h-auto block py-10 xl:py-15 2xl:py-17 3xl:py-22 bg-[#181818] overflow-hidden">
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
          <div className="typography [--text-color:#fff] [&>p]:text-[10px] lg:[&>p]:text-[12px] xl:[&>p]:text-[15px] 2xl:[&>p]:text-[16px] 3xl:[&>p]:text-[18px] [&>p]:mt-0 [&>p]:mb-[12px] lg:[&>p]:mb-[15px] 2xl:[&>p]:mb-[18px] 3xl:[&>p]:mb-[25px] ">
            {parse(data?.description)}
          </div>
          <div className="typography [--text-color:#fff] [&>h3]:text-[16px] lg:[&>h3]:text-[20px] xl:[&>h3]:text-[26px] 2xl:[&>h3]:text-[36px] 3xl:[&>h3]:text-[45px] [&>h3]:font-normal [&>h3]:mt-[30px] lg:[&>h3]:mt-[40px] xl:[&>h3]:mt-[42px] 2xl:[&>h3]:mt-[54px] 3xl:[&>h3]:mt-[66px] [&>p]:text-[12px] lg:[&>p]:text-[14px] 2xl:[&>p]:text-[16px] 3xl:[&>p]:text-[18px] [&>p]:mt-0 [&>p]:mb-[12px] lg:[&>p]:mb-[15px] 2xl:[&>p]:mb-[18px] 3xl:[&>p]:mb-[25px] ">
            {parse(data?.newsec)}
          </div>
          <div className="clear-both" />
        </div>
        
      </div>
    </section>
  );
}
