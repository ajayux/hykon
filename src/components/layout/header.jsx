"use client";

import { Suspense, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import HeaderNavigation from "./header-navigation";
import HeaderSheet from "./header-sheet";
import SearchDialog from "../common/search-dialog";

function HeaderSkeleton() {
  return (
    <header className="w-full h-(--header-y) z-50 top-0 inset-x-0 flex items-center fixed bg-linear-to-b from-black/60 lg:from-black/20 to-transparent">
      <div className="container min-[1240px]:max-w-[1240px] min-[1408px]:max-w-[1408px] min-[1576px]:max-w-[1576px] min-[1720px]:max-w-[1720px]">
        <div className="flex justify-between items-center gap-x-3 lg:gap-x-8 relative z-0">
          {/* Logo skeleton */}
          <div className="w-[140px] xl:w-[152px] 2xl:w-[182px] 3xl:w-[228px]">
            <div className="w-full h-10.75 xl:h-11.75 2xl:h-14 3xl:h-17.5 rounded-md bg-white/10 animate-pulse" />
          </div>

          {/* Nav + actions skeleton */}
          <div className="flex items-center justify-end gap-x-6 lg:gap-x-5 xl:gap-x-7 2xl:gap-x-8 3xl:gap-x-10 bg-transparent lg:bg-white/75 lg:backdrop-blur-[30px] lg:rounded-[14px] 2xl:rounded-2xl 3xl:rounded-[20px] lg:p-3 2xl:p-3.5 3xl:p-4">
            {/* Nav items */}
            <div className="max-lg:hidden flex items-center gap-x-5 xl:gap-x-7 2xl:gap-x-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 rounded bg-black/15 animate-pulse"
                  style={{ width: `${48 + i * 8}px` }}
                />
              ))}
            </div>
            {/* Search icon */}
            <div className="w-4 xl:w-4.5 2xl:w-5 3xl:w-6 h-4 xl:h-4.5 2xl:h-5 3xl:h-6 rounded bg-white/10 animate-pulse" />
            {/* Hamburger / sheet icon */}
            <div className="w-6 h-5 flex flex-col justify-between lg:hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-full h-0.5 rounded bg-white/20 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeaderContent({ data, navigationData, socialLinkData, mobileMenuData }) {
  const pathname = usePathname();
  const isLandingPage =
    pathname === "/landing" || pathname?.startsWith("/landing/");
  const isBusinessCardPage =
    pathname === "/business-card" || pathname?.startsWith("/business-card/");
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll visibility
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious();
    if (typeof current === "number" && typeof previous === "number") {
      const direction = current - previous;
      const atTop = current < 50;
      setVisible(atTop || direction < 0);
      setIsScrolled(!atTop);
    }
  });

  if (isLandingPage || isBusinessCardPage) return null;

  return (
    <motion.header
      initial={{ opacity: 1, y: 0 }}
      animate={{ y: visible ? 0 : "-100%", opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "w-full h-(--header-y) z-50 top-0 inset-x-0 flex items-center transition-[background-color,backdrop-filter,box-shadow] fixed",
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-sm duration-500 delay-100"
          : "bg-linear-to-b from-black/60 lg:from-black/20 to-transparent duration-300 delay-0",
      )}
    >
      <div className="container min-[1240px]:max-w-[1240px] min-[1408px]:max-w-[1408px] min-[1576px]:max-w-[1576px] min-[1720px]:max-w-[1720px]">
        <div className="flex justify-between items-center gap-x-3 lg:gap-x-8 relative z-0">
          <div className="w-[140px] xl:w-[152px] 2xl:w-[182px] 3xl:w-[228px]">
            {data?.logoUrl ? (
              <Link href={data?.slug ?? ""}>
                <Image
                  src={data.logoUrl}
                  alt={data?.name}
                  width={228}
                  height={70}
                  className="w-full h-full block object-contain"
                  priority
                  unoptimized
                />
              </Link>
            ) : (
              <div className="w-full h-10.75 xl:h-11.75 2xl:h-14 3xl:h-17.5 rounded-md bg-white/10 animate-pulse" />
            )}
          </div>

          <div className="flex items-center justify-end lg:justify-end transition gap-x-6 lg:gap-x-5 xl:gap-x-7 2xl:gap-x-8 3xl:gap-x-10 bg-transparent lg:bg-white/75 lg:backdrop-blur-[30px] lg:rounded-[14px] 2xl:rounded-[16px] 3xl:rounded-[20px] lg:p-3 2xl:p-3.5 3xl:p-4">
            <HeaderNavigation
              className="max-lg:hidden"
              navigationData={navigationData}
            />

            <SearchDialog>
              <Button
                variant="none"
                size="none"
                className="w-4 xl:w-4.5 2xl:w-5 3xl:w-6"
              >
                <Image
                  src={"/images/icon-search.svg"}
                  alt={"icon-search"}
                  width={25}
                  height={25}
                  className="w-full h-full block object-contain hidden lg:block"
                  unoptimized
                />
                <Image
                  src={"/images/icon-search-white.svg"}
                  alt={"icon-search"}
                  width={25}
                  height={25}
                  className="w-full h-full block object-contain block lg:hidden"
                  unoptimized
                />
              </Button>
            </SearchDialog>

            <HeaderSheet
              data={data}
              socialLinkData={socialLinkData}
              mobileMenuData={mobileMenuData}
              navigationData={navigationData}
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default function Header({ data, navigationData, socialLinkData, mobileMenuData }) {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderContent
        data={data}
        navigationData={navigationData}
        socialLinkData={socialLinkData}
        mobileMenuData={mobileMenuData}
      />
    </Suspense>
  );
}
