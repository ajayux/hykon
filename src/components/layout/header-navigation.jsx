"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function HeaderNavigation({ navigationData, className }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const pathname = usePathname();
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenSubmenu(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleToggleSubmenu = (id) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  return (
    <div
      ref={navRef}
      className={cn(
        "flex flex-wrap flex-col lg:flex-row gap-y-0 lg:gap-y-0",
        className,
      )}
    >
      {navigationData?.map((item) => {
        const isActive =
          pathname === item?.slug ||
          item?.submenu?.some((subItem) => pathname === subItem?.slug);
        const isSubmenuOpen = openSubmenu === item?.id;

        return (
          <div key={item?.id} className="w-full lg:w-auto relative group">
            <Button
              variant="none"
              size="none"
              onClick={() => {
                if (item?.hasSubmenu) {
                  handleToggleSubmenu(item?.id);
                } else {
                  setOpenSubmenu(null);
                }
              }}
              className={cn(
                "text-[16px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px] leading-none font-[400] w-full px-4 lg:px-2.5 xl:px-4 2xl:px-5 3xl:px-7.5 hover:scale-100 py-4 lg:py-0 border-b-1 border-white/20 max-lg:rounded-none max-lg:justify-start lg:border-none",
                isActive
                  ? "text-[#008dd2] lg:text-[#008dd2]"
                  : isSubmenuOpen
                    ? "text-white lg:text-[#1e1e1e]"
                    : "text-white/90 lg:text-[#1e1e1e]/90",
                isSubmenuOpen && "max-lg:bg-[#131313]/80",
              )}
              {...(item?.hasSubmenu ? {} : { asChild: true })}
            >
              {item?.hasSubmenu ? (
                <div className="flex items-center justify-between lg:justify-start gap-0.5 w-full cursor-pointer">
                  <Link href={`${item?.slug}`}>{item?.name}</Link>
                  <ChevronDown
                    className={cn(
                      "size-4 text-[#008dd2] transition-transform duration-200 mt-px xl:mt-[2px]",
                      isSubmenuOpen ? "rotate-180" : "",
                    )}
                  />
                </div>
              ) : (
                <Link href={item?.slug}>{item?.name}</Link>
              )}
            </Button>

            <AnimatePresence>
              {item?.hasSubmenu && isSubmenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="lg:absolute top-full left-0 z-50 min-w-[200px] bg-[#131313]/80 lg:bg-[#eaeaea] lg:text-black p-2 lg:mt-2 lg:rounded-md lg:shadow-lg"
                >
                  <div className="w-full h-full max-h-[220px] overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)] flex flex-col gap-1">
                    {item?.submenu?.map((subItem) => {
                      const isSubItemActive = pathname === subItem?.slug;
                      return (
                        <Link
                          key={subItem?.id}
                          href={subItem?.slug}
                          onClick={() => setOpenSubmenu(null)}
                          className={cn(
                            "text-[14px] lg:text-[12px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[14px] hover:text-[#008dd2] transition-colors py-1 lg:py-1 px-2 transition-all duration-200",
                            isSubItemActive
                              ? "text-[#008dd2] lg:text-[#008dd2]"
                              : "lg:text-[#1e1e1e] max-lg:text-white/90",
                          )}
                        >
                          {subItem?.name}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
