import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";

export default function AboutPresence({ data }) {
  return (
    <section className="w-full block py-10 xl:py-[75px_85px] 2xl:py-[90px_100px] 3xl:py-[110px_130px] bg-[#181818]">
      <div className="container">
        <div className="w-full bg-[#008dd2] rounded-[10px] lg:rounded-[14px] 2xl:rounded-[6px] 3xl:rounded-[20px] px-12 lg:px-19 2xl:px-22.5 3xl:px-28 flex items-center overflow-hidden relative z-0">
          <Image
            src={data.media?.path || "/images/about-presence-bg.png"}
            alt={data.media?.alt || "Presence Across India"}
            width={1100}
            height={530}
            className="w-full max-w-[576px] xl:max-w-[720px] 2xl:max-w-[870px] 3xl:max-w-[1100px] object-contain absolute -z-1 bottom-0 right-0 hover:scale-105 transition duration-300"
          />
          <div className="py-10 xl:py-[100px] 2xl:py-[120px] 3xl:py-[150px]">
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
            <div className="flex flex-wrap gap-x-2 xl:gap-x-3.5 2xl:gap-x-4.5 3xl:gap-x-5">
              {data?.button_one && (
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white min-w-[160px] xl:min-w-[180px] 2xl:min-w-[220px] 3xl:min-w-[270px] pl-4"
                  asChild
                >
                  <Link href={data?.button_one?.link}>
                    {data?.button_one?.text || "Explore Our Products"}
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
              )}
              {data?.button_two && (
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white min-w-[160px] xl:min-w-[180px] 2xl:min-w-[220px] 3xl:min-w-[270px] pl-4"
                  asChild
                >
                  <Link href={data?.button_two?.link}>
                    {data?.button_two?.text || "Contact Our Team"}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
