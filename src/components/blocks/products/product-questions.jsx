"use client";
import { Heading } from "@/components/utils/typography";
import parse from "html-react-parser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";

export default function ProductQuestions({ data }) {
  return (
    <section className="w-full h-auto block bg-[#181818] py-10 xl:py-[40px_60px] 2xl:py-[50px_70px] 3xl:py-[60px_90px]">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="text-center text-white mb-4 xl:mb-9 2xl:mb-11.5 3xl:mb-13"
        >
          {parse(data?.title)}
        </Heading>
        <Accordion
          type="single"
          defaultValue={`item-${data?.faqItems?.[0]?.id}`}
          collapsible
          className="w-full"
        >
          {data?.faqItems?.map((item) => (
            <AccordionItem
              key={item?.id}
              value={`item-${item?.id}`}
              className="rounded-[4px] xl:rounded-[8px] 2xl:rounded-[11px] 3xl:rounded-[14px] bg-[#212121] hover:bg-[#292929] p-[10px_15px] sm:p-[15px_20px] xl:p-[20px_25px] 2xl:p-[25px_32px] 3xl:p-[32px_40px] mb-[18px] shadow-none border-none"
            >
              <AccordionTrigger className="[&>svg]:hidden group flex items-center justify-between text-[12px] xl:text-[15px] 2xl:text-[19px] 3xl:text-[24px] py-0 font-normal text-white cursor-pointer hover:no-underline">
                <span>
                  {item?.id}. {item?.question}
                </span>
                <span className="ml-4">
                  <Plus className="size-4 xl:size-5 2xl:size-6 group-data-[state=open]:hidden" />
                  <Minus className="size-4 xl:size-5 2xl:size-6 hidden group-data-[state=open]:block" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.6] font-normal text-white pb-0 pr-6 xl:pr-8 2xl:pr-10  mt-[8px] xl:mt-[12px] 2xl:mt-[14px] 3xl:mt-[16px]">
                {parse(item?.answer || "")}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
