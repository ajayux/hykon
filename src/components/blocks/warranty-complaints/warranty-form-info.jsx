"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/typography";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { WarrantyRegistrationForm } from "@/components/form/warranty-registration-form";

export default function WarrantyFormInfo({ data }) {
  const [activeTab, setActiveTab] = useState(
    data?.filters?.[0]?.slug || "warranty",
  );
  return (
    <section className="w-full h-auto block pt-8 xl:pt-10 2xl:pt-12 3xl:pt-15 pb-15 xl:pb-35 2xl:pb-40 3xl:pb-50 bg-[#181818]">
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 xl:mb-10 2xl:mb-12.5 3xl:mb-15">
          <div className="w-full sm:flex-1">
            <Heading
              as="h2"
              size="h1"
              className="text-medium text-white mb-2 sm:mb-0"
            >
              {data?.filters?.find((item) => item?.slug === activeTab)?.title ||
                data?.title}
            </Heading>
          </div>
          <div className="w-full sm:w-auto flex">
            <div
              className={cn(
                "flex flex-wrap gap-5 xl:gap-x-8 2xl:gap-x-10 3xl:gap-x-12.5",
              )}
            >
              {data?.filters?.map((item) => {
                const isActive = activeTab === item?.slug;
                return (
                  <Button
                    key={item?.id}
                    onClick={() => setActiveTab(item?.slug)}
                    type="button"
                    size="lg"
                    variant="none"
                    className={cn(
                      "text-[12px] xl:text-[14px] 2xl:text-[16.8px] 3xl:text-[20px] capitalize text-white py-0 px-2 sm:px-4 xl:px-6 2xl:px-7 3xl:px-9 relative z-0 transition-all",
                      isActive
                        ? "text-white"
                        : "text-white/90 hover:text-white",
                    )}
                  >
                    <span>{item?.title}</span>
                    <span
                      className={cn(
                        "absolute z-0 bottom-0 inset-x-0 w-full h-[2px] transition-all duration-300",
                        isActive
                          ? "bg-[#008dd2] opacity-100"
                          : "bg-white/80 opacity-100",
                      )}
                    />
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full">
          {activeTab === "warranty-registration" ? (
            <WarrantyRegistrationForm
              key={activeTab}
              page={"warranty"}
              activeTab={activeTab}
            />
          ) : (
            <WarrantyRegistrationForm
              key={activeTab}
              page={"warranty"}
              activeTab={activeTab}
            />
          )}
        </div>
      </div>
    </section>
  );
}
