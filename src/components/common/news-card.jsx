import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

export default function NewsCard({ item, isLoading, variant = "news" }) {
  if (isLoading) return <NewsCardSkelton />;
  return (
    <Suspense fallback={<NewsCardSkelton />}>
      <Link href={`/${variant}/${item?.slug}`} className="group w-full h-full flex flex-col relative z-0">
        <div className="w-full mb-6 xl:mb-9 2xl:mb-11 3xl:mb-14 relative z-0">
          <div className="w-full aspect-63/33 rounded-[14px] 2xl:rounded-[16px] 3xl:rounded-[20px] overflow-hidden bg-gray-500">
            <Image
              src={item?.media?.path}
              alt={item?.media?.alt}
              width={630}
              height={330}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="absolute z-1 bottom-0 left-4 translate-y-1/3 3xl:translate-y-1/4">
            <div
              className={cn(
                "w-full min-w-[80px] lg:min-w-[100px] 2xl:min-w-[120px] 3xl:min-w-[147px] bg-[#262626] rounded-[14px] 3xl:rounded-[20px] py-2 xl:py-3 2xl:py-4 3xl:py-5 px-2 xl:px-3 2xl:px-3.5 3xl:px-3.5 transition-all duration-300",
                "group-hover:bg-[#008dd2]",
              )}
            >
              <div className="text-[20px] sm:text-[24px] lg:text-[28px] xl:text-[35px] 2xl:text-[42px] 3xl:text-[53px] leading-none font-normal text-center text-white mb-1 xl:mb-2">
                {item?.publishDay}
              </div>
              <div className="text-[10px] lg:text-[12px] xl:text-[15px] 2xl:text-[18px] 3xl:text-[22px] leading-none font-normal text-center text-white">
                {item?.publishMonthYear}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between w-full p-2 xl:p-3.5 2xl:p-4.5 3xl:p-5.5">
          <div>
            <Heading
              as="h3"
              size="h4"
              className="font-medium line-clamp-2 text-white mb-3 lg:mb-5 3xl:mb-6"
            >
              {item?.title}
            </Heading>
            <Text
              as="div"
              size="p2"
              className="line-clamp-3 xl:leading-[1.7] font-normal text-white mb-1 xl:mb-2 3xl:mb-3"
            >
              {parse(
                item?.description ||
                  "On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha.",
              )}
            </Text>
          </div>
          <div>
            <Button
              size="lg"
              variant="none"
              className="text-white px-0"
              asChild
            >
              <div>
                Read More
                <Image
                  src={"/images/icon-news-right.svg"}
                  alt={"icon-news-right"}
                  width={6}
                  height={10}
                  className="w-1 3xl:w-1.5 block mt-0.5"
                  unoptimized
                />
              </div>
            </Button>
          </div>
        </div>
      </Link>
    </Suspense>
  );
}

function NewsCardSkelton() {
  return (
    <div className="group w-full h-full flex flex-col">
      <Skeleton className="w-full aspect-63/33 rounded-[14px] 2xl:rounded-[16px] 3xl:rounded-[20px] bg-gray-800 mb-1 xl:mb-2 2xl:mb-4 3xl:mb-6 " />

      <Skeleton className="flex-1 flex flex-col justify-between w-full p-2 xl:p-3.5 2xl:p-4.5 3xl:p-5.5">
        <div>
          <Skeleton className="w-full h-5 bg-gray-600 mb-3 lg:mb-5 3xl:mb-6" />
          <Skeleton className="w-full h-4 bg-gray-500 mb-1 xl:mb-2 3xl:mb-3" />
        </div>
        <div>
          <Skeleton className="w-full max-w-[80px] lg:max-w-[100px] 2xl:max-w-[120px] 3xl:max-w-[147px] h-10 bg-gray-500" />
        </div>
      </Skeleton>
    </div>
  );
}
