
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

export default function ProductsCategory({ data }) {
    return (
        <section className="w-full h-auto block bg-[#212121] py-10 xl:py-16 2xl:py-18 3xl:py-22.5">
            <div className="container">

                <div className="flex flex-wrap items-center gap-x-10 lg:gap-x-[65px] 2xl:gap-x-[74px] 3xl:gap-x-[94px]">

                    <div className="w-full lg:flex-1 max-lg:mb-5">
                        <Heading
                            as="h2"
                            size="h1"
                            className="leading-tight text-white mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6"
                        >
                            {parse(data?.title)}
                        </Heading>

                        <Text
                            as="div"
                            size="p1"
                            className="text-white mb-4 xl:mb-7 2xl:mb-8.5 3xl:mb-10 xl:max-w-11/12"
                        >
                            {parse(data?.description)}
                        </Text>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-white min-w-[100px] xl:min-w-[115px] 2xl:min-w-[140px] 3xl:min-w-[170px] pl-4"
                            asChild
                        >
                            <Link href={data?.button?.url} target="_blank">
                                Download Brochure
                                <div className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-white rounded-full flex items-center justify-center ml-auto">
                                    <Image
                                        src={"/images/icon-arrow-right-blue.svg"}
                                        alt={"icon-arrow-right-blue"}
                                        width={18}
                                        height={13}
                                        className="w-1/2"
                                        unoptimized
                                    />
                                </div>
                            </Link>
                        </Button>
                    </div>


                    <div className="w-full sm:w-[320px] lg:w-[420px] xl:w-[495px] 2xl:w-[595px] 3xl:w-[740px]">
                        <div className="w-full bg-[#171f24] px-4 sm:px-6 xl:px-9 2xl:px-11 3xl:px-12.5 py-6 sm:py-8 xl:py-11 2xl:py-13 3xl:py-17 rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[16px]">
                            <div className="typography [--text-color:#fff] [&_ul]:flex [&_ul]:flex-wrap [&_li]:w-[44%]">
                                {parse(data?.specification?.description)}
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-4 xl:gap-6 2xl:gap-7.5 3xl:gap-8.5">
                                {data?.specification?.specificationMedia?.map((item) => (
                                    <div key={item?.id}
                                        className="w-10 sm:w-13 xl:w-15 2xl:w-18 3xl:w-22"
                                    >
                                        <Image
                                            src={item?.path}
                                            alt={item?.alt}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-contain"
                                        />
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