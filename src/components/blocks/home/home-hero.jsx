"use client";
import { Text } from "@/components/utils/typography";
import Image from "next/image";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

export default function HomeHero({ data }) {
  return (
    <ParallaxProvider>
      <section className="w-full h-screen min-h-[576px] sm:min-h-[576px] xl:min-h-[620px] 2xl:min-h-[668px] 3xl:min-h-[768px] bg-black overflow-hidden relative z-0">
        <Parallax
          speed={-20}
          className="absolute z-0 inset-0 w-full h-full bg-white"
          style={{ height: "120%" }}
        >
          {data?.mainImage?.type === "video" ? (
            <video
              src={data?.mainImage?.desktopPath}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <picture className="w-full h-full block">
              <source
                srcSet={data?.mainImage?.desktopPath}
                media="(min-width: 640px)"
              />
              <Image
                src={
                  data?.mainImage?.mobilePath || data?.mainImage?.desktopPath
                }
                alt={data?.mainImage?.alt || "Hero background"}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </picture>
          )}
        </Parallax>

        <div className="absolute z-1 inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        <div className="absolute z-2 bottom-0 inset-x-0  container flex justify-end pb-12.5 2xl:pb-15 3xl:pb-19">
          <div className="bg-white/12 backdrop-blur-[18px] border border-white/15 rounded-full py-3.5 2xl:py-4.5 3xl:py-5 px-4.5 2xl:px-5 3xl:px-7 flex flex-wrap items-center">
            <div className="pl-2 2xl:pl-2.5 3xl:pl-3 pr-5 2xl:pr-6 3xl:pr-7.5">
              <Text as="p" size="p2" className="text-white">
                {data?.contactInfo?.title}
                <br />
                <span className="text-[125%] font-medium">
                  <a href={`tel:${data?.contactInfo?.phone}`} target="_blank">
                    {data?.contactInfo?.phone}
                  </a>
                </span>
              </Text>
            </div>
            <div className="w-6.5 h-6.5 2xl:w-7 2xl:h-7 3xl:w-11 3xl:h-11 bg-[#d9d9d9] rounded-full flex items-center justify-center">
              <Image
                src={"/images/icon-arrow-right.svg"}
                alt={"icon-arrow-right"}
                width={18}
                height={13}
                className="w-4"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>
    </ParallaxProvider>
  );
}
