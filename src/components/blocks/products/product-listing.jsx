import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import { ListFilterPlus, Minus, Plus } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
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

export default function ProductListing({ data }) {
  return (
    <section className="w-full h-auto block bg-[#181818] py-[40px_60px] sm:py-[50px_80px] xl:py-[60px_100px] 2xl:py-[70px_100px] 3xl:py-[80px_120px] relative z-0">
      <div className="container lg:px-6 xl:px-6.5 2xl:px-8 3xl:px-10">
        <div className="flex flex-wrap sm:gap-x-8 xl:gap-x-13 2xl:gap-x-15 3xl:gap-x-20">
          <div className="w-full lg:w-[220px] xl:w-[235px] 2xl:w-[276px] 3xl:w-[340px] max-lg:border-b max-lg:pb-2 max-lg:mb-8 max-lg:border-[#212121]">
            <div className="w-full sticky top-(--header-y) hidden lg:block">
              <FilterCard data={data} />
            </div>
            <Sheet>
              <SheetTrigger className="text-[12px] xl:text-[14px] leading-tight font-medium text-white flex items-center gap-2 ml-auto lg:hidden">
                <ListFilterPlus className="size-3 xl:size-4 text-white" />
                FILTER
              </SheetTrigger>
              <SheetContent
                showCloseButton={true}
                className="bg-[#181818] px-4 sm:px-5 xl:px-6 2xl:px-7.5 3xl:px-9 py-5 sm:py-8 xl:py-10 2xl:py-12 3xl:py-15"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>FILTER</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone.
                  </SheetDescription>
                </SheetHeader>
                <FilterCard data={data} />
                <SheetFooter className="grid grid-cols-2 gap-2 px-0">
                  <SheetClose asChild>
                    <Button size="lg" variant="outline">
                      Close
                    </Button>
                  </SheetClose>
                  <Button size="lg" variant="white" type="submit">
                    Apply
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div className="w-full lg:flex-1">
            <Heading
              as="h2"
              size="none"
              className="text-[16px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-tight font-medium text-white mb-2 xl:mb-1.5 2xl:mb-1.5 3xl:mb-2"
            >
              {data?.productInfo?.title}
            </Heading>
            <div className="flex flex-wrap -mx-1 sm:-mx-2.5 xl:-mx-3.5 2xl:-mx-4.5 3xl:-mx-5.5 [&>div]:py-2 sm:[&>div]:py-2.5 xl:[&>div]:py-3 2xl:[&>div]:py-3.5 3xl:[&>div]:py-5 [&>div]:px-1 sm:[&>div]:px-2.5 xl:[&>div]:px-3.5 2xl:[&>div]:px-4.5 3xl:[&>div]:px-5.5">
              {data?.productInfo?.productItems?.length > 0 ? (
                <>
                  {data?.productInfo?.productItems?.map((item) => (
                    <div
                      key={item.id}
                      className="w-1/2 min-[468px]:w-1/3 md:w-1/4"
                    >
                      <ProductCard item={item} variant="variant-1" />
                    </div>
                  ))}
                  <div className="w-full flex justify-center mt-10 xl:mt-12.5 2xl:mt-15 3xl:mt-20">
                    <Button
                      size="lg"
                      variant="none"
                      className="text-white px-0 hover:text-[#008dd2] transition-colors"
                    >
                      Load More
                      <Image
                        src={"/images/icon-news-right.svg"}
                        alt={"icon-news-right"}
                        width={6}
                        height={10}
                        className={cn("w-1 3xl:w-1.5 block mt-0.5 ml-2")}
                        unoptimized
                      />
                    </Button>
                  </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterCard({ data }) {
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
          className="font-semibold text-[#008dd2] p-0 !h-auto"
        >
          Clear All
        </Button>
      </div>
      <div className="w-full bg-[#262626] rounded-[5px] 2xl:rounded-[6px] 3xl:rounded-[8px] overflow-hidden">
        <div className="w-full bg-[#373737] flex justify-between gap-4 px-2 sm:px-2.5 xl:px-3 2xl:px-4 3xl:px-5 py-1.5 sm:py-2 xl:py-2.5 2xl:py-3 3xl:py-4 relative z-0">
          <Text as="div" size="p2" className="uppercase text-white">
            {data?.filters?.title}
          </Text>
          <div>
            <Minus className="size-3 xl:size-4 text-white" />
            {/* accridion onclic make logic */}
            {/* <Plus /> */}
          </div>
          <div className="h-[1px] bg-[#535353] inset-x-2 sm:inset-x-2.5 xl:inset-x-3 2xl:inset-x-4 3xl:inset-x-5 absolute z-0 bottom-0" />
        </div>
        <div className="w-full bg-[#262626] px-2 sm:px-2.5 xl:px-3 2xl:px-4 3xl:px-5 py-2.5 sm:py-3 xl:py-4 2xl:py-4.5 3xl:py-5">
          <FieldGroup className="gap-3 xl:gap-3.5 2xl:gap-4 3xl:gap-4.5">
            {data?.filters?.categoryItems?.map((item) => (
              <Field orientation="horizontal" key={item.id} className="">
                <Checkbox
                  id={item.slug}
                  name={item.slug}
                  className="dark:bg-white border-[#c7c7c7] data-[state=checked]:border-[#008dd2] data-[state=checked]:bg-[#008dd2] dark:data-[state=checked]:bg-[#008dd2] data-[state=checked]:text-white"
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
}
