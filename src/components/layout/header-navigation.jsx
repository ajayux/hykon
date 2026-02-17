"use client";
import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function HeaderNavigation({ navigationData }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap">
      {navigationData?.map((item) => {
        const isActive = pathname === item?.slug;

        return (
          <Button
            key={item?.id}
            variant="none"
            size="none"
            onClick={() => {
              setIsOpen(false);
              setOpen(false);
            }}
            className={cn(
              "text-[20px] leading-none font-normal px-7.5 hover:scale-100",
              isActive ? "text-[#1e1e1e]" : "text-[#1e1e1e]/90",
            )}
            asChild
          >
            <Link key={item?.id} href={item?.slug}>
              {item?.name}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
