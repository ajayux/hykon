"use client";
import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function CareerOpening({ data, locale }) {
  const openingData = {
    title: "Current Openings",
    description:
      "Find your next challenge and join a team that values your unique skills and perspectives.",
      jobtitle: "Project Manager",
      jobdesc: "Wasso is proud to be associated with Hemin Group UAE, a diversified business group.",
    opening_specs: [
      {
        id: 1,
        iconPath: "/images/career-benefits-1.png",
        title: "Job Type",
        title_ar: "النوع الوظيفي",
        description: "Full-time",
        description_ar: "دوام كامل",
      },
      {
        id: 2,
        iconPath: "/images/career-benefits-2.png",
        title: "Requirements",
        title_ar: "المتطلبات",
        description: "Minimum 5 years of experience",
        description_ar: "خبرة لا تقل عن 5 سنوات",
      },
      {
        id: 3,
        iconPath: "/images/career-benefits-3.png",
        title: "Deadline to Apply",
        title_ar: "آخر موعد التقديم",
        description: "2025-12-31",
        description_ar: "2025-12-31",
      },
      
    ],
  };

  const specs = data?.opening_specs?.length
    ? data.opening_specs
    : openingData.opening_specs;

  return (
    <section className="w-full pt-[20px] sm:pt-[25px] xl:pt-[50px] 2xl:pt-[70px] 3xl:pt-[85px]">
      <div className="container">
        <div className="w-full pt-[20px] sm:pt-[25px] xl:pt-[32px] 2xl:pt-[42px] 3xl:pt-[50px]">
          <Heading
            as="h2"
            size="h3"
            className="font-normal text-[#1e1e1e] text-center"
          >
            {data?.title || openingData.title}
          </Heading>
          <Text as="div" size="p1" className="text-[#1e1e1e] text-center">
            {data?.description || openingData.description}
          </Text>
        </div>

        <div className="w-full border border-[#EDE3CE] py-4 px-10 xl:py-5 xl:px-12 mt-6">

          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <div className="w-full sm:w-[30%] pr-[10px]">
              <Heading
              as="h2"
              size="h6"
              className="font-medium text-[#1e1e1e]"
              >
                {openingData.jobtitle}
              </Heading>
              <Text as="div" size="p2" className="text-[#1e1e1e] text-[8px] xl:text-[11px] 3xl:text-[14px]"
                >
                {openingData.jobdesc}
              </Text>
              
            </div>
            <div className="w-full sm:w-[38%] md:w-[45%] lg:w-[52%] xl:w-[54%] 2xl:w-[50%] 3xl:w-[56%]">
              <div className="flex flex-wrap justify-between gap-y-6">
                {specs.map((item) => (
                  <div
                    key={item.id}
                    className="w-full sm:w-[48%] lg:w-[33.333%]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-[20px] xl:w-[24px] 2xl:w-[26px] aspect-square">
                        <Image
                          src={item.iconPath}
                          alt={locale === "ar" ? item.title_ar : item.title}
                          width={30}
                          height={30}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div>
                        <Text
                          as="div"
                          size="p2"
                          className="leading-none font-medium text-[#1C2222]"
                        >
                          {locale === "ar" ? item.title_ar : item.title}:
                        </Text>

                        <Text as="div" size="p2" className="text-[#1C2222]">
                          {locale === "ar"
                            ? item.description_ar
                            : item.description}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full sm:w-[32%] md:w-[25%] lg:w-[18%] xl:w-[16%] 2xl:w-[15%] 3xl:w-[14%]">
              <Button
                size="lg"
                variant={"outline"}
                className="text-[#1e1e1e] lg:text-black min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                asChild
              >
                <Link href={"/"}>
                  {locale == "ar" ? "Explore opportunities" : "Explore opportunities"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
