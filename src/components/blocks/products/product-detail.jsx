import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetail({ data }) {
  return (
    <section className="w-full h-auto block bg-[#181818] py-12 xl:py-16 2xl:py-18 3xl:py-22.5">
      <div className="container lg:px-6 xl:px-6.5 2xl:px-8 3xl:px-10">
        <div className="flex flex-wrap items-center gap-x-10 sm:gap-x-15 xl:gap-x-[120px] 2xl:gap-x-[170px] 3xl:gap-x-[190px] mb-6 sm:mb-10 xl:mb-15 2xl:mb-18 3xl:mb-22">
          <div className="w-full lg:w-[440px] xl:w-[468px] 2xl:w-[555px] 3xl:w-[676px]">
            <div className="w-full bg-[#171f24] px-4 sm:px-6 xl:px-9 2xl:px-11 3xl:px-12.5 py-6 sm:py-8 xl:py-12.5 2xl:py-13 3xl:py-17 rounded-[10px] 2xl:rounded-[13px] 3xl:rounded-[16px]">
              left
            </div>
          </div>

          <div className="w-full lg:flex-1 max-lg:mb-5">
            <div className="flex flex-wrap justify-between mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6">
              <div className="flex flex-wrap items-center gap-x-3 xl:gap-x-4 2xl:gap-x-5 3xl:gap-x-6">
                <Heading
                  as="h2"
                  size="h2"
                  className="xl:text-[30px] 2xl:text-[36px] 3xl:text-[44px] text-white"
                >
                  {parse(data?.title)}
                </Heading>
                <Text
                  as="div"
                  size="p2"
                  className="leading-tight text-white bg-[#008dd2] px-2 xl:px-2.5 2xl:px-3 3xl:px-4.5 py-0.5 xl:py-1 2xl:py-1.5 3xl:py-2 rounded-full"
                >
                  {data?.pricing?.formattedDiscountPercentage}
                </Text>
              </div>
              <div>
                <Button
                  size="lg"
                  variant="none"
                  className="flex text-[12px] sm:text-[12px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[19px] text-[#bcbcbc] gap-1 xl:gap-1.5 2xl:gap-2 3xl:gap-2.5 px-0 ml-auto hover:text-[#008dd2] transition-colors cursor-pointer"
                >
                  <Image
                    src={"/images/blog-share-icon.svg"}
                    alt={"icon-news-right"}
                    width={32}
                    height={32}
                    className="w-3 xl:w-4.5 2xl:w-5 3xl:w-6 block opacity-70"
                  />
                  Share
                </Button>
              </div>
            </div>
            <div className="w-full mb-3 xl:mb-3.5 2xl:mb-4 3xl:mb-5">
              <Text
                as="div"
                size="p0"
                className="text-[#ccc] line-through mb-1 xl:mb-1.5"
              >
                {"MRP-"}
                {data?.pricing?.mrp}
                {"/-"}
              </Text>
              <div className="text-[16px] sm:text-[18px] lg:text-[19px] 2xl:text-[23px] 3xl:text-[28px] leading-tight font-semibold text-[#008dd2] mb-1 xl:mb-1.5">
                {data?.pricing?.currencySymbol}
                {data?.pricing?.sellingPrice}
                {"/-"}
              </div>
              <Text as="div" size="p1" className="text-[#878787]">
                {data?.pricing?.taxLabel}
              </Text>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 xl:gap-x-3.5 2xl:gap-x-4 3xl:gap-x-4.5 mb-4 xl:mb-5 2xl:mb-6 3xl:mb-7">
              {data?.deliveryInfo && (
                <Button
                  size="lg"
                  variant="none"
                  className="underline text-[#ccc] px-1"
                  asChild
                >
                  <Link href={data?.deliveryInfo?.url} target="_blank">
                    <Image
                      src={"/images/icon-delivery.svg"}
                      alt={"icon-delivery"}
                      width={16}
                      height={12}
                      className="w-3 xl:w-4 2xl:w-4.5 3xl:w-5.5"
                      unoptimized
                    />
                    {data?.deliveryInfo?.label}
                  </Link>
                </Button>
              )}

              <Button
                size="lg"
                variant="outline"
                className="text-white min-w-[100px] xl:min-w-[110px] 2xl:min-w-[130px] 3xl:min-w-[150px] bg-[#008dd2] pl-4 xl:pl-5"
              >
                Buy Now
                <div className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-white rounded-full flex items-center justify-center ml-auto">
                  <Image
                    src={"/images/icon-arrow-right-blue.svg"}
                    alt={"icon-arrow-right-blue"}
                    width={18}
                    height={13}
                    className="w-1/2"
                    unoptimized
                  />
                </div>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-white min-w-[120px] xl:min-w-[135px] 2xl:min-w-[160px] 3xl:min-w-[190px] pl-4 xl:pl-5"
              >
                Request a Quote
                <span className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
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
            </div>

            <div className="w-full bg-[#2d2d2d] border border-[#484848] rounded-[8px] 2xl:rounded-[9px] 3xl:rounded-[11px] p-3 xl:p-4 2xl:p-5 3xl:p-6">
              <div className="text-[12px] sm:text-[12px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[19px] leading-normal font-normal text-[#d3d3d3] mb-1 xl:mb-2 2xl:mb-3 3xl:mb-4">
                Variants
              </div>
              <div className="flex flex-wrap items-center -mx-1 2xl:-mx-1.5 3xl:-mx-2 [&>div]:px-1 2xl:[&>div]:px-1.5 3xl:[&>div]:px-2 [&>div]:py-1 xl:[&>div]:py-1.5 2xl:[&>div]:py-2 3xl:[&>div]:py-2.5">
                {data?.variants?.items?.map((variant) => (
                  <div key={variant?.id} className="w-1/3 sm:w-1/4 lg:w-1/5">
                    <Button
                      size="none"
                      variant="none"
                      className={cn(
                        "text-[12px] lg:text-[10px] 2xl:text-[12px] 3xl:text-[15px] leading-none font-normal truncate text-[#c6c6c6] w-full h-7 2xl:h-8 3xl:h-9 bg-[#333] rounded-full border border-[#333] hover:bg-[#008dd2] hover:text-white",
                        !variant?.isAvailable &&
                          "opacity-50 cursor-not-allowed grayscale-100 pointer-events-none",
                        data?.slug === variant?.slug &&
                          "border-white/60 text-white pointer-events-none",
                      )}
                    >
                      {variant?.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Tabs
            defaultValue={data?.contentTabs?.[0]?.id}
            className="w-full mb-6 xl:mb-7.5 2xl:mb-9 3xl:mb-11"
          >
            <TabsList
              variant="line"
              className="gap-x-3 xl:gap-x-4 2xl:gap-x-5 3xl:gap-x-6 mb-5 xl:mb-7 2xl:mb-8 3xl:mb-9 group-data-[orientation=horizontal]/tabs:h-12 2xl:group-data-[orientation=horizontal]/tabs:h-13 3xl:group-data-[orientation=horizontal]/tabs:h-13"
            >
              {data?.contentTabs?.map((tab) => (
                <TabsTrigger
                  key={"TabsTrigger" + tab?.id}
                  value={tab?.id}
                  className={cn(
                    "text-[13px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px] text-white px-2 sm:px-4 xl:px-6 2xl:px-7 3xl:px-9 relative z-0 rounded-none border-0 transition-all dark:data-[state=active]:text-[#008dd2] dark:text-white dark:hover:text-white dark:data-[state=active]:border-[#008dd2]",
                    "after:bg-white data-[state=active]:after:bg-[#008dd2] after:opacity-100",
                  )}
                >
                  {tab?.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {data?.contentTabs?.map((tab) => (
              <TabsContent
                key={"TabsContent" + tab?.id}
                value={tab?.id}
                className=""
              >
                {tab?.id === 2 ? (
                  <div className="w-full bg-[#262626] border border-[#424242] rounded-[8px] 2xl:rounded-[9px] 3xl:rounded-[11px] px-5 xl:px-7 2xl:px-8 3xl:px-10 py-3 xl:py-4 2xl:py-5 3xl:py-6">
                    <div className="typography [--text-color:#fff] [&_h5]:text-[#008dd2]  [&_td:nth-child(odd)]:text-white/60">
                      {parse(tab?.description)}
                    </div>
                  </div>
                ) : (
                  <div className="typography [--text-color:#fff] xl:max-w-10/12 [&_h5]:text-[#008dd2]  [&_td:nth-child(odd)]:text-[#333]">
                    {parse(tab?.description)}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex flex-wrap items-center gap-x-3 xl:gap-x-3.5 2xl:gap-x-4 3xl:gap-x-4.5 mb-4 xl:mb-5 2xl:mb-6 3xl:mb-7">
            {data?.deliveryInfo && (
              <Button
                size="lg"
                variant="outline"
                className="text-white min-w-[120px] xl:min-w-[135px] 2xl:min-w-[160px] 3xl:min-w-[190px] pl-4 xl:pl-5"
              >
                Request a Quote
                <span className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
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
            )}
          </div>
        </div>

        {data?.items?.map((item) => (
          <div
            key={item?.id}
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
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
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
                      {
                        label: "View Products",
                        url: item?.slug,
                      },
                      {
                        label: item?.button?.label,
                        url: item?.button?.url,
                      },
                    ].map((btn) => (
                      <Button
                        key={btn?.label}
                        size="lg"
                        variant="outline"
                        className="text-white min-w-[110px] xl:min-w-[130px] 2xl:min-w-[155px] 3xl:min-w-[190px] pl-4"
                        asChild
                      >
                        <Link href={btn?.url} target="_blank">
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
                <div className="w-full mt-8 xl:mt-12 2xl:mt-14 3xl:mt-18">
                  <Text
                    as="div"
                    size="p0"
                    className="text-white mb-1.5 xl:mb-2 2xl:mb-3 3xl:mb-4"
                  >
                    Available options {"("}
                    <Link
                      href={item?.slug}
                      target="_blank"
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
                        <div className="w-full h-full bg-[#212121] rounded-[7px] 2xl:rounded-[8px] 3xl:rounded-[10px] p-2 xl:p-2.5 2xl:p-3 3xl:p-3.5 border border-[#008dd2] bg-[#282828] flex flex-col justify-between transition-all duration-500 hover:bg-[#222222]">
                          <div>
                            <Text
                              as="div"
                              size="p1"
                              className="text-white mb-3 xl:mb-4 2xl:mb-5 2xl:mb-6 3xl:mb-7"
                            >
                              {parse(variant?.title)}
                            </Text>
                          </div>
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
