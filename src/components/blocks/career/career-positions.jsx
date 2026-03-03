"use client";
import { useState, useMemo } from "react";
import { Heading, Text } from "@/components/utils/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";

export default function CareerPositions({ data }) {
  return (
    <section className="w-full h-auto block bg-[#121212] py-6 xl:py-9 2xl:py-10 3xl:py-11.5">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between mb-8 xl:mb-10 2xl:mb-12.5 3xl:mb-15">
          <Heading
            as="h2"
            size="h1"
            className="text-white font-medium mb-5 lg:mb-0"
          >
            {parse(data?.title)}
          </Heading>

          <div className="flex flex-wrap gap-4 sm:gap-6 xl:gap-8 2xl:gap-10">
            <div className="relative group">
              <label className="block text-[10px] xl:text-[12px] 2xl:text-[14px] text-white/50 mb-1">
                Position
              </label>
            </div>

            <div className="relative group">
              <label className="block text-[10px] xl:text-[12px] 2xl:text-[14px] text-white/50 mb-1">
                Location
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4 xl:space-y-6 2xl:space-y-8">
          {data?.items?.length > 0 ? (
            data?.items?.map((item) => (
              <div key={item.id}>
                <div className="w-full bg-[#1c1c1c] p-6 lg:p-8 2xl:p-10 3xl:p-12 rounded-[10px] xl:rounded-[15px] 2xl:rounded-[20px] group transition-all hover:bg-[#252525] relative">
                  <div className="flex flex-wrap lg:items-center">
                    <div className="w-full lg:w-4/12 mb-6 lg:mb-0">
                      <div className="text-[14px] lg:text-[15px] 2xl:text-[18px] 3xl:text-[21px] leading-tight font-medium text-white mb-2.5 2xl:mb-3 3xl:mb-4">
                        {item.title}
                      </div>
                      <Text as="div" size="p1" className="text-white">
                        {parse(item.description)}
                      </Text>
                    </div>

                    <div className="w-full lg:flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-4 xl:gap-8 lg:px-5 xl:px-10 border-white/10 lg:border-x">
                      <div className="flex flex-col">
                        <div className="text-white/30 text-[10px] xl:text-[12px] uppercase tracking-widest mb-1">
                          Job ID
                        </div>
                        <div className="text-white text-[14px] xl:text-[16px] font-medium">
                          {item.jobId || "Not Mentioned"}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-white/30 text-[10px] xl:text-[12px] uppercase tracking-widest mb-1">
                          Location
                        </div>
                        <div className="text-white text-[14px] xl:text-[16px] font-medium">
                          {item.location?.title || "Not Mentioned"}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-white/30 text-[10px] xl:text-[12px] uppercase tracking-widest mb-1">
                          Posted Date
                        </div>
                        <div className="text-white text-[14px] xl:text-[16px] font-medium">
                          {item.postedDate || "Not Mentioned"}
                        </div>
                      </div>
                      <div className="flex flex-col col-span-2 md:col-span-1 mt-2">
                        <div className="text-white/30 text-[10px] xl:text-[12px] uppercase tracking-widest mb-1">
                          Qualification
                        </div>
                        <div className="text-white text-[14px] xl:text-[16px] font-medium">
                          B.Tech / ITI / Diploma
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-3/12 flex flex-col items-center lg:items-end gap-3 mt-8 lg:mt-0">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-white min-w-[120px] xl:min-w-[135px] 2xl:min-w-[160px] 3xl:min-w-[200px] pl-6"
                      >
                        Apply Now
                        <span className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-white rounded-full flex items-center justify-center ml-auto">
                          <Image
                            src={"/images/icon-arrow-right-blue.svg"}
                            alt={"icon-arrow-right-blue"}
                            width={18}
                            height={13}
                            className="w-1/2"
                            unoptimized
                          />
                        </span>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-white min-w-[120px] xl:min-w-[135px] 2xl:min-w-[160px] 3xl:min-w-[200px] pl-6"
                      >
                        Download
                        <span className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-white rounded-full flex items-center justify-center ml-auto">
                          <Image
                            src={"/images/icon-download.svg"}
                            alt={"icon-download"}
                            width={18}
                            height={13}
                            className="w-1/2"
                            unoptimized
                          />
                        </span>
                      </Button>
                      <button
                        className="flex items-center gap-2 text-white/50 hover:text-[#008dd2] text-[12px] xl:text-[14px] 2xl:text-[15px] transition-colors mt-2"
                        onClick={() => window.open(item.button?.file, "_blank")}
                      >
                        <span>Download Info</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-20 bg-[#1c1c1c] rounded-[20px]">
              <Text as="p" size="p1" className="text-white/30">
                No positions found matching your criteria.
              </Text>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
