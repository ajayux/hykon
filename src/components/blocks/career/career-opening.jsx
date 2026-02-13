"use client";
import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";
import Image from "next/image";

export default function CareerOpening({ data, locale}) {
  
   const openingData = {
    title: "Current Openings",
    description: "Find your next challenge and join a team that values your unique skills and perspectives.",
  };

  return (
    <section className="w-full pt-[20px] sm:pt-[25px] xl:pt-[50px] 2xl:pt-[70px] 3xl:pt-[85px]">
      <div className="container">
        <div className="w-full pt-[20px] sm:pt-[25px] xl:pt-[32px] 2xl:pt-[42px] 3xl:pt-[50px]">
          <Heading
            as="h2"
            size="h3"
            className="font-normal text-[#1e1e1e] text-center"
          >
            {openingData.title}
          </Heading>
          <Text
              as="div"
              size="p1"
              className="text-[#1e1e1e] text-center"
            >
              {openingData.description}
            </Text>
        </div>
        <div className="w-full">
          <div className="w-full border-t border-[#EDE3CE] pt-[20px] sm:pt-[25px] xl:pt-[32px] 2xl:pt-[42px] 3xl:pt-[50px]">
            
          </div>
        </div>
      </div>
    </section>
  );
}