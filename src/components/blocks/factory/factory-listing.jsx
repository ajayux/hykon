import { Heading } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FactoryListing({ data }) {
  return (
    <section className="w-full h-auto block pt-8 xl:pt-12.5 2xl:pt-15 3xl:pt-18 pb-10 xl:pb-18 2xl:pb-22.5 3xl:pb-26 bg-[#202020]">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="text-center text-white mb-4 xl:mb-5 2xl:mb-6 3xl:mb-7"
        >
          {parse(data.title)}
        </Heading>
        <div className="flex flex-wrap justify-center -mx-1.5 sm:-mx-2 xl:-mx-3.5 2xl:-mx-4.5 3xl:-mx-6">
          {data?.items?.map((item) => (
            <div
              key={item?.id}
              className="w-[276px] min-[376px]:w-1/2 sm:w-1/3 lg:w-1/4 p-1.5 sm:p-2 xl:p-3.5 2xl:p-4.5 3xl:p-6"
            >
              <div className="group w-full h-full 3xl:min-h-[410px] bg-none px-3 xl:px-4 3xl:px-5 py-4 xl:py-6 3xl:py-8 transition-all duration-500 rounded-[12px] 2xl:rounded-[14px] 3xl:rounded-[18px] bg-[#252525] border border-[#676767] flex flex-col hover:bg-white">
                <div className="relative w-full aspect-34/18 overflow-hidden rounded-[6px] 2xl:rounded-[8px] 3xl:rounded-[10px] mb-2 xl:mb-4.5 3xl:mb-6.5">
                  <Image
                    src={item?.media?.path}
                    alt={item?.media?.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <Heading
                    as="h3"
                    size="none"
                    className="text-[12px] sm:text-[13px] xl:text-[14px] 2xl:text-[17px] 3xl:text-[20px] leading-tight font-normal line-clamp-2 text-white mb-2 xl:mb-3 2xl:mb-4 3xl:mb-6 group-hover:text-black xl:max-w-3/4 transition-colors duration-300"
                  >
                    {item?.title}
                  </Heading>
                  <div>
                    <Button
                      size="lg"
                      variant="none"
                      className="text-white min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] h-auto px-0 group-hover:text-black transition-colors duration-300"
                      asChild
                    >
                      <Link href={`/factory/${item?.slug}`}>
                        <div className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
                          <Image
                            src={"/images/icon-arrow-right-white.svg"}
                            alt={"icon-arrow-right-white"}
                            width={18}
                            height={13}
                            className="w-1/2"
                            unoptimized
                          />
                        </div>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
