import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";

export default function AboutPresence({ data }) {
  return (
    <section className="w-full block py-10 xl:py-[75px_85px] 2xl:py-[90px_100px] 3xl:py-[110px_130px] bg-[#444142]">
      <div className="container">
        <div className="w-full bg-[#008dd2] rounded-[10px] lg:rounded-[14px] 2xl:rounded-[6px] 3xl:rounded-[20px] px-6 sm:px-12 lg:px-19 2xl:px-22.5 3xl:px-28 flex items-center overflow-hidden relative z-0">
          <Image
            src={data.media?.path}
            alt={data.media?.alt}
            width={1100}
            height={530}
            className="w-full max-w-[220px] sm:max-w-[468px] lg:max-w-[560px] xl:max-w-[720px] 2xl:max-w-[870px] 3xl:max-w-[1100px] object-contain absolute -z-1 bottom-0 right-0 hover:scale-105 transition duration-300 max-lg:opacity-80"
          />
          <div className="py-6 sm:py-10 xl:py-[100px] 2xl:py-[120px] 3xl:py-[150px]">
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
            <div className="flex flex-wrap gap-3 sm:gap-x-2 xl:gap-x-3.5 2xl:gap-x-4.5 3xl:gap-x-5">
              {[
                {
                  label: data?.button_one?.text,
                  url: data?.button_one?.link,
                },
                {
                  label: data?.button_two?.text,
                  url: data?.button_two?.link,
                },
              ].map((btn) => (
                <Button
                  key={btn?.label}
                  size="lg"
                  variant="outline"
                  className="text-white min-w-[160px] xl:min-w-[166px] 2xl:min-w-[200px] 3xl:min-w-[245px] pl-2 xl:pl-3"
                  asChild
                >
                  <Link href={btn?.url}>
                    {btn?.label}
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
              ))}
              {/* {data?.button_one && (
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white min-w-[160px] xl:min-w-[180px] 2xl:min-w-[220px] 3xl:min-w-[270px] pl-4"
                  asChild
                >
                  <Link href={data?.button_one?.link}>
                    {data?.button_one?.text}
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
              )}
              {data?.button_two && (
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white min-w-[160px] xl:min-w-[180px] 2xl:min-w-[220px] 3xl:min-w-[270px] pl-4"
                  asChild
                >
                  <Link href={data?.button_two?.link}>
                    {data?.button_two?.text}
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
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
