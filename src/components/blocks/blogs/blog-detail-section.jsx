import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
export default function BlogDetailSection({ data }) {
  return (
    <section className="w-full h-auto block pt-[30px] sm:pt-[50px] xl:pt-[74px] 2xl:pt-[96px] 3xl:pt-[100px] bg-[#181818] overflow-hidden">
      <div className="container">
        <div className="w-full block mb-0 py-[15px] sm:py-[15px_20px] xl:py-[17px_25px] 2xl:py-[25px_30px] 3xl:py-[30px_40px]">
          <div className="flex space-between items-center">
            <Heading
              as="h2"
              size="h1"
              className="leading-tight text-white mb-2 xl:mb-2.4 2xl:mb-2.5 3xl:mb-3"
            >
              {parse(data.title)}
            </Heading>
            <Button
              size="lg"
              variant="none"
              className="flex text-[12px] sm:text-[14px] xl:text-[16px] 2xl:text-[19px] 3xl:text-[22px] text-white gap-2 xl:gap-3 2xl:gap-4 3xl:gap-5 px-0 ml-auto hover:text-[#008dd2] transition-colors cursor-pointer"
              // onClick="{}"
            >
              <Image
                src={"/images/blog-share-icon.svg"}
                alt={"icon-news-right"}
                width={32}
                height={32}
                className=
                  "w-3 sm:w-4.5 xl:w-5 2xl:w-6.5 3xl:w-8 block"
              />
              Share
            </Button>
          </div>
          <div className="flex items-center mb-7 md:mb-8 2xl:mb-9 3xl:mb-10">
            <Text
              as="div"
              size="none"
              className="text-[12px] lg:text-[14px] 2xl:text-[18px] 3xl:text-[24px] leading-tight font-medium text-center text-[#008DD2] [&>before]:absolute"
            >
              {(data.date)}
            </Text>
            <div
              className="w-0.5 xl:w-0.5 3xl:w-0.75 h-3 xl:h-4 2xl:h-5 bg-[#008DD2] mx-2 2xl:mx-5"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 xl:gap-5 2xl:gap-6.25 3xl:gap-7.5">
              {data?.media?.gallery?.map((item, index) => (
                <div
                  key={index}
                  className="aspect-[845/460] overflow-hidden rounded-[6px] sm:rounded-[8px] xl:rounded-[11px] 2xl:rounded-[14px] 3xl:rounded-[18px]"
                >
                  <Image
                    src={item.path}
                    alt={item.alt}
                    width={845}
                    height={460}
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
