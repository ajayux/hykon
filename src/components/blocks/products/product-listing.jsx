"use client";

import { Suspense, useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/typography";
import { ListFilterPlus } from "lucide-react";
import Image from "next/image";
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
import { cn } from "@/lib/utils";
import ProductCard from "@/components/common/product-card";
import FilterCard from "./filter-card";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/lib/api/client";
import {
  clearProductFilters,
  getProductFilters,
  setProductFilters,
} from "@/lib/utils/local-storage";

function ProductCardSkeleton() {
  return (
    <div className="w-full h-auto px-4 xl:px-8 3xl:px-10 py-4 xl:py-6 3xl:py-7.5 bg-[#212121] rounded-[8px] 2xl:rounded-[9px] 3xl:rounded-[11px]">
      <Skeleton className="w-full aspect-145/75 bg-white/10 mb-2 xl:mb-5 3xl:mb-6" />
      <Skeleton className="w-3/4 h-5 bg-white/10 mx-auto mb-2 xl:mb-2.5" />
      <Skeleton className="w-1/2 h-3 bg-white/5 mx-auto mb-1" />
      <Skeleton className="w-2/3 h-4 bg-white/10 mx-auto mb-3 xl:mb-4" />
      <Skeleton className="w-24 h-8 bg-white/10 rounded-full mx-auto" />
    </div>
  );
}

export function ProductListingSkeleton() {
  return (
    <section className="w-full h-auto block bg-[#444142] py-[40px_60px] sm:py-[50px_80px] xl:py-[60px_100px] 2xl:py-[70px_100px] 3xl:py-[80px_120px] relative z-0">
      <div className="container lg:px-6 xl:px-6.5 2xl:px-8 3xl:px-10">
        <div className="flex flex-wrap sm:gap-x-8 xl:gap-x-13 2xl:gap-x-15 3xl:gap-x-20">
          <div className="w-full lg:w-[220px] xl:w-[235px] 2xl:w-[276px] 3xl:w-[340px] max-lg:border-b max-lg:pb-2 max-lg:mb-8 max-lg:border-[#212121]">
            <Skeleton className="w-full h-8 bg-white/10 mb-4 rounded-[5px]" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="w-full h-5 bg-white/5 mb-3" />
            ))}
          </div>
          <div className="w-full lg:flex-1">
            <Skeleton className="w-40 h-5 bg-white/10 mb-2 xl:mb-1.5" />
            <div className="flex flex-wrap -mx-1 sm:-mx-2.5 xl:-mx-3.5 2xl:-mx-4.5 3xl:-mx-5.5 [&>div]:py-2 sm:[&>div]:py-2.5 xl:[&>div]:py-3 2xl:[&>div]:py-3.5 3xl:[&>div]:py-5 [&>div]:px-1 sm:[&>div]:px-2.5 xl:[&>div]:px-3.5 2xl:[&>div]:px-4.5 3xl:[&>div]:px-5.5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="w-1/2 min-[468px]:w-1/3 md:w-1/4">
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductGrid({ data, slug, categoryFilters }) {
  const router = useRouter();
  // Only used for the legacy "select a product" URL append below; the actual
  // listing/filtering fetch is driven by `categoryFilters`, not the URL.
  const urlSlugs =
    slug && slug !== "products" ? slug.split(",").filter(Boolean) : [];

  const [secondaryFilters, setSecondaryFilters] = useState(null);

  useEffect(() => {
    setSecondaryFilters(getProductFilters());
  }, []);

  const from = secondaryFilters?.from || null;
  const backup_capacity = secondaryFilters?.backup_capacity || null;
  const backup_hours = secondaryFilters?.VAh || null;

  function handleProductSelect(productSlug) {
    if (!productSlug) return;
    if (!urlSlugs.includes(productSlug)) {
      const slugs = [...urlSlugs, productSlug];
      router.replace(`/${slugs.join(",")}`, { scroll: false });
    }
  }

  const [items, setItems] = useState(
    data?.productInfo?.productItems?.data ?? [],
  );
  const [pagination, setPagination] = useState(
    data?.productInfo?.productItems?.pagination ?? {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const prevKeyRef = useRef(`${categoryFilters.join(",")}|||`);

  // Reset items when the server-rendered data changes (e.g. a direct link to
  // a category page provides fresh SSR data).
  useEffect(() => {
    setItems(data?.productInfo?.productItems?.data ?? []);
    setPagination(data?.productInfo?.productItems?.pagination ?? {});
  }, [data]);

  // Re-fetch client-side whenever the selected category filters or secondary
  // filters (backup_capacity/VAh/from) change, without touching the URL.
  useEffect(() => {
    const key = `${categoryFilters.join(",")}|${from || ""}|${backup_capacity || ""}|${backup_hours || ""}`;
    if (prevKeyRef.current === key) return;
    prevKeyRef.current = key;

    let cancelled = false;
    setIsFiltering(true);
    (async () => {
      try {
        const params = new URLSearchParams();
        categoryFilters.forEach((s) => params.append("product_slug[]", s));
        if (from) params.set("from", from);
        if (backup_capacity) params.set("backup_capacity", backup_capacity);
        if (backup_hours) params.set("backup_hours", backup_hours);

        const res = await fetch(`${API_URL}/products?${params}`);
        if (res.ok && !cancelled) {
          const response = await res.json();
          const result =
            response.data?.productSection?.productInfo ||
            response.data?.productInfo;
          setItems(result?.productItems?.data ?? []);
          setPagination(result?.productItems?.pagination ?? {});
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      } finally {
        if (!cancelled) setIsFiltering(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [categoryFilters.join(","), from, backup_capacity, backup_hours]);

  const fetchMore = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      categoryFilters.forEach((s) => params.append("product_slug[]", s));
      params.set("page", String(pagination.current_page + 1));
      if (from) params.set("from", from);
      if (backup_capacity) params.set("backup_capacity", backup_capacity);
      if (backup_hours) params.set("backup_hours", backup_hours);

      const res = await fetch(`${API_URL}/products?${params}`);
      if (res.ok) {
        const response = await res.json();
        const result =
          response.data?.productSection?.productInfo ||
          response.data?.productInfo;
        setItems((prev) => [...prev, ...(result?.productItems?.data ?? [])]);
        setPagination(result?.productItems?.pagination ?? {});
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    categoryFilters.join(","),
    pagination.current_page,
    from,
    backup_capacity,
    backup_hours,
  ]);

  const hasMore = pagination.current_page !== pagination.last_page;

  return (
    <div className="w-full lg:flex-1">
      <Heading
        as="h2"
        size="none"
        className="text-[16px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-tight font-medium text-white mb-2 xl:mb-1.5 2xl:mb-1.5 3xl:mb-2"
      >
        {data?.productInfo?.title}
      </Heading>
      <div className="flex flex-wrap -mx-1 sm:-mx-2.5 xl:-mx-3.5 2xl:-mx-4.5 3xl:-mx-5.5 [&>div]:py-2 sm:[&>div]:py-2.5 xl:[&>div]:py-3 2xl:[&>div]:py-3.5 3xl:[&>div]:py-5 [&>div]:px-1 sm:[&>div]:px-2.5 xl:[&>div]:px-3.5 2xl:[&>div]:px-4.5 3xl:[&>div]:px-5.5">
        {isFiltering ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={`sk-filter-${i}`}
              className="w-1/2 min-[468px]:w-1/3 md:w-1/4"
            >
              <ProductCardSkeleton />
            </div>
          ))
        ) : items.length > 0 ? (
          <>
            {items.map((item) => (
              <div key={item.id} className="w-1/2 min-[468px]:w-1/3 md:w-1/4">
                <ProductCard
                  item={item}
                  variant="variant-1"
                  onSelect={handleProductSelect}
                />
              </div>
            ))}
            {isLoading &&
              [1, 2, 3, 4].map((i) => (
                <div
                  key={`sk-${i}`}
                  className="w-1/2 min-[468px]:w-1/3 md:w-1/4"
                >
                  <ProductCardSkeleton />
                </div>
              ))}
          </>
        ) : (
          <div className="w-full flex flex-col gap-2 xl:gap-3 items-center justify-center my-10 xl:my-12.5 3xl:my-18">
            <Image
              src={"/images/icon-not-found.png"}
              alt={"icon-not-found"}
              width={100}
              height={100}
              className="w-[60px] xl:w-[90px] 2xl:w-[100px] 3xl:w-[110px]"
              unoptimized
            />
            <Heading
              as="div"
              size="h4"
              className="text-center font-semibold text-[#bcbcbc]"
            >
              No Result Found
            </Heading>
          </div>
        )}
      </div>

      {hasMore && (
        <div className="w-full flex justify-center mt-10 xl:mt-12.5 2xl:mt-15 3xl:mt-20">
          <Button
            size="lg"
            variant="none"
            className="text-white px-0 hover:text-[#008dd2] transition-colors disabled:opacity-50"
            onClick={fetchMore}
            disabled={isLoading}
          >
            {isLoading ? "" : "Load More"}
            {!isLoading && (
              <Image
                src={"/images/icon-news-right.svg"}
                alt={"icon-news-right"}
                width={6}
                height={10}
                className={cn("w-1 3xl:w-1.5 block mt-0.5 ml-2")}
                unoptimized
              />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ProductListing({ data, slug }) {
  const mobileFilterRef = useRef(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [hideFilter, setHideFilter] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState(() =>
    slug && slug !== "products" ? slug.split(",").filter(Boolean) : [],
  );
  const redirectedSlugs =
    slug && slug !== "products" ? slug.split(",").filter(Boolean) : [];

 
  useEffect(() => {
    setHideFilter(getProductFilters()?.from === "power_calculator");

    // The stored selection (set when the user picks a specific item, e.g.
    // "View Products" on a category item) wins, since it's what the SSR
    // fetch in the page filtered by; otherwise fall back to the URL slug.
    const stored = getProductFilters()?.category_slug;
    if (stored) {
      setCategoryFilters(stored.split(",").filter(Boolean));
      return;
    }
    const fromUrl =
      slug && slug !== "products" ? slug.split(",").filter(Boolean) : [];
    setCategoryFilters(fromUrl);
  }, [slug]);

  function applyCategoryFilters(slugs) {
    setCategoryFilters(slugs);
    const existing = getProductFilters() || {};
    setProductFilters({ ...existing, category_slug: slugs.join(",") });
  }

  return (
    <section className="w-full h-auto block bg-[#444142] py-[40px_60px] sm:py-[50px_80px] xl:py-[60px_100px] 2xl:py-[70px_100px] 3xl:py-[80px_120px] relative z-0">
      <div className="container ">
        <div className="flex flex-wrap sm:gap-x-8 xl:gap-x-13 2xl:gap-x-15 3xl:gap-x-20">
          {!hideFilter && (
            <div className="w-full lg:w-[220px] xl:w-[235px] 2xl:w-[276px] 3xl:w-[340px] max-lg:border-b max-lg:pb-2 max-lg:mb-8 max-lg:border-[#212121]">
              <div className="w-full sticky top-(--header-y) hidden lg:block">
                <Suspense fallback={null}>
                  <FilterCard
                    data={data}
                    selected={categoryFilters}
                    onApply={applyCategoryFilters}
                    redirectedSlugs={redirectedSlugs}
                  />
                </Suspense>
              </div>
              <Sheet
                open={sheetOpen}
                onOpenChange={(open) => {
                  if (!open) mobileFilterRef.current?.reset();
                  setSheetOpen(open);
                }}
              >
                <SheetTrigger className="text-[12px] xl:text-[14px] leading-tight font-medium text-white flex items-center gap-2 ml-auto lg:hidden">
                  <ListFilterPlus className="size-3 xl:size-4 text-white" />
                  FILTER
                </SheetTrigger>
                <SheetContent
                  showCloseButton={true}
                  className="bg-[#444142] px-4 sm:px-5 xl:px-6 2xl:px-7.5 3xl:px-9 py-5 sm:py-8 xl:py-10 2xl:py-12 3xl:py-15"
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>FILTER</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone.
                    </SheetDescription>
                  </SheetHeader>
                  <Suspense fallback={null}>
                    <FilterCard
                      ref={mobileFilterRef}
                      data={data}
                      selected={categoryFilters}
                      onApply={applyCategoryFilters}
                      redirectedSlugs={redirectedSlugs}
                      deferred
                    />
                  </Suspense>
                  <SheetFooter className="grid grid-cols-2 gap-2 px-0">
                    <SheetClose asChild>
                      <Button size="lg" variant="outline">
                        Close
                      </Button>
                    </SheetClose>
                    <Button
                      size="lg"
                      variant="white"
                      onClick={() => {
                        mobileFilterRef.current?.apply();
                        setSheetOpen(false);
                      }}
                    >
                      Apply
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          )}

          <Suspense fallback={null}>
            <ProductGrid
              data={data}
              slug={slug}
              categoryFilters={categoryFilters}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
