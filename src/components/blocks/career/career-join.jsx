"use client";
import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";
import Image from "next/image";

export default function CareerJoin({ data, locale = "en" }) {
  const isArabic = locale === "ar";
  return (
    <section className="w-full py-[30px_15px] sm:py-[44px_28px] xl:py-[55px_35px] 2xl:py-[70px_44px]">
        <div className="container">
          <div className="w-[60%] mx-auto">
              <Heading
                as="h2"
                size="h4"
                className="text-[22px] sm:text-[32px] lg:text-[40px] 2xl:text-[48px] 3xl:text-[60px] font-normal text-[#1e1e1e] text-center mb-2"
              >
                Why Join Us
              </Heading>
              {/* <Text as="div" size="p1" className="line-clamp-3 text-black">
                  {parse(locale == "ar" ? data?.description_ar : data?.description)}
                </Text> */}
            </div>
        </div>
    </section>
  );
}