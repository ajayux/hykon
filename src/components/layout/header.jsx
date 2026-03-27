"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import HeaderNavigation from "./header-navigation";
import HeaderHamburger from "./header-hamburger";
import HeaderSheet from "./header-sheet";
import SearchDialog from "../common/search-dialog";

export default function Header({
  data,
  navigationData,
  socialLinkData,
  mobileMenuData,
}) {
  const pathname = usePathname();
  const isLandingPage =
    pathname === "/landing" || pathname?.startsWith("/landing/");
  const isBusinessCardPage =
    pathname === "/business-card" || pathname?.startsWith("/business-card/");
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [toggle, setToggle] = useState(false);

  // Handle scroll visibility
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();
      const atTop = scrollYProgress.get() < 0.05;
      setVisible(atTop || direction < 0);
    }
  });

  if (isLandingPage || isBusinessCardPage) return null;

  return (
    <motion.header
      initial={{ opacity: 1, y: -100 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "w-full h-(--header-y) z-10 top-0 inset-x-0 flex items-center bg-linear-to-b from-black/60 lg:from-black/20 to-transparent transition-background duration-300 absolute",
      )}
    >
      <div className="container lg:px-0">
        <div className="flex justify-between items-center gap-x-3 lg:gap-x-8 relative z-0">
          <div className="w-[140px] xl:w-[152px] 2xl:w-[182px] 3xl:w-[228px]">
            <Link href={data?.slug ?? ""}>
              <Image
                src={data?.logoUrl ?? "/images/placeholder.jpg"}
                alt={data?.name}
                width={228}
                height={70}
                className="w-full h-full block object-contain"
                priority
                unoptimized
              />
            </Link>
          </div>

          <div className="flex items-center justify-end lg:justify-end transition gap-x-6 lg:gap-x-7.5 2xl:gap-x-10 bg-transparent lg:bg-white/75 lg:backdrop-blur-[30px] lg:rounded-[14px] 2xl:rounded-[16px] 3xl:rounded-[20px] p-3 2xl:p-3.5 3xl:p-4">
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

            {/* <HeaderHamburger
              setIsOpen={setToggle}
              menuItems={navigationData}
              data={data}
            /> */}

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
