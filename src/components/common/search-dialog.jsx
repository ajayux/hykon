"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/utils/typography";

const POPULAR_SEARCHES = [
  "Inverter",
  "Solar Battery",
  "Lithium Battery",
  "UPS",
  "HUPS",
  "Charge Controller",
];

const QUICK_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Volt Search", href: "/volt-search" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export default function SearchDialog({ children }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/volt-search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  const handlePopularSearch = (term) => {
    setOpen(false);
    router.push(`/volt-search?q=${encodeURIComponent(term)}`);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="xl:max-w-[560px] 2xl:max-w-[660px] 3xl:max-w-[760px] bg-[#212121] py-6 sm:py-8 xl:py-10 2xl:py-12 3xl:py-16 px-6 sm:px-7 xl:px-8.5 2xl:px-10 3xl:px-12.5 rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px]"
        closeClassName="3xl:size-6 3xl:top-6 3xl:right-8 text-[#858589] xl:[&_svg:not([class*='size-'])]:size-6 3xl:[&_svg:not([class*='size-'])]:size-8"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>

        {/* Search Input */}
        <form onSubmit={handleSubmit}>
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3 size-4 2xl:size-5 3xl:size-6 text-[#858589] pointer-events-none shrink-0" />
            <Input
              autoFocus
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 2xl:pl-10 3xl:pl-12 h-10 2xl:h-11 3xl:h-13 text-white bg-white/10 border-white/20 placeholder:text-[#858589] focus-visible:border-[#008dd2] focus-visible:ring-[#008dd2]/30 rounded-lg 2xl:rounded-xl text-sm 2xl:text-base 3xl:text-lg"
            />
          </div>
        </form>

        {/* Divider */}
        <div className="border-t border-white/10 mt-1" />

        {/* Popular Searches */}
        <div className="space-y-3 2xl:space-y-4">
          <Text
            as="p"
            size="p2"
            className="text-[#858589] uppercase tracking-widest font-medium"
          >
            Popular Searches
          </Text>
          <div className="flex flex-wrap gap-2 2xl:gap-2.5">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handlePopularSearch(term)}
                className="px-3 py-1 2xl:px-3.5 2xl:py-1.5 3xl:px-4 3xl:py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs 2xl:text-sm 3xl:text-base hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-1 2xl:space-y-1.5">
          <Text
            as="p"
            size="p2"
            className="text-[#858589] uppercase tracking-widest font-medium mb-2 2xl:mb-3"
          >
            Quick Links
          </Text>
          {QUICK_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-3 py-2 2xl:py-2.5 3xl:py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors group"
            >
              <Text as="span" size="p1" className="text-inherit">
                {label}
              </Text>
              <ArrowRightIcon className="size-3.5 2xl:size-4 3xl:size-5 text-[#858589] group-hover:text-white transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
