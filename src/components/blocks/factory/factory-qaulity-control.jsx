import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function FactoryQualityControl({ data }) {
  return (
    <section className="w-full h-auto block py-12 xl:py-17 2xl:py-20 3xl:py-25 bg-[#444142] overflow-hidden">
      <div className="container lg:px-[30px] xl:px-[34px] 2xl:px-[40px] 3xl:px-[48px]">
        <div className="flex flex-wrap items-center justify-between gap-5 sm:gap-x-10 lg:gap-x-[100px] xl:gap-x-[120px] 2xl:gap-x-[180px] 3xl:gap-x-[200px]">
          <div className="w-full lg:flex-1">
            <div className="w-full">
              <Heading
                as="h2"
                size="h1"
                className="leading-tight text-white mb-5 xl:mb-7 2xl:mb-9 3xl:mb-10"
              >
                {parse(data.title)}
              </Heading>
              <div className="typography [--text-color:#fff]">
                {parse(data?.description)}
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[320px] lg:w-[420px] xl:w-[500px] 2xl:w-[600px] 3xl:w-[738px] max-lg:mb-5">
            <div className="w-full aspect-74/42 overflow-hidden rounded-[7px] 2xl:rounded-[8px] 3xl:rounded-[10px]">
              <Image
                src={data?.media?.path}
                alt={data?.media?.alt}
                width={738}
                height={412}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
