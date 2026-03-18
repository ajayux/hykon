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
import { Heading, Text } from "../utils/typography";
import { GetInTouchForm } from "../form/get-in-touch-form";

export default function GetInTouchDialog({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={
          "xl:max-w-[600px] 2xl:max-w-[720px] 3xl:max-w-[880px] bg-[#212121] py-8 sm:py-10 xl:py-12 2xl:py-14 3xl:py-18 px-6 sm:px-7 xl:px-8.5 2xl:px-10 3xl:px-12.5 rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px]"
        }
        closeClassName="3xl:size-6 3xl:top-6 3xl:right-8 text-[#858589] xl:[&_svg:not([class*='size-'])]:size-6 3xl:[&_svg:not([class*='size-'])]:size-8"
      >
        <DialogHeader className="text-start mb-2 xl:mb-4 2xl:mb-5 3xl:mb-6">
          <DialogTitle asChild>
            <Heading as="h2" size="h1" className="text-white xl:mb-0.5">
              Get In Touch
            </Heading>
          </DialogTitle>
          <DialogDescription asChild>
            <Text as="p" size="p1" className="max-lg:text-[12px] text-white">
              Post your queries. We will assist you to choose the right product
            </Text>
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[75vh] overflow-y-auto px-4">
          <GetInTouchForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
