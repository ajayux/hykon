"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heading } from "../utils/typography";
import { CareerApplicationForm } from "../form/career-application-form";

export default function CareerDialog({ children, jobTitle, slug }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={
          "xl:max-w-[600px] 2xl:max-w-[720px] 3xl:max-w-[880px] bg-[#212121] py-6 sm:py-8 xl:py-10 2xl:py-12 3xl:py-16 px-6 sm:px-7 xl:px-8.5 2xl:px-10 3xl:px-12.5 rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px]"
        }
        closeClassName="3xl:size-6 3xl:top-6 3xl:right-8 text-[#858589] xl:[&_svg:not([class*='size-'])]:size-6 3xl:[&_svg:not([class*='size-'])]:size-8"
      >
        <DialogHeader className={"text-start"}>
          <DialogTitle asChild>
            <Heading
              as="h2"
              size="h1"
              className="text-white mb-2 xl:mb-4 2xl:mb-6 3xl:mb-8"
            >
              Apply Now{" "}
              <span className="text-[30%] font-normal">({jobTitle})</span>
            </Heading>
          </DialogTitle>
          <DialogDescription className={"sr-only"}>
            career application form
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[75vh] overflow-y-auto px-4">
          <CareerApplicationForm jobTitle={jobTitle} slug={slug} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
