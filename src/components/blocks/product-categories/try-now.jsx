"use client";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function TryNow({ data }) {
  return (
    <section className="w-full h-auto block bg-black py-12 lg:py-20 2xl:py-28 3xl:py-32">
      <div className="container">
        <div className="w-full bg-[#008dd2] rounded-[24px] lg:rounded-[32px] 2xl:rounded-[40px] 3xl:rounded-[48px] overflow-hidden relative min-h-[320px] lg:min-h-[400px] 2xl:min-h-[480px] 3xl:min-h-[560px] flex items-center">
          <div className="w-full lg:w-1/2 px-8 sm:px-12 lg:px-16 2xl:px-20 3xl:px-24 py-12 relative z-2">
            <Heading
              as="h2"
              size="h1"
              className="text-white mb-6 2xl:mb-8 3xl:mb-10 lg:max-w-[450px]"
            >
              {data?.title}
            </Heading>
            <div className="text-white/90 text-sm lg:text-base 2xl:text-lg 3xl:text-xl mb-8 2xl:mb-10 3xl:mb-12 lg:max-w-[450px]">
              {data?.description ? (
                parse(data.description)
              ) : (
                <p>
                  Try Volt Search Tool to find the perfect power solution for
                  your requirements.
                </p>
              )}
            </div>

            <Link
              href="/volt-search"
              className="inline-flex items-center gap-4 bg-transparent border border-white/40 rounded-full pl-6 pr-2 py-2 group transition-all duration-300 hover:bg-white hover:border-white"
            >
              <span className="text-white font-medium group-hover:text-[#008dd2] transition-colors duration-300">
                Try Now
              </span>
              <div className="w-8 2xl:w-10 aspect-square bg-white rounded-full flex items-center justify-center group-hover:bg-[#008dd2] transition-colors duration-300">
                <Image
                  src="/images/icon-arrow-right-blue.svg"
                  alt="arrow"
                  width={20}
                  height={15}
                  className="w-1/2 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                />
              </div>
            </Link>
          </div>

          <div className="absolute right-0 bottom-0 w-full lg:w-[60%] h-full pointer-events-none z-1 flex items-end justify-end overflow-hidden">
            <div className="relative w-full h-[80%] lg:h-full translate-y-[10%] lg:translate-y-0 translate-x-[10%] lg:translate-x-0">
              <Image
                src={data?.media?.path || "/images/try-now-mockup.png"}
                alt={data?.media?.alt || "Try Now"}
                fill
                className="object-contain object-right-bottom"
              />
            </div>
          </div>

          {/* Subtle gradient overlay to ensure text readability on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
}
