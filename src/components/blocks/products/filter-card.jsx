"use client";

import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import { Minus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

const FilterCard = forwardRef(function FilterCard(
  { data, deferred = false },
  ref,
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawSlug = searchParams.get("product_slug");
  const serverCategory = rawSlug ? rawSlug.split(",").filter(Boolean) : [];
  const [optimisticCategory, setOptimisticCategory] = useState(undefined);

  const currentSlugs =
    optimisticCategory !== undefined ? optimisticCategory : serverCategory;

  // Reset optimistic state whenever the URL changes externally (e.g. mobile Apply updates URL,
  // desktop instance must re-sync its checkboxes from the new URL)
  useEffect(() => {
    setOptimisticCategory(undefined);
  }, [rawSlug]);

  useImperativeHandle(ref, () => ({
    apply() {
      const param = currentSlugs.join(",");
      router.replace(
        currentSlugs.length ? `/products?product_slug=${param}` : "/products",
        { scroll: false },
      );
    },
    reset() {
      setOptimisticCategory(undefined);
    },
  }));

  function handleCheck(slug) {
    const next = currentSlugs.includes(slug)
      ? currentSlugs.filter((s) => s !== slug)
      : [...currentSlugs, slug];
    setOptimisticCategory(next);
    if (!deferred) {
      const param = next.join(",");
      router.replace(
        next.length ? `/products?product_slug=${param}` : "/products",
        { scroll: false },
      );
    }
  }

  function handleClearAll() {
    setOptimisticCategory([]);
    if (!deferred) {
      router.replace("/products", { scroll: false });
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-3.5 xl:mb-3.5 2xl:mb-4.5 3xl:mb-5.5">
        <Heading
          as="h2"
          size="none"
          className="text-[14px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-tight font-medium text-white"
        >
          FILTER
        </Heading>
        <Button
          size="lg"
          variant="none"
          className="font-semibold text-[#008dd2] p-0 !h-auto cursor-pointer"
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </div>
      <div className="w-full bg-[#262626] rounded-[5px] 2xl:rounded-[6px] 3xl:rounded-[8px] overflow-hidden">
        <div className="w-full bg-[#373737] flex items-center justify-between gap-4 px-2 sm:px-2.5 xl:px-3 2xl:px-4 3xl:px-5 py-1.5 sm:py-2 xl:py-2.5 2xl:py-3 3xl:py-4 relative z-0">
          <Text as="div" size="p2" className="uppercase text-white">
            {data?.filters?.title}
          </Text>
          <div>
            <Minus className="size-3 xl:size-2.5 text-white" />
          </div>
          <div className="h-[1px] bg-[#535353] lg:bg-transparent inset-x-2 sm:inset-x-2.5 xl:inset-x-3 2xl:inset-x-4 3xl:inset-x-5 absolute z-0 bottom-0" />
        </div>
        <div className="w-full bg-[#262626] px-2 sm:px-2.5 xl:px-3 2xl:px-4 3xl:px-5 py-2.5 sm:py-3 xl:py-4 2xl:py-4.5 3xl:py-5">
          <FieldGroup className="gap-3 xl:gap-3.5 2xl:gap-4 3xl:gap-4.5">
            {data?.filters?.categoryItems?.map((item) => (
              <Field orientation="horizontal" key={item.id} className="">
                <Checkbox
                  id={item.slug}
                  name={item.slug}
                  checked={currentSlugs.includes(item.slug)}
                  onCheckedChange={() => handleCheck(item.slug)}
                  className="bg-white dark:bg-white border-[#c7c7c7] data-[state=checked]:border-[#3468bd] data-[state=checked]:bg-[#3468bd] dark:data-[state=checked]:bg-[#3468bd] data-[state=checked]:text-white"
                />
                <Label htmlFor={item.slug}>
                  <Text as="span" size="p2" className="text-white">
                    {item.name}
                  </Text>
                </Label>
              </Field>
            ))}
          </FieldGroup>
        </div>
      </div>
    </>
  );
});

export default FilterCard;
