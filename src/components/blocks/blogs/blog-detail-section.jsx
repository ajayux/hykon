"use client";

import { useState } from "react";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BlogDetailSection({ data }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const socialLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
      bg: "#25D366",
      path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
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

  return (
    <section className="w-full h-auto block pt-[30px] sm:pt-[50px] xl:pt-[74px] 2xl:pt-[96px] 3xl:pt-[100px] bg-[#181818] overflow-hidden">
      <div className="container">
        <div className="w-full block mb-0 py-[15px] sm:py-[15px_20px] xl:py-[17px_25px] 2xl:py-[25px_30px] 3xl:py-[30px_40px]">
          <div className="flex space-between items-center">
            <Heading
              as="h2"
              size="h1"
              className="leading-tight text-white mb-2 xl:mb-2.4 2xl:mb-2.5 3xl:mb-3"
            >
              {parse(data.title)}
            </Heading>
            <Button
              size="lg"
              variant="none"
              className="flex text-[12px] sm:text-[14px] xl:text-[16px] 2xl:text-[19px] 3xl:text-[22px] text-white gap-2 xl:gap-3 2xl:gap-4 3xl:gap-5 px-0 ml-auto hover:text-[#008dd2] transition-colors cursor-pointer"
              onClick={() => setShareOpen(true)}
            >
              <Image
                src={"/images/blog-share-icon.svg"}
                alt={"icon-news-right"}
                width={32}
                height={32}
                className="w-3 sm:w-4.5 xl:w-5 2xl:w-6.5 3xl:w-8 block"
              />
              Share
            </Button>
          </div>
          <div className="flex items-center mb-7 md:mb-8 2xl:mb-9 3xl:mb-10">
            <Text
              as="div"
              size="none"
              className="text-[12px] lg:text-[14px] 2xl:text-[18px] 3xl:text-[24px] leading-tight font-medium text-center text-[#008DD2] [&>before]:absolute"
            >
              {data.date}
            </Text>
            {data?.author && (
              <>
                <div className="w-0.5 xl:w-0.5 3xl:w-0.75 h-3 xl:h-4 2xl:h-5 bg-[#008DD2] mx-2 2xl:mx-5"></div>
                <Text
                  as="div"
                  size="none"
                  className="text-[12px] lg:text-[14px] 2xl:text-[18px] 3xl:text-[24px] leading-tight font-medium text-center text-[#008DD2]"
                >
                  {data.author}
                </Text>
              </>
            )}
          </div>
          <div className="w-full mb-5 xl:mb-7.5 2xl:mb-10 3xl:mb-12.5">
            <div className="w-full aspect-1720/650 overflow-hidden rounded-[6px] sm:rounded-[8px] xl:rounded-[11px] 2xl:rounded-[14px] 3xl:rounded-[18px]">
              <Image
                src={data?.media?.path}
                alt={data?.media?.alt}
                width={1720}
                height={650}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
          <div className="typography [--text-color:#fff]  ">
            {parse(data?.description??"")}
          </div>
          <div className="clear-both" />
          <div className="w-full my-8 xl:mt-10.5 xl:mb-9.5 2xl:mt-13.5 2xl:mb-12 3xl:mt-17.5 3xl:mb-15">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 xl:gap-5 2xl:gap-6.25 3xl:gap-7.5">
              {data?.media?.gallery?.map((item, index) => (
                <div
                  key={index}
                  className="aspect-[845/460] overflow-hidden rounded-[6px] sm:rounded-[8px] xl:rounded-[11px] 2xl:rounded-[14px] 3xl:rounded-[18px]"
                >
                  <Image
                    src={item.path}
                    alt={item.alt}
                    width={845}
                    height={460}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* <div className="typography [--text-color:#fff]  ">
            {parse(data?.text)}
          </div> */}
        </div>
      </div>

      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="bg-[#1e1e1e] border-[#333] text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-semibold">
              Share
            </DialogTitle>
          </DialogHeader>

          {/* Social share icons */}
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

          {/* Copy link */}
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
    </section>
  );
}
