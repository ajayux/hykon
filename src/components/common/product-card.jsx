"use client";

import Image from "next/image";
import { Heading, Text } from "../utils/typography";
import { Button } from "../ui/button";
import Link from "next/link";
import parse from "html-react-parser";

export default function ProductCard({ item, variant = "default", onSelect }) {
  if (variant === "variant-1") {
    return (
      <div>
        <Link href={`/products/${item?.slug}`}>
          <div
            className="group w-full h-auto px-4 xl:px-8 3xl:px-10 py-4 xl:py-6 3xl:py-7.5 bg-[#212121] border border-[#212121] rounded-[8px] 2xl:rounded-[9px] 3xl:rounded-[11px] transition-all duration-500 hover:border-[#008dd2] cursor-pointer"
            onClick={() => onSelect?.(item?.product_slug)}
          >
            <div className="w-full aspect-145/75 overflow-hidden mb-2 xl:mb-5 3xl:mb-6 mt-1 xl:mt-2 3xl:mt-4">
              <Image
                src={item?.media?.path}
                alt={item?.media?.alt || ""}
                width={145}
                height={75}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 flex flex-col items-center justify-between">
              <Heading
                as="div"
                size="h5"
                className="line-clamp-1 font-medium text-center text-white mb-2 xl:mb-2.5 2xl:mb-3 3xl:mb-3.5"
                title={item?.title}
              >
                {item?.title}
              </Heading>
              
              {parseInt(item?.price) > 0 &&(
                
              <div className="mb-1 xl:mb-2 2xl:mb-2.5 3xl:mb-3">
                <div className="text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-tight font-normal text-center text-white/90 line-through mb-0.5">
                  {"MRP-"}
                  {item?.mrp}
                  {"/-"}
                </div>
                <div className="text-[14px] sm:text-[12px] lg:text-[13px] 2xl:text-[16px] 3xl:text-[19px] leading-tight font-semibold text-center text-[#008dd2]">
                  {"₹"}
                  {item?.price}
                  {"/-"}
                </div>
              </div>
              ) }

              <div>
                <Button
                  size="lg"
                  variant="none"
                  className="text-[9.8px] 2xl:text-[11.7px] 3xl:text-[14.3px] text-white min-w-[80px] sm:min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] h-auto px-0"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <div className="w-4 xl:w-4.5 2xl:w-5.5 3xl:w-6 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
                      <Image
                        src={"/images/icon-arrow-right-white.svg"}
                        alt={"icon-arrow-right-white"}
                        width={18}
                        height={13}
                        className="w-1/2"
                        unoptimized
                      />
                    </div>
                    View Details
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="group w-full h-auto px-4 xl:px-8 3xl:px-10 py-4 xl:py-6 3xl:py-8 transition-all duration-500">
      <Link href={`/products?product_slug=${item?.slug}` || "#"}>
        <div className="w-full lg:max-w-[106px] 2xl:max-w-[125px] 3xl:max-w-[154px] aspect-10/8 overflow-hidden mb-2 xl:mb-5 3xl:mb-6 transition-transform duration-700 group-hover:scale-110">
          <Image
            src={item?.media?.path}
            alt={item?.media?.alt || ""}
            width={126}
            height={90}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <Heading
            as="div"
            size="h5"
            className="line-clamp-1 font-medium text-white mb-2 xl:mb-2.5 2xl:mb-4.5 3xl:mb-5"
            title={item?.title || item?.name}
          >
            {item?.title || item?.name}
          </Heading>
          <Text
            as="div"
            size="none"
            className="text-[10px] xl:text-[9.5px] 2xl:text-[11px] 3xl:text-[13.4px] leading-relaxed line-clamp-3 font-normal text-white mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6.5"
          >
            {parse(item?.description || "")}
          </Text>
          <div>
            <Button
              size="lg"
              variant="none"
              className="text-[9.8px] 2xl:text-[11.7px] 3xl:text-[14.3px] text-white min-w-[80px] sm:min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] h-auto justify-start px-0"
              // asChild
            >
              {/* <Link href={`/products?product_slug=${item?.slug}` || "#"}> */}
              <div className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
                <Image
                  src={"/images/icon-arrow-right-white.svg"}
                  alt={"icon-arrow-right-white"}
                  width={18}
                  height={13}
                  className="w-1/2"
                  unoptimized
                />
              </div>
              View Details
              {/* </Link> */}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
