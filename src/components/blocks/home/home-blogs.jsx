"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
export default function HomeBlogs({ data }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    // [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );
  return (
    <section className="w-full h-auto block bg-black pb-10 xl:pb-[66px] 2xl:pb-20 3xl:pb-[100px] relative z-0">
      <div className="text-[120px] sm:text-[140px] xl:text-[166px] 2xl:text-[200px] 3xl:text-[250px] font-bold leading-none uppercase text-center text-gray-900 select-none opacity-40 absolute -z-1 top-0 inset-x-0 ">
        {parse(data?.title)}
      </div>
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-6 xl:mb-10 2xl:mb-11 3xl:mb-15">
          <div className="w-full xl:flex-1">
            <Heading
              as="h2"
              size="h1"
              className="text-medium text-white mb-1 xl:mb-1.5 3xl:mb-2"
            >
              {parse(data?.title)}
            </Heading>
          </div>
          <div className="w-full xl:w-[124px] 2xl:w-[150px] 3xl:w-[187px]">
            <Button
              size="lg"
              variant="outline"
              className="text-white min-w-[160px] xl:min-w-full justify-between pl-4 xl:pl-7"
              asChild
            >
              <Link href={data?.button?.link}>
                {data?.button?.label}
                <div className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
                  <Image
                    src={"/images/icon-arrow-right-white.svg"}
                    alt={"icon-arrow-right-white"}
                    width={18}
                    height={13}
                    className="w-4.5"
                    unoptimized
                  />
                </div>
              </Link>
            </Button>
          </div>
        </div>
        <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
          <div className="flex touch-pan-y touch-pinch-zoom -mx-1 xl:-mx-2.5 ">
            {data?.items?.map((item) => (
              <div
                key={item?.id}
                className={cn(
                  "flex-[0_0_220px] sm:flex-[0_0_33.333%] lg:flex-[0_0_33.333%] min-w-0 select-none px-1 xl:px-2.5",
                )}
              >
                <Link
                  href={item?.slug}
                  className="group w-full h-full aspect-square rounded-[20px] overflow-hidden bg-[#113B50] block relative z-0"
                >
                  <div className="w-full h-full visible group-hover:invisible scale-100 group-hover:scale-90 transition-all duration-300">
                    <Image
                      src={item?.media?.path}
                      alt={item?.media?.alt}
                      width={560}
                      height={560}
                      className="w-full h-full object-cover absolute -z-1 inset-0 transition-transform duration-300 rounded-[20px]"
                    />
                    <div className="absolute z-0 inset-x-7.5 bottom-12">
                      <div className="w-full h-auto bg-white/70 rounded-[20px] backdrop-blur-[20px] p-2 xl:px-[40px] 2xl:px-[50px] 3xl:px-[60px] xl:py-[28px] 2xl:py-[32px] 3xl:py-[40px] relative z-0">
                        <div className="w-[5px] h-full max-h-1/3 m-auto absolute z-0 left-0 inset-y-0 bg-[#008dd2] rounded-r-lg" />
                        <Image
                          src={"/images/icon-blog-btn.svg"}
                          alt={"icon-blog-btn"}
                          width={40}
                          height={40}
                          className="w-6.5 2xl:w-8 3xl:w-10 object-contain absolute -z-1 top-2 2xl:top-2.5 3xl:top-3.5 right-2 2xl:right-2.5 3xl:right-3.5 transition-transform duration-300"
                        />
                        <Text
                          as="div"
                          size="p0"
                          className="line-clamp-3 font-medium text-[#3c3c3c]"
                        >
                          {parse(item?.title)}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className="w-full max-w-9/10 max-h-9/10 h-full m-auto absolute z-0 inset-0 invisible group-hover:visible scale-0 group-hover:scale-100  transition-all duration-300">
                    <Image
                      src={"/images/icon-blog-btn.svg"}
                      alt={"icon-blog-btn"}
                      width={40}
                      height={40}
                      className="w-6.5 2xl:w-8 3xl:w-10 object-contain absolute z-1 top-3 2xl:top-3.5 3xl:top-4 right-3 2xl:right-3.5 3xl:right-4 transition-transform duration-300 hover:scale-110"
                    />
                    <div className="w-full h-full rounded-[20px] overflow-hidden relative z-0 bg-black">
                      <Image
                        src={item?.media?.path}
                        alt={item?.media?.alt}
                        width={560}
                        height={560}
                        className="w-full h-full object-cover transition-transform duration-300 opacity-80 [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]"
                      />
                    </div>
                    <div className="absolute z-0 inset-x-0 bottom-0">
                      <div className="w-full h-auto p-2 xl:px-[40px] 2xl:px-[50px] 3xl:px-[60px] xl:py-[28px] 2xl:py-[32px] 3xl:py-[40px] block relative z-0">
                        <div className="w-[5px] h-full max-h-1/3 m-auto absolute z-0 left-0 inset-y-0 bg-[#008dd2] rounded-r-lg" />
                        <Text
                          as="div"
                          size="p0"
                          className="line-clamp-3 font-medium text-white"
                        >
                          {parse(item?.title)}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
