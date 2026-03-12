"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Text } from "@/components/utils/typography";
export default function BlogsCard({ item }) {
  return (
    <Link
      href={`/blogs/${item?.slug}`}
      className="group w-full h-full aspect-square rounded-[20px] overflow-hidden bg-[#113B50] block relative z-0"
    >
      <div className="w-full h-full visible group-hover:invisible scale-100 group-hover:scale-90 transition-all duration-300">
        <Image
          src={item?.media?.path}
          alt={item?.media?.alt}
          width={560}
          height={560}
          className="w-full h-full object-cover absolute -z-1 inset-0 transition-transform duration-300 rounded-[20px]"
        />
        <div className="absolute z-0 inset-x-2 sm:inset-x-3 xl:inset-x-6 2xl:inset-x-7 3xl:inset-x-9 bottom-4 sm:bottom-4 xl:bottom-8 2xl:bottom-9.5 3xl:bottom-12">
          <div className="w-full h-auto bg-white/70 rounded-[14px] 2xl:rounded-[16px] 3xl:rounded-[20px] backdrop-blur-[20px] p-4 xl:px-[40px] 2xl:px-[50px] 3xl:px-[60px] py-5 xl:py-[28px] 2xl:py-[32px] 3xl:py-[40px] relative z-0">
            <div className="w-[3px] lg:w-[5px] h-full max-h-1/3 m-auto absolute z-0 left-0 inset-y-0 bg-[#008dd2] rounded-r-lg" />
            <Image
              src={"/images/icon-blog-btn.svg"}
              alt={"icon-blog-btn"}
              width={40}
              height={40}
              className="w-4 xl:w-6.5 2xl:w-8 3xl:w-10 object-contain absolute -z-1 top-1 lg:top-2 2xl:top-2.5 3xl:top-3.5 right-1 lg:right-2 2xl:right-2.5 3xl:right-3.5 transition-transform duration-300"
            />
            <Text
              as="div"
              size="p0"
              className="max-lg:text-[13px] line-clamp-3 font-medium text-[#3c3c3c]"
            >
              {parse(item?.title)}
            </Text>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[95%] sm:max-w-9/10 max-h-[95%] sm:max-h-9/10 h-full m-auto absolute z-0 inset-0 invisible group-hover:visible scale-0 group-hover:scale-100 transition-all duration-300">
        <Image
          src={"/images/icon-blog-btn.svg"}
          alt={"icon-blog-btn"}
          width={40}
          height={40}
          className="w-5 lg:w-6.5 2xl:w-8 3xl:w-10 object-contain absolute z-1 top-3 2xl:top-3.5 3xl:top-4 right-3 2xl:right-3.5 3xl:right-4 transition-transform duration-300 hover:scale-110"
        />
        <div className="w-full h-full rounded-[20px] overflow-hidden relative z-0 bg-black">
          <Image
            src={item?.media?.path}
            alt={item?.media?.alt}
            width={560}
            height={560}
            className="w-full h-full object-cover transition-transform duration-300 opacity-80 [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]"
          />
        </div>
        <div className="absolute z-0 inset-x-0 bottom-0">
          <div className="w-full h-auto p-2 sm:p-4 xl:px-[40px] 2xl:px-[50px] 3xl:px-[60px] xl:py-[28px] 2xl:py-[32px] 3xl:py-[40px] block relative z-0">
            <div className="w-[3px] xl:w-[5px] h-full max-h-1/3 m-auto absolute z-0 left-0 inset-y-0 bg-[#008dd2] rounded-r-lg" />
            <Text
              as="div"
              size="p0"
              className="max-lg:text-[13px] line-clamp-3 font-medium text-white"
            >
              {parse(item?.title)}
            </Text>
          </div>
        </div>
      </div>
    </Link>
    
  );
}