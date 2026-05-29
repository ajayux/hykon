"use client";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import { cn, ParsedContent, getYoutubeVideoId } from "@/lib/utils";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Share2 } from "lucide-react";

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
  "h-[285px] sm:h-[320px] xl:h-[390px] 2xl:h-[475px] 3xl:h-[530px]";

export default function ProductDetail({ data, themeProps }) {
  const styleVars = {
    "--theme-bg": themeProps?.backgroundColor || "#212121",
    "--theme-bg-alt": themeProps?.backgroundColor || "#333",
    "--theme-fg": themeProps?.foregroundColor || "#fff",
    "--theme-fg-50": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}80`
      : "#bcbcbc",
    "--theme-fg-80": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}cc`
      : "#ccc",
    "--theme-fg-50-alt": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}80`
      : "#878787",
    "--theme-fg-80-alt": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}cc`
      : "#d3d3d3",
    "--theme-border-20": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}33`
      : "#3e3e3e",
    "--theme-border-20-alt": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}33`
      : "#333",
    "--theme-color": themeProps?.themeColor || "#008dd2",
  };

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
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const socialLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
      bg: "#25D366",
      path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      bg: "#1877F2",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      bg: "#0A66C2",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
  ];

  function handleCopy() {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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
    <section
      style={styleVars}
      className={cn(
        "w-full h-auto block py-12 xl:py-16 2xl:py-18 3xl:py-22.5",
        "bg-[var(--theme-bg)]",
      )}
    >
      <div className="container lg:px-6 xl:px-6.5 2xl:px-8 3xl:px-10">
        <div className="flex flex-wrap items-center gap-x-10 sm:gap-x-15 xl:gap-x-[72px] 2xl:gap-x-[86px] 3xl:gap-x-[105px] mb-6 sm:mb-10 xl:mb-15 2xl:mb-18 3xl:mb-22">
          <div className="w-full lg:w-[468px] xl:w-[510px] 2xl:w-[620px] 3xl:w-[700px] max-lg:max-w-[420px] max-lg:mb-6">
            <div
              className={cn(
                "w-full flex flex-wrap max-lg:flex-direction-row-reverse",
              )}
            >
              <div className="w-[60px] sm:w-[100px] xl:w-[115px] 2xl:w-[140px] 3xl:w-[160px] mask-[linear-gradient(to_bottom,transparent_0%,white_5%,white_95%,transparent_100%)]">
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
                            "w-full h-auto aspect-[540/540] bg-[#212121] rounded-[7px] 2xl:rounded-[8px] 3xl:rounded-[10px] overflow-hidden border transition select-none",
                            index === selectedIndex
                              ? " border-white border-[var(--theme-color)]"
                              : "border-[#888] border-[var(--theme-border-20)]",
                            "bg-[var(--theme-bg)]",
                          )}
                        >
                          <Image
                            src={item?.thumbnailUrl}
                            alt={item?.alt || "thumb"}
                            width={512}
                            height={512}
                            className="w-full h-full object-contain"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "w-[calc(100%-60px)] sm:w-[calc(100%-100px)] xl:w-[calc(100%-115px)] 2xl:w-[calc(100%-140px)] 3xl:w-[calc(100%-160px)]",
                )}
              >
                <div className="overflow-hidden" ref={emblaMainRef}>
                  <div
                    className={cn(
                      "h-auto flex touch-pan-y touch-pinch-zoom"
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
                            "w-full h-auto aspect-[540/540] block bg-[#2d2d2d] rounded-[7px] 2xl:rounded-[8px] 3xl:rounded-[10px] overflow-hidden border border-[#2d2d2d] transition select-none cursor-pointer",
                            "bg-[var(--theme-bg-alt)]",
                            "border-[var(--theme-border-20)]",
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
                  </div>
                </div>
              </div>
            </div>
          </div>

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

          <Dialog open={shareOpen} onOpenChange={setShareOpen}>
            <DialogContent className="bg-[#1e1e1e] border-[#333] text-white max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-white text-lg font-semibold">
                  Share
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center gap-6 py-2">
                {socialLinks.map(({ label, href, bg, path }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <span
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: bg }}
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                        <path d={path} />
                      </svg>
                    </span>
                    <span className="text-xs text-gray-400">{label}</span>
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2 bg-[#2a2a2a] rounded-lg px-3 py-2 overflow-hidden">
                <span className="flex-1 text-sm text-gray-300 truncate min-w-0">
                  {currentUrl}
                </span>
                <button
                  onClick={handleCopy}
                  className="shrink-0 text-sm font-medium text-[#008DD2] hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="w-full lg:flex-1">
            <div className="w-full xl:max-w-11/12">
              <div className="flex flex-wrap sm:flex-nowrap sm:items-center justify-between mb-3 xl:mb-3 2xl:mb-4 3xl:mb-5 max-sm:flex-col-reverse">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-2 xl:gap-x-3 2xl:gap-x-4 3xl:gap-x-5 gap-y-1 xl:gap-y-2">
                  <Heading
                    as="h2"
                    size="h2"
                    className={cn(
                      "xl:text-[30px] 2xl:text-[36px] 3xl:text-[44px] leading-tight text-white",
                      "text-[var(--theme-fg)]",
                    )}
                  >
                    {parse(data?.title)}
                  </Heading>
                  <Text
                    as="div"
                    size="p2"
                    className={cn(
                      "leading-tight bg-[#008dd2] px-2 xl:px-2.5 2xl:px-3 3xl:px-4.5 py-0.5 xl:py-1 2xl:py-1.5 3xl:py-2 rounded-full",
                      "text-[var(--theme-fg)] text-white bg-[var(--theme-color)]",
                    )}
                  >
                    {data?.pricing?.formattedDiscountPercentage}
                  </Text>
                </div>
                <div className="xl:mx-4 2xl:mx-5 3xl:mx-6 max-sm:my-2">
                  <Button
                    size="lg"
                    variant="none"
                    onClick={() => setShareOpen(true)}
                    className={cn(
                      "flex text-[13px] sm:text-[12px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[19px] text-[#bcbcbc] gap-1 xl:gap-1.5 2xl:gap-2 3xl:gap-2.5 px-0 ml-auto hover:text-[#008dd2] transition-colors cursor-pointer hover:scale-100 hover:translate-y-0",
                      "text-[var(--theme-fg-50)] hover:text-[var(--theme-color)]",
                    )}
                  >
                    {/* <Image
                      src={"/images/blog-share-icon.svg"}
                      alt={"icon-news-right"}
                      width={32}
                      height={32}
                      className="w-3 xl:w-4.5 2xl:w-5 3xl:w-6 block opacity-70"
                    /> */}
                    <Share2 className="size-3.5 sm:size-3 xl:size-4.5 2xl:size-5 3xl:size-6 block opacity-70 text-[var(--theme-fg-50)]" />
                    Share
                  </Button>
                </div>
              </div>
              <div className="w-full mb-5 sm:mb-3 xl:mb-3.5 2xl:mb-4 3xl:mb-5">
                <Text
                  as="div"
                  size="p0"
                  className={cn(
                    "text-[#ccc] line-through mb-0.5 xl:mb-1",
                    "text-[var(--theme-fg-80)]",
                  )}
                >
                  {"MRP-"}
                  {data?.pricing?.mrp}
                  {"/-"}
                </Text>
                <div
                  className={cn(
                    "text-[16px] sm:text-[18px] lg:text-[19px] 2xl:text-[23px] 3xl:text-[28px] leading-tight font-semibold text-[#008dd2] mb-1 xl:mb-1.5",
                    "text-[var(--theme-color)]",
                  )}
                >
                  {data?.pricing?.currencySymbol}
                  {data?.pricing?.sellingPrice}
                  {"/-"}
                </div>
                <Text
                  as="div"
                  size="p1"
                  className={cn(
                    "text-[#878787]",
                    "text-[var(--theme-fg-50-alt)]",
                  )}
                >
                  {data?.pricing?.taxLabel}
                </Text>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 xl:gap-x-3.5 2xl:gap-x-4 3xl:gap-x-4.5 gap-y-3 mb-5 xl:mb-5 2xl:mb-6 3xl:mb-7">
                {data?.deliveryInfo && (
                  <Button
                    size="lg"
                    variant="none"
                    className={cn(
                      "underline text-[#ccc] px-1 max-sm:w-full max-sm:justify-start",
                      `text-[${themeProps?.foregroundColor ? themeProps.foregroundColor + "/80" : "#ccc"}]`,
                    )}
                    asChild
                  >
                    <Link href={`/delivery-polices`}>
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

                {data?.pricing?.shophifyUrl && (
                  <Link href={data?.pricing?.shophifyUrl} target="_blank">
                    <Button
                      size="lg"
                      variant="outline"
                      className={cn(
                        "min-w-[100px] xl:min-w-[110px] 2xl:min-w-[130px] 3xl:min-w-[150px] pl-4 xl:pl-5",
                        "text-white bg-[var(--theme-color)] hover:bg-[var(--theme-color)]",
                      )}
                    >
                      Buy Now
                      <span
                        className={cn(
                          "w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-white rounded-full flex items-center justify-center ml-auto border border-[#008dd2]",
                          "border-[var(--theme-color)]",
                        )}
                      >
                        {/* <Image
                          src={"/images/icon-arrow-right-blue.svg"}
                          alt={"icon-arrow-right-blue"}
                          width={18}
                          height={13}
                          className="w-1/2"
                          unoptimized
                        /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="13"
                          viewBox="0 0 18 13"
                          fill="none"
                          className="size-1/2"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.5 5.66016H0.000209808V7.16016H17.5V5.66016Z"
                            fill="var(--theme-color)"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.7499 7.16005C13.2223 7.16005 10.3398 4.05791 10.3398 0.75V0H11.8398V0.75C11.8398 3.26158 14.0825 5.66005 16.7499 5.66005H17.5V7.16005H16.7499Z"
                            fill="var(--theme-color)"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.7499 5.66016C13.2223 5.66016 10.3398 8.76226 10.3398 12.0702V12.8202H11.8398V12.0702C11.8398 9.55866 14.0825 7.16016 16.7499 7.16016H17.5V5.66016H16.7499Z"
                            fill="var(--theme-color)"
                          />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                )}
                <RequestAQuoteDialog>
                  <Button
                    size="lg"
                    variant="outline"
                    className={cn(
                      "text-white min-w-[120px] xl:min-w-[135px] 2xl:min-w-[160px] 3xl:min-w-[190px] pl-4 xl:pl-5",
                      "text-[var(--theme-fg)] hover:bg-[var(--theme-color)]",
                    )}
                  >
                    Request a Quote
                    <span
                      className={cn(
                        "w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto border border-[#008dd2]",
                        "border-[var(--theme-bg)] bg-[var(--theme-color)]",
                      )}
                    >
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
              {data?.variants?.items?.length > 0 && (
                <div
                  className={cn(
                    "w-full bg-[#212121] border border-[#3e3e3e] rounded-[8px] 2xl:rounded-[9px] 3xl:rounded-[11px] px-3 xl:px-4 2xl:px-5 3xl:px-6 py-2 xl:py-3 2xl:py-3.5 3xl:py-4 xl:-translate-x-4 2xl:-translate-x-5 3xl:-translate-x-6",
                    "bg-[var(--theme-bg)] border-[var(--theme-border-20)]",
                  )}
                >
                  <div
                    className={cn(
                      "text-[12px] sm:text-[12px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[19px] leading-normal font-normal text-[#d3d3d3] mb-0.5 xl:mb-1",
                      "text-[var(--theme-fg-80-alt)]",
                    )}
                  >
                    Variants
                  </div>
                  <div className="flex flex-wrap items-center -mx-1 2xl:-mx-1.5 3xl:-mx-2 [&>div]:px-1 2xl:[&>div]:px-1.5 3xl:[&>div]:px-2 [&>div]:py-1 xl:[&>div]:py-1.5 2xl:[&>div]:py-2 3xl:[&>div]:py-2.5">
                    {data?.variants?.items?.map((variant) => (
                      <div
                        key={variant?.id}
                        // className="w-[100px] sm:w-[140px] lg:w-1/5"
                      >
                        <Button
                          size="none"
                          variant="none"
                          title={variant?.name}
                          className={cn(
                            "text-[12px] lg:text-[9px] 2xl:text-[11px] 3xl:text-[13px] leading-none font-normal truncate text-[#c6c6c6] w-full max-w-[268px] sm:max-w-[210px] lg:max-w-[230px] xl:max-w-[268px] 2xl:max-w-[320px] h-9 xl:h-7 2xl:h-8 3xl:h-9 px-2 xl:px-2 2xl:px-3 bg-[#333] rounded-full border border-[#333] hover:bg-[#008dd2] hover:text-white",
                            !variant?.isAvailabile &&
                              "opacity-50 cursor-not-allowed grayscale-100 pointer-events-none",
                            data?.slug === variant?.slug &&
                              "border-white/60 border-[var(--theme-color)] text-white pointer-events-none",
                            "text-[var(--theme-fg-80)] bg-[var(--theme-bg-alt)] border-[var(--theme-border-20-alt)] hover:bg-[var(--theme-color)] hover:text-[var(--theme-fg)] hover:text-white",
                          )}
                          asChild={
                            variant?.isAvailabile &&
                            data?.slug !== variant?.slug
                          }
                        >
                          {variant?.isAvailabile &&
                          data?.slug !== variant?.slug ? (
                            <Link href={`/products/${variant?.slug}`}>
                              <span className="truncate">{variant?.name}</span>
                            </Link>
                          ) : (
                            <span className="truncate">{variant?.name}</span>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                    "text-[13px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px] text-white px-2 sm:px-4 xl:px-6 2xl:px-7 3xl:px-9 relative z-0 rounded-none border-0 transition-all dark:data-[state=active]:text-[#008dd2] dark:text-white dark:hover:text-white hover:text-white dark:data-[state=active]:border-[#008dd2]",
                    "after:bg-white/40 data-[state=active]:after:bg-[#008dd2] data-[state=active]:text-white after:opacity-100",
                    "text-[var(--theme-fg)] dark:text-[var(--theme-fg)] dark:hover:text-[var(--theme-fg)] hover:text-[var(--theme-fg)] dark:data-[state=active]:text-[var(--theme-color)] data-[state=active]:after:bg-[var(--theme-color)] data-[state=active]:text-[var(--theme-fg)] after:bg-[var(--theme-color)]/40",
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
                  <div
                    className={cn(
                      "w-full bg-[#262626] border border-[#424242] rounded-[8px] 2xl:rounded-[9px] 3xl:rounded-[11px] px-3 sm:px-5 xl:px-7 2xl:px-8 3xl:px-10 py-2 sm:py-3 xl:py-4 2xl:py-5 3xl:py-6",
                      "bg-",
                    )}
                  >
                    <div
                      className={cn(
                        "typography [--text-color:#fff] [&_h5]:text-[#008dd2] [&_td:nth-child(odd)]:text-white/60",
                        "[--text-color:var(--theme-fg)]",
                      )}
                    >
                      <ParsedContent html={tab?.description} />
                    </div>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "typography [--text-color:#fff] [&_h5]:text-[#008dd2]  [&_td:nth-child(odd)]:text-[#333]",
                      "[--text-color:var(--theme-fg)]",
                      themeProps?.defaultColor &&
                        "[&_ul>li]:list-disc [&_ul>li]:list-image-none",
                    )}
                  >
                    <ParsedContent html={tab?.description} />
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {data?.specificationVideo?.url && (
            <div className="w-full mb-6 xl:mb-8 2xl:mb-9 3xl:mb-10">
              <div className="w-full max-w-full overflow-hidden">
                <YouTube
                  videoId={getYoutubeVideoId(data?.specificationVideo?.url)}
                  opts={opts}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 xl:gap-3.5 2xl:gap-4 3xl:gap-4.5 mb-4 xl:mb-6 2xl:mb-7 3xl:mb-8">
            {[
              {
                label: "Download Brochure",
                url: data?.brochureInfo?.url ?? "/",
              },
              {
                label: "Warranty Policies",
                url: "/warranty-policies",
              },
              {
                label: " Delivery Policies",
                url: "/delivery-polices",
              },
            ]
              .filter((item) => item?.url)
              .map((item) => (
                <Button
                  key={item?.label}
                  size="lg"
                  variant="outline"
                  className={cn(
                    "text-white min-w-[130px] xl:min-w-[150px] 2xl:min-w-[180px] 3xl:min-w-[215px] pl-4 xl:pl-5",
                    "text-[var(--theme-fg)] hover:bg-[var(--theme-color)]",
                  )}
                  asChild
                >
                  <Link href={item?.url ?? ""} target="_blank">
                    {item?.label}
                    <span
                      className={cn(
                        "w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto border border-[#008dd2]",
                        "border-[var(--theme-bg)] bg-[var(--theme-color)]",
                      )}
                    >
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
          <Text
            as="div"
            size="p1"
            className={cn("italic text-[#dedede]", "text-[var(--theme-fg-80)]")}
          >
            {data?.deliveryInfo?.notes ??
              "*Courier Charges Extra. Conditions Apply."}
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
