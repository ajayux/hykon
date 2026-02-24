import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import Link from "next/link";

export default function HomeProducts({ data }) {
  return (
    <section className="w-full h-auto block bg-black py-10 xl:py-15 2xl:py-17.5 3xl:py-[85px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-[440px] 2xl:w-[540px] 3xl:w-[680px]">
            <div className="w-full">
              <div className="text-white w-full h-auto border border-white rounded-[6px] flex items-center gap-2 p-1 mb-10 xl:mb-20 2xl:mb-[96px] 3xl:mb-[120px]">
                <span className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
                  01
                </span>
                Corporate
              </div>
              <Heading
                as="div"
                size="h6"
                className="tracking-1 uppercase text-[#008dd2] mb-3 xl:mb-4 2xl:mb-6 3xl:mb-7"
              >
                {data?.title}
              </Heading>
              {data?.corporateItems?.items?.map((item) => (
                <div key={item.id} className="w-full relative z-0">
                  <Heading
                    as="div"
                    size="h3"
                    className="text-white mb-3 xl:mb-4 2xl:mb-6 3xl:mb-7"
                  >
                    {item?.title}
                  </Heading>
                  <Text
                    as="div"
                    size="p2"
                    className="text-white mb-3 xl:mb-4 2xl:mb-6 3xl:mb-7"
                  >
                    {item?.description}
                  </Text>
                  <div className="absolute z-0 inset-y-1/2 right-0 -translate-y-1/2">
                    <div className="w-[78px] 2xl:w-[98px] 3xl:w-[118px] aspect-square rounded-full bg-white/10 border-1 border-[#efefef] rounded-full p-4 2xl:p-5 3xl:p-6">
                      <div className="w-full aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
                        <Image
                          src={"/images/icon-arrow-right-white.svg"}
                          alt={"icon-arrow-right-white"}
                          width={18}
                          height={13}
                          className="w-1/2"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:flex-1">
            <div className="w-full bg-linear-to-b from-[#008dd2]/70 via-[#181818]/70 to-[#008dd2]/70 rounded-[13px] 2xl:rounded-[16px] 3xl:rounded-[20px] px-5 xl:px-6 2xl:px-7 3xl:px-9 py-10 xl:py-12.5 2xl:py-15 3xl:py-[75px]">
              <div className="flex flex-wrap">
                {data?.corporateItems?.productsItems?.map((item) => (
                  <div key={item.id} className="w-full sm:w-1/3">
                    <div className="w-full h-auto px-3 xl:px-4 3xl:px-5 py-4 xl:py-6 3xl:py-8 transition-all duration-500">
                      <div className="w-full aspect-13/10 overflow-hidden mb-2 xl:mb-5 3xl:mb-6">
                        <Image
                          src={item?.media?.path}
                          alt={item?.media?.alt}
                          width={126}
                          height={90}
                          className="object-contain  transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <Heading
                          as="div"
                          size="h5"
                          className="line-clamp-1 font-medium text-white mb-2 xl:mb-3 2xl:mb-5 3xl:mb-6"
                        >
                          {item?.title}
                        </Heading>
                        <Text
                          as="div"
                          size="none"
                          className="text-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[15px] leading-tight font-normal text-white mb-3 xl:mb-4 2xl:mb-6 3xl:mb-7"
                        >
                          {item?.description}
                        </Text>
                        <div>
                          <Button
                            size="lg"
                            variant="none"
                            className="text-white min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] h-auto px-0"
                            asChild
                          >
                            <Link href={item?.slug}>
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
          </div>
        </div>
      </div>
    </section>
  );
}
