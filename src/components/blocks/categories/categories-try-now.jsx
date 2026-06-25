import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";

export default function CategoriesTryNow({ data }) {
  return (
    <section className="w-full block py-10 xl:py-15 2xl:py-17.5 3xl:py-22 bg-[#444142]">
      <div className="container">
        <div className="w-full bg-[#008dd2] rounded-[7px] 2xl:rounded-[8px] 3xl:rounded-[10px] px-6 sm:px-7 lg:px-9 2xl:px-10 3xl:px-12.5 flex items-center overflow-hidden relative z-0">
          <picture className="w-full h-full block absolute -z-1 inset-0 max-lg:opacity-40">
            <source
              srcSet={data?.media?.desktopPath}
              media="(min-width: 640px)"
            />
            <Image
              src={data?.media?.path || data?.media?.desktopPath}
              alt={data?.media?.alt || "Hero background"}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </picture>

          <div className="py-6 sm:py-10 xl:py-[110px] 2xl:py-[130px] 3xl:py-[157px]">
            <Heading
              as="h2"
              size="h1"
              className="text-white mb-1 xl:mb-2 2xl:mb-2.5 3xl:mb-3"
            >
              {data?.title}
            </Heading>
            <Text
              as="div"
              size="p1"
              className="text-white mb-6 xl:mb-8 2xl:mb-10 3xl:mb-12"
            >
              {parse(data?.description)}
            </Text>
            <Button
              size="lg"
              variant="outline"
              className="text-white min-w-[100px] xl:min-w-[115px] 2xl:min-w-[140px] 3xl:min-w-[170px]"
              asChild
            >
              <Link href="/power-calculator">
                <span className="flex-1 text-center">Try Now</span>
                <div className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-white rounded-full flex items-center justify-center ml-auto">
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
        </div>
      </div>
    </section>
  );
}
