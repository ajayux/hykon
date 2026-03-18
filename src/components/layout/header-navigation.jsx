"use client";
import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function HeaderNavigation({ navigationData, className }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "flex flex-wrap flex-col lg:flex-row gap-y-0 lg:gap-y-0",
        className,
      )}
    >
      {navigationData?.map((item) => {
        const isActive = pathname === item?.slug;

        return (
          <div key={item?.id} className="w-full lg:w-auto">
            <Button
              variant="none"
              size="none"
              onClick={() => {
                setIsOpen(false);
                setOpen(false);
              }}
              className={cn(
                "text-[16px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-none font-normal w-full px-4 lg:px-2 xl:px-4.5 2xl:px-6 3xl:px-7.5 hover:scale-100 py-4 lg:py-0 border-b-1 border-white/20 max-lg:rounded-none max-lg:justify-start lg:border-none",
                isActive
                  ? "text-white lg:text-[#1e1e1e]"
                  : "text-white/90 lg:text-[#1e1e1e]/90",
              )}
              asChild
            >
              <Link key={item?.id} href={item?.slug}>
                {item?.name}
              </Link>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
