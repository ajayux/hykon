"use client";
import { Heading, Text } from "@/components/utils/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import parse from "html-react-parser";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CareerDialog from "@/components/common/career-dialog";

export default function CareerPositions({ data }) {
  return (
    <section className="w-full h-auto block bg-[#181818] pt-8 xl:pt-9 2xl:pt-10 3xl:pt-11.5 pb-10 xl:pb-12 2xl:pb-14 3xl:pb-15">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between mb-8 xl:mb-10 2xl:mb-12.5 3xl:mb-15">
          <Heading
            as="h2"
            size="h1"
            className="text-white font-medium mb-4 lg:mb-0"
          >
            {parse(data?.title)}
          </Heading>

          <div className="max-sm:w-full flex flex-wrap gap-6 sm:gap-8 xl:gap-10 2xl:gap-12.5 3xl:gap-15">
            <div>
              <Select>
                <SelectTrigger className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-none font-normal text-white data-[placeholder]:text-white/80 w-[120px] xl:w-[140px] 2xl:w-[160px] 3xl:w-[190px] p-0 border-0 border-b-2 border-b-[#008dd2] rounded-none hover:scale-100">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent className={"bg-white"}>
                  <SelectGroup>
                    {data?.filters?.positions?.map((item) => (
                      <SelectItem key={item?.id} value={item?.slug}>
                        {item?.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select>
                <SelectTrigger className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-none font-normal text-white data-[placeholder]:text-white/80 w-[120px] xl:w-[140px] 2xl:w-[160px] 3xl:w-[190px] p-0 border-0 border-b-2 border-b-[#008dd2] rounded-none hover:scale-100">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className={"bg-white"}>
                  <SelectGroup>
                    {data?.filters?.locations?.map((item) => (
                      <SelectItem key={item?.id} value={item?.slug}>
                        {item?.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4 xl:space-y-6 2xl:space-y-8">
          {data?.items?.length > 0 ? (
            data?.items?.map((item) => (
              <div key={item.id}>
                <div className="w-full bg-[#1c1c1c] px-4 sm:px-8 xl:px-11 2xl:px-12.5 3xl:px-15 py-6 sm:py-5 xl:p-6 2xl:py-7.5 3xl:py-10 rounded-[10px] xl:rounded-[15px] 2xl:rounded-[20px] group transition-all hover:bg-[#252525] relative">
                  <div className="flex flex-wrap lg:items-center">
                    <div className="w-full lg:w-3/12 mb-4 lg:mb-0">
                      <div className="text-[15px] lg:text-[15px] 2xl:text-[18px] 3xl:text-[21px] leading-tight font-medium text-white mb-2.5 2xl:mb-3 3xl:mb-4">
                        {item.title}
                      </div>
                      <Text as="div" size="p1" className="text-white">
                        {parse(item.description)}
                      </Text>
                    </div>

                    <div className="w-full lg:flex-1 grid grid-cols-1 min-[320px]:grid-cols-2 gap-6 lg:gap-5 2xl:gap-6 3xl:gap-7.5 lg:px-[40px] xl:px-[80px] 2xl:px-[100px] 3xl:px-[120px]">
                      <CareerInfo
                        careerInfoIcon="/images/career-info-1.svg"
                        title={"Job ID"}
                        description={item.jobId}
                      />
                      <CareerInfo
                        careerInfoIcon="/images/career-info-2.svg"
                        title={"Location"}
                        description={item.location}
                      />
                      <CareerInfo
                        careerInfoIcon="/images/career-info-3.svg"
                        title={"Posted Date"}
                        description={item.postedDate}
                      />
                      <CareerInfo
                        careerInfoIcon="/images/career-info-4.svg"
                        title={"Qualification"}
                        description={item.qualification}
                      />
                    </div>

                    <div className="w-full lg:w-2/12 flex flex-wrap lg:flex-col items-center lg:items-end gap-3 mt-4 lg:mt-0">
                      <CareerDialog jobTitle={item.title}>
                        <Button
                          size="lg"
                          variant="outline"
                          className="text-white min-w-[120px] xl:min-w-[135px] 2xl:min-w-[160px] 3xl:min-w-[200px] pl-6"
                        >
                          Apply Now
                          <span className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
                            <Image
                              src={"/images/icon-arrow-right-white.svg"}
                              alt={"icon-arrow-right-white"}
                              width={18}
                              height={13}
                              className="w-1/2"
                              unoptimized
                            />
                          </span>
                        </Button>
                      </CareerDialog>
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-white min-w-[120px] xl:min-w-[135px] 2xl:min-w-[160px] 3xl:min-w-[200px] pl-6"
                        onClick={() => window.open(item.button?.file, "_blank")}
                      >
                        Download
                        <span className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
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

function CareerInfo({ careerInfoIcon, title, description }) {
  return (
    <div className="flex flex-col">
      <div className="text-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-medium text-white mb-2 xl:mb-2.5 flex items-center gap-1 xl:gap-2">
        <Image
          src={careerInfoIcon}
          alt={title}
          width={30}
          height={30}
          className="h-[14px] xl:h-[14px] 2xl:h-[18px] 3xl:h-[22px] aspect-28/22 object-contain"
          unoptimized
        />
        {title}
      </div>
      <div className="text-[11px] sm:text-[12px] xl:text-[13px] 2xl:text-[15px] 3xl:text-[18px] leading-tight font-normal text-white">
        {description || "Not Mentioned"}
      </div>
    </div>
  );
}
