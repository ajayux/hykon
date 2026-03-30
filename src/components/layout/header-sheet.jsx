import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { Heading } from "../utils/typography";
import Link from "next/link";
import { useState } from "react";
import HeaderNavigation from "./header-navigation";

export default function HeaderSheet({
  data,
  socialLinkData,
  mobileMenuData,
  navigationData,
}) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet value={open} onValueChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="none"
          size="none"
          className="w-10 lg:w-12 xl:w-11 2xl:w-13.5 3xl:w-16 aspect-square flex items-center justify-center rounded-[7px] 2xl:rounded-[8px] 3xl:rounded-[10px] bg-[#008dd2] hover:scale-100"
        >
          <div className="w-4 xl:w-4.5 2xl:w-5 3xl:w-7 flex flex-col gap-1 3xl:gap-1.5">
            {[1, 2, 3].map((item) => (
              <span
                key={item}
                className={cn(
                  "w-full h-[2px] 3xl:h-[3px] rounded-full transition-all duration-300 ease-in-out origin-center bg-white",
                  item === 3 && "max-w-10/12 ml-auto",
                  open && item === 1 && "rotate-45 translate-y-1.5",
                  open && item === 2 && "opacity-0 translate-x-2",
                  open && item === 3 && "-rotate-45 -translate-y-1.5",
                )}
              />
            ))}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent
        showCloseButton={false}
        className="sm:max-w-[268px] xl:max-w-[320px] 2xl:max-w-[410px] 3xl:max-w-[468px] bg-[#212121] lg:bg-[#008dd2] border-[#212121] lg:border-[#008dd2] lg:px-6 xl:px-10 2xl:px-12.5 3xl:px-15 pt-8 sm:pt-4 xl:pt-12 2xl:pt-16 3xl:pt-24 pb-1 xl:pb-2"
      >
        <SheetClose className="absolute z-0 top-4 lg:top-4 2xl:top-5 right-5 lg:right-6 2xl:right-8">
          {/* <X className="size-6 xl:size-8 3xl:size-8 font-light text-white lg:text-white" /> */}
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-3 xl:size-3.5 3xl:size-4.5"
          >
            <path
              d="M6.99437 6.13542L12.0868 1.04302C12.3322 0.797604 12.3322 0.429479 12.0868 0.184063C11.8414 -0.0613542 11.4732 -0.0613542 11.2278 0.184063L6.13542 5.27646L1.04302 0.184063C0.797604 -0.0613542 0.429479 -0.0613542 0.184063 0.184063C-0.0613542 0.429479 -0.0613542 0.797604 0.184063 1.04302L5.27646 6.13542L0.184063 11.2278C-0.0613542 11.4732 -0.0613542 11.8414 0.184063 12.0868C0.429479 12.3322 0.797604 12.3322 1.04302 12.0868L6.13542 6.99437L11.2278 12.0868C11.4732 12.3322 11.8414 12.3322 12.0868 12.0868C12.3322 11.8414 12.3322 11.4732 12.0868 11.2278L6.99437 6.13542Z"
              fill="white"
            />
          </svg>
        </SheetClose>
        <SheetHeader className="sr-only p-0">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Menu</SheetDescription>
        </SheetHeader>

        <div className="w-full px-4 lg:px-4 2xl:px-5 3xl:px-6">
          <Link href="/">
            <Image
              src={data?.logoWhiteUrl}
              alt={data?.name}
              width={230}
              height={70}
              className="w-[90px] sm:w-[100px] xl:w-[140px] 2xl:w-[180px] 3xl:w-[200px] object-contain hover:scale-105 transition"
              priority
            />
          </Link>
        </div>

        <div className="w-full h-[calc(100vh-280px)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)] py-4 overflow-y-scroll lg:hidden">
          <HeaderNavigation navigationData={navigationData} />
        </div>

        <div className="w-full h-[280px] lg:h-full bg-[#008dd2] lg:bg-transparent flex flex-col align-justify py-3 lg:py-0 [&>div]:px-4 lg:[&>div]:px-4 2xl:[&>div]:px-5 3xl:[&>div]:px-6 overflow-y-auto max-lg:mt-auto">
          <div className="flex-1 flex flex-col justify-center gap-x-5 xl:gap-x-8 2xl:gap-x-9 3xl:gap-x-10 gap-y-3 lg:gap-y-5 xl:gap-y-7.5 2xl:gap-y-10 3xl:gap-y-11">
            <hr className="border-[#008dd2]" />
            <ContactInfoItem
              icon="/images/icon-header-loc.svg"
              title="Locations"
            >
              <div className="flex flex-wrap gap-x-5 xl:gap-x-8 2xl:gap-x-9 3xl:gap-x-10 gap-y-2 xl:gap-y-3.5 2xl:gap-y-4">
                {mobileMenuData?.locations?.map((item) => (
                  <div key={item?.id}>
                    <Button
                      variant="link"
                      size="none"
                      className="text-[12px] lg:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-tight font-normal text-white block"
                      asChild
                    >
                      <span>{item?.city}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ContactInfoItem>
            <hr className="border-[#219cd8]" />
            <ContactInfoItem
              icon="/images/icon-header-call.svg"
              title="Call Us"
            >
              <Button
                variant="link"
                size="none"
                className="text-[12px] lg:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-tight font-normal text-white block"
                asChild
              >
                <Link href={`tel:${mobileMenuData?.phoneNumber}`}>
                  {mobileMenuData?.phoneNumber}
                </Link>
              </Button>
            </ContactInfoItem>
            <hr className="border-[#219cd8]" />
            <ContactInfoItem
              icon="/images/icon-header-mail.svg"
              title="Mail Us"
            >
              <Button
                variant="link"
                size="none"
                className="text-[12px] lg:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-tight font-normal text-white block"
                asChild
              >
                <Link href={`mailto:${mobileMenuData?.email}`}>
                  {mobileMenuData?.email}
                </Link>
              </Button>
            </ContactInfoItem>
            <hr className="border-[#219cd8]" />
          </div>
          <div className="flex flex-wrap gap-x-4 xl:gap-x-6 2xl:gap-x-7 3xl:gap-x-11">
            {socialLinkData?.map((item, index) => (
              <div key={"social_link" + index}>
                <Button variant="link" size="none" asChild>
                  <a
                    href={item?.url}
                    target="_blank"
                    className="block cursor-pointer"
                  >
                    <Image
                      src={item?.iconPath || "/images/placeholder.jpg"}
                      alt={item?.name}
                      width={18}
                      height={18}
                      className="w-4 sm:w-3 xl:w-3.5 2xl:w-4 3xl:w-4.5 aspect-square object-contain block hover:scale-110 transition"
                      unoptimized
                    />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ContactInfoItem({ icon, title, children }) {
  return (
    <div className="w-full">
      <Heading
        as="div"
        size="h5"
        className="leading-none text-white flex items-center gap-x-2 mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6"
      >
        <Image
          src={icon || "/images/placeholder.jpg"}
          alt={title}
          width={25}
          height={25}
          className="w-3 sm:w-4 xl:w-5"
        />
        {title}
      </Heading>
      {children}
    </div>
  );
}
