"use client";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

const YouTube = dynamic(() => import("react-youtube"), { ssr: false });
import { useCallback, useEffect, useState } from "react";
const Lightbox = dynamic(() => import("yet-another-react-lightbox"));
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import RequestAQuoteDialog from "@/components/common/request-a-quote-dialog";

const opts = {
  width: "320",
  height: "190",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
    iv_load_policy: 3,
    autoplay: 1,
    cc_load_policy: 0,
    cc_lang_pref: 0,
  },
};

const GALLERY_STYLES =
  "h-[260px] sm:h-[276px] xl:h-[340px] 2xl:h-[420px] 3xl:h-[480px]";

export default function ProductDetail({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    {
      dragFree: false,
      align: "start",
      direction: "ltr",
    },
    [Fade()],
  );
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    axis: "y",
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const [openProduct, setOpenProduct] = useState(false);
  const [indexProduct, setIndexProduct] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);
  return (
    <section className="w-full h-auto block bg-[#212121] py-12 xl:py-16 2xl:py-18 3xl:py-22.5">
      <div className="container lg:px-6 xl:px-6.5 2xl:px-8 3xl:px-10">
        <div className="flex flex-wrap items-center gap-x-10 sm:gap-x-15 xl:gap-x-[72px] 2xl:gap-x-[86px] 3xl:gap-x-[105px] mb-6 sm:mb-10 xl:mb-15 2xl:mb-18 3xl:mb-22">
          <div className="w-full lg:w-[468px] xl:w-[510px] 2xl:w-[620px] 3xl:w-[700px] max-lg:max-w-[420px] max-lg:mb-6">
            <div
              className={cn(
                "w-full flex flex-wrap max-lg:flex-direction-row-reverse",
              )}
            >
              <div className="w-[40px] sm:w-[60px] xl:w-[100px] 2xl:w-[120px] 3xl:w-[140px] mask-[linear-gradient(to_bottom,transparent_0%,white_5%,white_95%,transparent_100%)]">
                <div className="overflow-hidden" ref={emblaThumbsRef}>
                  <div
                    className={cn(
                      "flex flex-col touch-pan-x touch-pinch-zoom",
                      GALLERY_STYLES,
                    )}
                  >
                    {data?.media?.map((item, index) => (
                      <div
                        key={index}
                        className="flex-[0_0_25%] sm:flex-[0_0_33.333%] min-h-0 py-1 xl:py-2.5 2xl:py-3 3xl:py-3.5"
                      >
                        <button
                          onClick={() => onThumbClick(index)}
                          type="button"
                          className={cn(
                            "w-full h-full bg-[#212121] rounded-[7px] 2xl:rounded-[8px] 3xl:rounded-[10px] overflow-hidden border transition select-none",
                            index === selectedIndex
                              ? " border-white"
                              : "border-[#888]",
                          )}
                        >
                          <Image
                            src={item?.thumbnailUrl}
                            alt={item?.alt || "thumb"}
                            width={512}
                            height={512}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "w-[calc(100%-40px)] sm:w-[calc(100%-60px)] xl:w-[calc(100%-100px)] 2xl:w-[calc(100%-120px)] 3xl:w-[calc(100%-140px)]",
                )}
              >
                <div className="overflow-hidden" ref={emblaMainRef}>
                  <div
                    className={cn(
                      "flex touch-pan-y touch-pinch-zoom",
                      GALLERY_STYLES,
                    )}
                  >
                    {data?.media?.map((item, index) => (
                      <div
                        key={item?.id}
                        className="flex-[0_0_100%] min-w-0 p-1 xl:p-2.5 2xl:p-3 3xl:p-3.5 block"
                        onClick={() => {
                          setIndexProduct(index);
                          setOpenProduct(true);
                        }}
                      >
                        <div
                          className={cn(
                            "w-full h-full block bg-[#2d2d2d] rounded-[7px] 2xl:rounded-[8px] 3xl:rounded-[10px] overflow-hidden border border-[#2d2d2d] transition select-none cursor-pointer",
                          )}
                        >
                          {item?.type === "video" ? (
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            >
                              <source src={item?.url} type="video/mp4" />
                            </video>
                          ) : (
                            <Image
                              src={item?.url || "/images/placeholder.jpg"}
                              alt={item?.alt || "main"}
                              width={1080}
                              height={1080}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    ))}

                    <Lightbox
                      open={openProduct}
                      close={() => setOpenProduct(false)}
                      index={indexProduct}
                      slides={data?.media?.map((item) =>
                        item.type === "video"
                          ? {
                              type: "video",
                              width: 1280,
                              height: 720,
                              poster: item?.thumbnailUrl,
                              autoPlay: true,
                              sources: [
                                {
                                  src: item?.url,
                                  type: "video/mp4",
                                },
                              ],
                            }
                          : {
                              src: item?.url,
                            },
                      )}
                      animation={{ fade: 10 }}
                      controller={{
                        closeOnPullDown: true,
                        closeOnBackdropClick: true,
                      }}
                      plugins={[Video, Zoom]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:flex-1">
            <div className="w-full xl:max-w-11/12">
              <div className="flex flex-wrap items-center justify-between mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5">
                <div className="flex flex-wrap items-center gap-x-2 xl:gap-x-3 2xl:gap-x-4 3xl:gap-x-5">
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
                <div className="xl:mx-4 2xl:mx-5 3xl:mx-6">
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
              <div className="w-full mb-5 sm:mb-3 xl:mb-3.5 2xl:mb-4 3xl:mb-5">
                <Text
                  as="div"
                  size="p0"
                  className="text-[#ccc] line-through mb-0.5 xl:mb-1"
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
              <div className="flex flex-wrap items-center gap-x-3 xl:gap-x-3.5 2xl:gap-x-4 3xl:gap-x-4.5 gap-y-3 mb-5 xl:mb-5 2xl:mb-6 3xl:mb-7">
                {data?.deliveryInfo && (
                  <Button
                    size="lg"
                    variant="none"
                    className="underline text-[#ccc] px-1 max-sm:w-full max-sm:justify-start"
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

                <RequestAQuoteDialog>
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
                </RequestAQuoteDialog>
              </div>
              <div className="w-full bg-[#212121] border border-[#3e3e3e] rounded-[8px] 2xl:rounded-[9px] 3xl:rounded-[11px] px-3 xl:px-4 2xl:px-5 3xl:px-6 py-2 xl:py-3 2xl:py-3.5 3xl:py-4 xl:-translate-x-4 2xl:-translate-x-5 3xl:-translate-x-6">
                <div className="text-[12px] sm:text-[12px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[19px] leading-normal font-normal text-[#d3d3d3] mb-0.5 xl:mb-1">
                  Variants
                </div>
                <div className="flex flex-wrap items-center -mx-1 2xl:-mx-1.5 3xl:-mx-2 [&>div]:px-1 2xl:[&>div]:px-1.5 3xl:[&>div]:px-2 [&>div]:py-1 xl:[&>div]:py-1.5 2xl:[&>div]:py-2 3xl:[&>div]:py-2.5">
                  {data?.variants?.items?.map((variant) => (
                    <div
                      key={variant?.id}
                      className="w-[100px] sm:w-[140px] lg:w-1/5"
                    >
                      <Button
                        size="none"
                        variant="none"
                        className={cn(
                          "text-[12px] lg:text-[10px] 2xl:text-[12px] 3xl:text-[15px] leading-none font-normal truncate text-[#c6c6c6] w-full h-7 2xl:h-8 3xl:h-9 px-1 bg-[#333] rounded-full border border-[#333] hover:bg-[#008dd2] hover:text-white",
                          !variant?.isAvailable &&
                            "opacity-50 cursor-not-allowed grayscale-100 pointer-events-none",
                          data?.slug === variant?.slug &&
                            "border-white/60 text-white pointer-events-none",
                        )}
                      >
                        <span className="truncate">{variant?.name}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Tabs
            defaultValue={data?.contentTabs?.[0]?.id}
            className="w-full xl:max-w-[95%] mb-6 xl:mb-7.5 2xl:mb-9 3xl:mb-11"
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
                    "after:bg-white/40 data-[state=active]:after:bg-[#008dd2] after:opacity-100",
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
                  <div className="w-full bg-[#262626] border border-[#424242] rounded-[8px] 2xl:rounded-[9px] 3xl:rounded-[11px] px-3 sm:px-5 xl:px-7 2xl:px-8 3xl:px-10 py-2 sm:py-3 xl:py-4 2xl:py-5 3xl:py-6">
                    <div className="typography [--text-color:#fff] [&_h5]:text-[#008dd2]  [&_td:nth-child(odd)]:text-white/60">
                      {parse(tab?.description)}
                    </div>
                  </div>
                ) : (
                  <div className="typography [--text-color:#fff] [&_h5]:text-[#008dd2]  [&_td:nth-child(odd)]:text-[#333]">
                    {parse(tab?.description)}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {data?.specificationVideo && (
            <div className="w-full mb-6 xl:mb-8 2xl:mb-9 3xl:mb-10">
              <div className="w-full max-w-full overflow-hidden">
                <YouTube videoId="v_jJpnxpPlY" opts={opts} />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 xl:gap-3.5 2xl:gap-4 3xl:gap-4.5 mb-4 xl:mb-6 2xl:mb-7 3xl:mb-8">
            {[
              {
                label: data?.brochureInfo?.label,
                url: data?.brochureInfo?.url,
              },
              {
                label: data?.warrantyInfo?.label,
                url: data?.warrantyInfo?.url,
              },
              {
                label: data?.deliveryInfo?.label,
                url: data?.deliveryInfo?.url,
              },
            ].map((item) => (
              <Button
                key={item?.label}
                size="lg"
                variant="outline"
                className="text-white min-w-[130px] xl:min-w-[150px] 2xl:min-w-[180px] 3xl:min-w-[215px] pl-4 xl:pl-5"
                asChild
              >
                <Link href={item?.url} target="_blank">
                  {item?.label}
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
                </Link>
              </Button>
            ))}
          </div>
          <Text as="div" size="p1" className="italic text-[#dedede]">
            {data?.deliveryInfo?.notes}
          </Text>
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
