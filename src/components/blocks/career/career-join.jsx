"use client";
import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";
import Image from "next/image";

export default function CareerJoin({ data, locale = "en" }) {
  const isArabic = locale === "ar";
  return (
    <section className="w-full">
      <div className="container mx-auto">
        <div className="w-full border-t border-black/10 pt-[20px] sm:py-[32px] xl:pt-[42px] 2xl:pt-[50px]">
          <Heading
            as="h2"
            size="h3"
            className="font-normal text-[#1e1e1e] text-center"
          >
            Why Join Us
          </Heading>
          {/* <Text as="div" size="p1" className="text-[#1e1e1e] text-center">
            {parse(locale == "ar" ? data?.description_ar : data?.description)}
          </Text> */}
        </div>

      </div>
    </section>
  );
}