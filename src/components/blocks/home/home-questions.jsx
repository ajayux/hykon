"use client";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import parse from "html-react-parser";

export default function HomeQuestions({ data }) {
  const pathname = usePathname();
  const isLandingPage =
    pathname === "/landing" || pathname?.startsWith("/landing/");

  if (isLandingPage) return null;
  return (
    <section className="w-full h-auto block bg-[#008dd2] py-10 xl:py-15 2xl:py-17.5 3xl:py-[85px] relative z-0">
      <Image
        src={"/images/home-questions-bg.png"}
        alt={"home-questions-bg"}
        width={222}
        height={455}
        className="w-[100px] xl:w-[160px] 2xl:w-[192px] 3xl:w-[240px] aspect-[222/455] absolute -z-1 left-0 inset-y-0 m-auto"
      />
      <div className="container xl:pl-[140px] xl:pr-[60px] 2xl:pl-[160px] 2xl:pr-[90px] 3xl:pl-[200px] 3xl:pr-[100px]">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:flex-1">
            <Heading
              as="h2"
              size="none"
              className="text-[28px] sm:text-[32px] lg:text-[46px] 2xl:text-[55px] 3xl:text-[68px] font-normal text-white 3xl:mb-0.5"
            >
              {parse(data?.title)}
            </Heading>
            <Text
              as="div"
              size="p0"
              className="text-white mb-4 xl:mb-8 2xl:mb-10 3xl:mb-13 max-lg:max-w-3/4"
            >
              {parse(data?.description)}
            </Text>
            <Button
              size="lg"
              variant="outline"
              className="text-white min-w-[120px] xl:min-w-[125px] 2xl:min-w-[150px] 3xl:min-w-[180px] pl-4 xl:pl-5"
              asChild
            >
              <Link href={data?.button?.link}>
                {data?.button?.label}
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
          <div className="w-full sm:w-[320px] lg:w-[440px] 2xl:w-[540px] 3xl:w-[680px] ml-auto">
            <div className="w-full h-auto aspect-72/34 block xl:scale-120 lg:translate-y-2 max-lg:-mt-10">
              <Image
                src={data?.media?.path}
                alt={data?.media?.alt}
                width={730}
                height={340}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
