"use client";

import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

const scrollToSection = (e, slug) => {
  e.preventDefault();
  const el = document.getElementById(slug);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }
};

const getProductUrl = (slug) => {
  return `/products?product_slug=${slug}`;
};

export default function CategoriesDetail({ data }) {
  return (
    <section className="w-full h-auto block bg-[#181818] py-12 xl:py-16 2xl:py-18 3xl:py-22.5">
      <div className="container">
        <div className="flex flex-wrap items-center gap-x-10 sm:gap-x-15 xl:gap-x-[120px] 2xl:gap-x-[170px] 3xl:gap-x-[190px] mb-6 sm:mb-10 xl:mb-15 2xl:mb-18 3xl:mb-22">
          <div className="w-full lg:flex-1 max-lg:mb-5">
            <Heading
              as="h2"
              size="h1"
              className="leading-tight text-white mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6"
            >
              {parse(data?.title)}
            </Heading>
            <Text
              as="div"
              size="p1"
              className="text-white mb-6 xl:mb-10 2xl:mb-11 3xl:mb-13"
            >
              {parse(data?.description)}
            </Text>

            {data?.button?.url === null && (
              <Button
                size="lg"
                variant="outline"
                className="text-white min-w-[100px] xl:min-w-[115px] 2xl:min-w-[140px] 3xl:min-w-[170px] pl-4"
                asChild
              >
                <a href={data?.button?.url ?? ""} target="_blank">
                  Download Brochure
                  <div className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
                    <Image
                      src={"/images/icon-arrow-right-white.svg"}
                      alt={"icon-arrow-right-white"}
                      width={18}
                      height={13}
                      className="w-1/2"
                      unoptimized
                    />
                  </div>
                </a>
              </Button>
            )}
          </div>

          <div className="w-full lg:w-[420px] xl:w-[495px] 2xl:w-[595px] 3xl:w-[740px]">
            <div className="w-full bg-[#171f24] px-4 sm:px-6 xl:px-9 2xl:px-11 3xl:px-12.5 py-6 sm:py-8 xl:py-12.5 2xl:py-13 3xl:py-17 rounded-[10px] 2xl:rounded-[13px] 3xl:rounded-[16px]">
              <div className="typography [--text-color:#fff] [&_ul]:mt-0 [&_ul]:mb-6 xl:[&_ul]:mb-10 2xl:[&_ul]:mb-14 3xl:[&_ul]:mb-16 [&_ul]:flex [&_ul]:flex-wrap [&_li]:w-full sm:[&_li]:w-[44%]">
                {parse(data?.specification?.description)}
                {data?.items?.length > 0 && (
                  <ul>
                    {data?.items?.map((item) => (
                      <li key={item?.id}>
                        <a
                          href={`#${item?.slug}`}
                          onClick={(e) => scrollToSection(e, item?.slug)}
                        >
                          {parse(item?.title)}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-4 xl:gap-6 2xl:gap-7.5 3xl:gap-8.5">
                {data?.specification?.specificationMedia?.map((item) => (
                  <div
                    key={item?.id}
                    className="w-10 sm:w-13 xl:w-15 2xl:w-18 3xl:w-22"
                  >
                    <Image
                      src={item?.path}
                      alt={item?.alt}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain transition-all duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {data?.items?.map((item) => (
          <div
            key={item?.slug}
            id={item?.slug}
            className="w-full my-2 sm:my-3 xl:my-5 2xl:my-6 3xl:my-7"
          >
            <div className="w-full bg-[#212121] rounded-[8px] 2xl:rounded-[9px] 3xl:rounded-[11px] px-4 sm:px-8 xl:px-12 2xl:px-15 3xl:px-17.5 py-10 xl:py-15 2xl:py-18 3xl:py-22.5">
              <div className="flex flex-wrap items-center gap-x-10 lg:gap-x-[90px] 2xl:gap-x-[100px] 3xl:gap-x-[120px]">
                <div className="w-full sm:w-[268px] lg:w-[300px] xl:w-[320px] 2xl:w-[384px] 3xl:w-[470px] max-w-[268px] sm:max-w-full aspect-524/250 overflow-hidden max-lg:mb-5">
                  <Image
                    src={item?.media?.path}
                    alt={item?.media?.alt}
                    width={524}
                    height={250}
                    className="w-full h-full object-contain transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div className="w-full lg:flex-1">
                  <Heading
                    as="h2"
                    size="none"
                    className="text-[13px] sm:text-[14px] lg:text-[15px] 2xl:text-[18px] 3xl:text-[22px] leading-tight font-semibold text-white mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5"
                  >
                    {parse(item?.title)}
                  </Heading>
                  <div className="typography [--text-color:#fff] [&_ul]:mt-0 [&_ul]:mb-6 xl:[&_ul]:mb-7.5 2xl:[&_ul]:mb-8 3xl:[&_ul]:mb-9 [&_ul]:flex [&_ul]:flex-wrap [&_li]:w-full sm:[&_li]:w-[44%] [&_li]:my-1 lg:[&_li]:my-1.5">
                    {parse(item?.description)}
                  </div>
                  <div className="flex gap-x-3 lg:gap-x-5 2xl:gap-x-6 3xl:gap-x-7.5">
                    {[
                      ...(item?.variants?.items?.length > 0
                        ? [
                            {
                              label: "View Products",
                              url: getProductUrl(item?.slug),
                            },
                          ]
                        : []),
                      ...(item?.button?.url
                        ? [
                            {
                              label: item?.button?.label,
                              url: item?.button?.url,
                              target: "blank",
                            },
                          ]
                        : []),
                    ].map((btn) => (
                      <Button
                        key={btn?.label}
                        size="lg"
                        variant="outline"
                        className="text-white min-w-[110px] xl:min-w-[130px] 2xl:min-w-[155px] 3xl:min-w-[190px] pl-4"
                        asChild
                      >
                        <Link
                          href={btn?.url ?? ""}
                          target={btn?.target === "blank" ? "_blank" : ""}
                        >
                          {btn?.label}
                          <div className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
                            <Image
                              src={"/images/icon-arrow-right-white.svg"}
                              alt={"icon-arrow-right-white"}
                              width={18}
                              height={13}
                              className="w-1/2"
                              unoptimized
                            />
                          </div>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>

                {item?.variants?.items?.length > 0 && (
                  <div className="w-full mt-8 xl:mt-12 2xl:mt-14 3xl:mt-18">
                    <Text
                      as="div"
                      size="p0"
                      className="text-white mb-1.5 xl:mb-2 2xl:mb-3 3xl:mb-4"
                    >
                      Available options {"("}
                      <Link
                        href={getProductUrl(item?.slug)}
                        className="underline hover:text-[#008dd2]"
                      >
                        {item?.variants?.title}
                      </Link>
                      {")"}
                    </Text>
                    <div className="flex flex-wrap -mx-1 xl:-mx-1.5 2xl:-mx-2 3xl:-mx-2.5 [&>*]:p-1 xl:[&>*]:p-1.5 2xl:[&>*]:p-2 3xl:[&>*]:p-2.5">
                      {item?.variants?.items?.map((variant) => (
                        <div
                          key={variant?.id}
                          className={cn(
                            "w-1/2 min-[468px]:w-1/3 sm:w-1/4 lg:w-1/8",
                          )}
                        >
                          <Link
                            href={`/products/${variant?.slug}`}
                            className="w-full h-full bg-[#212121] rounded-[7px] 2xl:rounded-[8px] 3xl:rounded-[10px] p-2 xl:p-2.5 2xl:p-3 3xl:p-3.5 border border-[#008dd2] bg-[#282828] flex flex-col justify-between transition-all duration-500 hover:bg-[#222222]"
                          >
                            <div>
                              <Text
                                as="div"
                                size="p1"
                                className="text-white mb-3 xl:mb-4 2xl:mb-5 2xl:mb-6 3xl:mb-7"
                              >
                                {parse(variant?.title)}
                              </Text>
                            </div>

                            {parseInt(variant?.price) > 0 && (
                              <div>
                                <div className="text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-tight font-normal text-white/90 line-through mb-0.5">
                                  {"MRP-"}
                                  {variant?.mrp}
                                  {"/-"}
                                </div>
                                <div className="text-[14px] sm:text-[12px] lg:text-[13px] 2xl:text-[16px] 3xl:text-[19px] leading-tight font-semibold text-[#008dd2]">
                                  {variant?.price}
                                  {"/-"}
                                </div>
                              </div>
                            )}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
