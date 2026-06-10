"use client";

import { useState, useEffect, useRef } from "react";

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
import { API_BASE_URL } from "@/lib/api/constants";

const TYPE_LABELS = {
  blog: "Blog",
  news: "News",
  product: "Product",
};

function getHref(suggestion) {
  switch (suggestion.type) {
    case "blog":
      return `/blog/${suggestion.slug}`;
    case "news":
      return `/news/${suggestion.slug}`;
    case "product variant":
      return `/products/${suggestion.slug}`;
    case "service":
      return `/service/${suggestion.slug}`;
    case "factory":
      return `/factory/${suggestion.slug}`;
    case "projects":
      return `/projects/${suggestion.slug}`;

    default:
      return `/?q=${encodeURIComponent(suggestion.title)}`;
  }
}

export default function SearchDialog({ children }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?keyword=${encodeURIComponent(trimmed)}`,
          { cache: "no-store" },
        );
        if (res.ok) {
          const json = await res.json();
          setSuggestions(json?.data?.suggestions ?? []);
        } else {
          setSuggestions([]);
        }
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
      setSuggestions([]);
      setIsSearching(false);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const isTyping = query.trim().length >= 2;

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

        {isTyping && (
          <>
            {/* Divider */}
            <div className="border-t border-white/10 mt-1" />

            {isSearching ? (
              /* Loading state */
              <div className="py-4 flex items-center justify-center">
                <Text as="p" size="p2" className="text-[#858589]">
                  Searching...
                </Text>
              </div>
            ) : suggestions.length > 0 ? (
              /* Suggestions list */
              <div className="space-y-1 2xl:space-y-1.5 max-h-[300px] xl:max-h-[350px] 2xl:max-h-[400px] 3xl:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion.id}
                    href={getHref(suggestion)}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-2 2xl:py-2.5 3xl:py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors group"
                  >
                    <Text
                      as="span"
                      size="p1"
                      className="text-inherit line-clamp-1 flex-1 mr-3"
                    >
                      {suggestion.title}
                    </Text>
                    <div className="flex items-center gap-2 shrink-0">
                      {suggestion.type && (
                        <span className="text-[10px] 2xl:text-[11px] uppercase tracking-wide text-[#858589] bg-white/10 px-1.5 py-0.5 rounded">
                          {TYPE_LABELS[suggestion.type] ?? suggestion.type}
                        </span>
                      )}
                      <ArrowRightIcon className="size-3.5 2xl:size-4 3xl:size-5 text-[#858589] group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* No results */
              <div className="py-4 flex items-center justify-center">
                <Text as="p" size="p2" className="text-[#858589]">
                  No results found
                </Text>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
