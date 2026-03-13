import Image from "next/image";
import { Heading, Text } from "../utils/typography";
import { Button } from "../ui/button";
import Link from "next/link";
import parse from "html-react-parser";

export default function ProductCard({ item }) {


    console.log("product items: ", item)

    return (
        <div className="group w-full h-auto px-4 xl:px-8 3xl:px-10 py-4 xl:py-6 3xl:py-8 transition-all duration-500">
            <div className="w-full aspect-10/8 overflow-hidden mb-2 xl:mb-5 3xl:mb-6">
                <Image
                    src={item?.media?.path}
                    alt={item?.media?.alt}
                    width={126}
                    height={90}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
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
                    className="text-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[15px] leading-tight line-clamp-4 font-normal text-white mb-3 xl:mb-4 2xl:mb-6 3xl:mb-7"
                >
                    {parse(item?.description? item?.description : "test")}
                </Text>
                <div>
                    <Button
                        size="lg"
                        variant="none"
                        className="text-[10px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-white min-w-[80px] sm:min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] h-auto px-0"
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
    )
}