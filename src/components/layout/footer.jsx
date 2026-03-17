"use client";

import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Heading, Text } from "../utils/typography";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

export default function Footer({ footerData, socialLinkData, locale }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/landing" || pathname?.startsWith("/landing/");
  
  const [openSection, setOpenSection] = useState(null);

  if (isLandingPage) return null;

  return (
    <footer className="w-full pt-8 xl:pt-[45px] 2xl:pt-[50px] 3xl:pt-[70px] overflow-hidden bg-[#212121] relative z-0 max-sm:pb-12">
      <div className="container opacity-95">
        <div className="flex flex-wrap items-center justify-between">
          <Link
            href={footerData?.slug}
            className="w-[90px] sm:w-[100px] lg:w-[125px] 2xl:w-[150px] 3xl:w-[186px] block mb-3 lg:mb-0"
          >
            <Image
              src={footerData?.logoUrl}
              alt={footerData?.name}
              width={186}
              height={58}
              className="w-full h-full block hover:scale-105 transition"
              unoptimized
            />
          </Link>
          <div className="w-full max-w-full lg:max-w-[468px] xl:max-w-[590px] 2xl:max-w-[700px] 3xl:max-w-[880px]">
            <Heading
              as="div"
              size="none"
              className="text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[28px] font-normal text-white"
            >
              {parse(footerData?.description)}
            </Heading>
          </div>
        </div>
        <hr className="border-[#414141] my-4 xl:my-8.5 2xl:my-10 3xl:my-12.5" />

        <div className="flex flex-wrap -mx-1 sm:-mx-2 xl:-mx-3 [&>*]:p-1 sm:[&>*]:p-2 xl:[&>*]:px-3 max-lg:flex-col-reverse">
          {footerData?.quickLinks && (
            <div className="w-full lg:w-[30%] 2xl:w-[32%]">
              <div className="w-full">
                <MediaQuery minWidth={1024}>
                  <>
                    <Text
                      as="h6"
                      size="p0"
                      className="font-medium uppercase text-[#bcbcbc] mb-3 xl:mb-5 2xl:mb-6 3xl:mb-8"
                    >
                      {footerData?.quickLinks?.title}
                    </Text>
                    <div className="grid grid-cols-2 gap-x-1">
                      {footerData?.quickLinks?.items?.map((item, index) => (
                        <div key={"quickLinks" + index}>
                          <Heading
                            as="div"
                            size="h5"
                            className="font-normal text-white transition [&>a]:hover:text-[#008dd2] my-0.5 xl:my-1"
                          >
                            <Link href={item?.slug}>{item?.label}</Link>
                          </Heading>
                        </div>
                      ))}
                    </div>
                  </>
                </MediaQuery>
                <MediaQuery maxWidth={1023}>
                  <>
                    <AccordionItem
                      title="Quick links"
                      section="quickLinks"
                      openSection={openSection}
                      setOpenSection={setOpenSection}
                    >
                      <div className="flex flex-wrap -mx-2">
                        {footerData?.quickLinks?.items?.map((item, index) => (
                          <div key={"quickLinks" + index} className="w-1/2 p-2">
                            <Heading
                              as="div"
                              size="h5"
                              className="font-normal text-white transition [&>a]:hover:text-[#008dd2]"
                            >
                              <Link href={item?.slug}>{item?.label}</Link>
                            </Heading>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>
                  </>
                </MediaQuery>
              </div>
            </div>
          )}

          {footerData?.productCategories && (
            <div className="w-full lg:w-[30%] 2xl:w-[32%]">
              <div className="w-full">
                <MediaQuery minWidth={1024}>
                  <>
                    <Text
                      as="h6"
                      size="p0"
                      className="font-medium uppercase text-[#bcbcbc] mb-3 xl:mb-5 2xl:mb-6 3xl:mb-8"
                    >
                      {footerData?.productCategories?.title}
                    </Text>
                    <div className="grid grid-cols-2 gap-x-1">
                      {footerData?.productCategories?.items?.map(
                        (item, index) => (
                          <div key={"productCategories" + index}>
                            <Heading
                              as="div"
                              size="h5"
                              className="font-normal text-white transition [&>a]:hover:text-[#008dd2] my-0.5 xl:my-1"
                            >
                              <Link href={item?.slug}>{item?.label}</Link>
                            </Heading>
                          </div>
                        ),
                      )}
                    </div>
                  </>
                </MediaQuery>
                <MediaQuery maxWidth={1023}>
                  <>
                    <AccordionItem
                      title="Product Categories"
                      section="productCategories"
                      openSection={openSection}
                      setOpenSection={setOpenSection}
                    >
                      <div className="flex flex-wrap -mx-2">
                        {footerData?.productCategories?.items?.map(
                          (item, index) => (
                            <div
                              key={"productCategories" + index}
                              className="w-1/2 p-2"
                            >
                              <Heading
                                as="div"
                                size="h5"
                                className="font-normal text-white transition [&>a]:hover:text-[#008dd2]"
                              >
                                <Link href={item?.slug}>{item?.label}</Link>
                              </Heading>
                            </div>
                          ),
                        )}
                      </div>
                    </AccordionItem>
                  </>
                </MediaQuery>
              </div>
            </div>
          )}

          {footerData?.manufacturingLocations && (
            <div className="w-full lg:w-[24%] 2xl:w-[22%]">
              <div className="w-full">
                <MediaQuery minWidth={1024}>
                  <>
                    <Text
                      as="h6"
                      size="p0"
                      className="font-medium uppercase text-[#bcbcbc] mb-3 xl:mb-5 2xl:mb-6 3xl:mb-8"
                    >
                      {footerData?.manufacturingLocations?.title}
                    </Text>
                    {footerData?.manufacturingLocations?.items?.map(
                      (item, index) => (
                        <div key={"manufacturingLocations" + index}>
                          <div className="w-full flex flex-wrap gap-x-2 3xl:gap-x-3 mb-2 xl:mb-4 2xl:mb-5 3xl:mb-6">
                            <div className="w-[10px] 2xl:w-[12px] 3xl:w-[15px]">
                              <Image
                                src="/images/home-footer-loc.svg"
                                alt="Location"
                                width={15}
                                height={19}
                              />
                            </div>
                            <div className="flex-1">
                              <Heading
                                as="div"
                                size="h5"
                                className="leading-none font-normal text-white transition [&>a]:hover:text-[#008dd2] mb-0.5 xl:mb-1"
                              >
                                {item?.city}
                              </Heading>
                              <Heading
                                as="div"
                                size="h6"
                                className="font-normal text-white transition [&>a]:hover:text-[#008dd2]"
                              >
                                <a href={`mailto:${item?.email}`}>
                                  {item?.email}
                                </a>
                              </Heading>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </>
                </MediaQuery>
                <MediaQuery maxWidth={1023}>
                  <>
                    <AccordionItem
                      title="Manufacturing Locations"
                      section="manufacturingLocations"
                      openSection={openSection}
                      setOpenSection={setOpenSection}
                    >
                      <div className="flex flex-wrap -mx-2">
                        {footerData?.manufacturingLocations?.items?.map(
                          (item, index) => (
                            <div
                              key={"manufacturingLocations" + index}
                              className="w-1/2 p-2"
                            >
                              <div className="w-full flex flex-wrap gap-x-2 3xl:gap-x-3 mb-2 xl:mb-4 2xl:mb-5 3xl:mb-6">
                                <div className="w-[10px] 2xl:w-[12px] 3xl:w-[15px]">
                                  <Image
                                    src="/images/home-footer-loc.svg"
                                    alt="Location"
                                    width={15}
                                    height={19}
                                  />
                                </div>
                                <div className="flex-1">
                                  <Heading
                                    as="div"
                                    size="h5"
                                    className="leading-none font-normal text-white transition [&>a]:hover:text-[#008dd2] mb-0.5 xl:mb-1"
                                  >
                                    {item?.city}
                                  </Heading>
                                  <Heading
                                    as="div"
                                    size="h6"
                                    className="font-normal text-white transition [&>a]:hover:text-[#008dd2]"
                                  >
                                    <a href={`mailto:${item?.email}`}>
                                      {item?.email}
                                    </a>
                                  </Heading>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </AccordionItem>
                  </>
                </MediaQuery>
              </div>
            </div>
          )}

          {footerData?.contactInfo && (
            <div className="w-full lg:w-[16%] 2xl:w-[14%]">
              <div className="w-full">
                <Text
                  as="h6"
                  size="p0"
                  className="font-medium uppercase text-[#bcbcbc] mb-3 xl:mb-5 2xl:mb-6 3xl:mb-8"
                >
                  {footerData?.contactInfo?.title}
                </Text>
                {footerData?.contactInfo?.phone && (
                  <Heading
                    as="div"
                    size="h5"
                    className="font-normal text-white transition [&>a]:hover:text-[#008dd2] mb-1 xl:mb-1.5 2xl:mb-2"
                  >
                    <Link href={`tel:${footerData?.contactInfo?.phone}`}>
                      {footerData?.contactInfo?.phone}
                    </Link>
                  </Heading>
                )}
                {footerData?.contactInfo?.phone && (
                  <Heading
                    as="div"
                    size="h5"
                    className="font-normal text-white transition [&>a]:hover:text-[#008dd2] mb-1 xl:mb-1.5 2xl:mb-2"
                  >
                    <Link href={`mailto:${footerData?.contactInfo?.email}`}>
                      {footerData?.contactInfo?.email}
                    </Link>
                  </Heading>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-black py-2 sm:py-3 xl:py-4 2xl:py-4.5 mt-10 xl:mt-22 2xl:mt-20 3xl:mt-22">
        <div className="container opacity-95">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-y-2 sm:gap-x-5 ">
            <Text as="div" size="p2" className="tracking-wide text-white">
              {parse(footerData?.copyright)}
            </Text>
            <div className="flex flex-wrap gap-x-4 xl:gap-x-6 2xl:gap-x-7 3xl:gap-x-11">
              {socialLinkData?.map((item, index) => (
                <div key={"social_link" + index}>
                  <Button variant="link" size="none" asChild>
                    <a href={item?.link} target="_blank" className="block">
                      <Image
                        src={item?.icon}
                        alt={item?.name}
                        width={18}
                        height={18}
                        className="w-4 sm:w-3 xl:w-3.5 2xl:w-4 3xl:w-4.5 aspect-square block hover:scale-110 transition"
                        unoptimized
                      />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
            <Text
              as="div"
              size="p2"
              className="whitespace-nowrap text-end tracking-wide text-white flex"
            >
              Designed & Developed by:
              <a href="https://www.intersmartsolution.com/" target="_blank">
                <Image
                  src="/images/footer-author.svg"
                  alt="footer-author"
                  width={100}
                  height={20}
                  className="w-[70px] sm:w-[50px] xl:w-[70px] 2xl:w-[85px] inline ml-1"
                  unoptimized
                />
              </a>
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Accordion Item Component
function AccordionItem({
  title,
  children,
  section,
  openSection,
  setOpenSection,
}) {
  const isOpen = openSection === section;

  const toggleAccordion = () => {
    setOpenSection(isOpen ? null : section);
  };

  return (
    <div className="border-t border-[#414141]">
      <button
        onClick={toggleAccordion}
        className="w-full flex items-center justify-between pt-5 pb-3 text-start"
      >
        <Text
          as="h6"
          size="p0"
          className="font-medium uppercase text-[#bcbcbc]"
        >
          {title}
        </Text>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-white transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[500px] mt-5" : "max-h-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
