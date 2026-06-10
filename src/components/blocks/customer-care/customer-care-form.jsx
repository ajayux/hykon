"use client";

import { useState } from "react";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { WarrantyRegistrationForm } from "@/components/form/warranty-registration-form";
import { ComplaintRegistrationForm } from "@/components/form/complaint-registration-form";
import { InstallationRequestForm } from "@/components/form/installation-request-form";
import { DealershipRequestForm } from "@/components/form/dealership-request-form";
import RecaptchaProvider from "@/components/common/recaptcha-provider";

export default function CustomerCareForm({ data }) {
  const [activeTab, setActiveTab] = useState(
    data?.filters?.[0]?.slug || "warranty-registration",
  );
  return (
    <section className="w-full h-auto block pt-6 xl:pt-8 2xl:pt-10 3xl:pt-11 pb-16 xl:pb-18 2xl:pb-22 3xl:pb-24 bg-[#181818]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-[260px] xl:w-[260px] 2xl:w-[280px] 3xl:w-[340px]">
            <div className="w-full bg-[#262626] rounded-[5px] 2xl:rounded-[6px] 3xl:rounded-[8px] overflow-hidden">
              <div className="w-full bg-[#008dd2] px-4 xl:px-6 2xl:px-7.5 3xl:px-8 py-2 xl:py-2.5 2xl:py-3 3xl:py-3.5">
                <Text size="p0" className="uppercase text-white">
                  Customer Care
                </Text>
              </div>
              <div className="flex flex-col my-2 xl:my-3 2xl:my-4 3xl:my-5">
                {data?.filters?.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveTab(filter.slug)}
                    className={cn(
                      "flex items-center justify-between px-4 xl:px-6 2xl:px-7.5 3xl:px-8 py-2 xl:py-2 2xl:py-2.5 3xl:py-3 transition-colors",
                      activeTab === filter.slug
                        ? "bg-[#373737]"
                        : "bg-none hover:bg-[#373737]/10",
                    )}
                  >
                    <Text size="p1" className="text-white">
                      {filter.title}
                    </Text>
                    <Image
                      src="/images/icon-customer-arrow.svg"
                      alt="icon-customer-arrow-loc"
                      width={21}
                      height={15}
                      className={cn(
                        "w-3 xl:w-4 2xl:w-4.5 3xl:w-5 transition-all duration-300 ease-in-out rotate-90 lg:rotate-0",
                        activeTab === filter.slug
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-4 opacity-0",
                      )}
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="w-full lg:flex-1">
            <div className="w-full">
              <Heading
                as="h4"
                size="h4"
                className="capitalize text-white mb-4 xl:mb-5 2xl:mb-6 3xl:mb-8"
              >
                {activeTab.replace(/-/g, " ")}
              </Heading>

              <RecaptchaProvider>
                {activeTab === "warranty-registration" ? (
                  <WarrantyRegistrationForm key={activeTab} page={"customerCare"} activeTab={activeTab} />
                ) : activeTab === "registration-complaints" ? (
                  <ComplaintRegistrationForm key={activeTab} page={"customerCare"} activeTab={activeTab} />
                ) : activeTab === "installation-request" ? (
                  <InstallationRequestForm key={activeTab} page={"customerCare"} activeTab={activeTab} />
                ) : activeTab === "dealership-request" ? (
                  <DealershipRequestForm key={activeTab} page={"customerCare"} activeTab={activeTab} />
                ) : null}
              </RecaptchaProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
