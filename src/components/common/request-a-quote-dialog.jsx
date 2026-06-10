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
import { RequestAQuoteForm } from "../form/request-a-quote-form";
import RecaptchaProvider from "./recaptcha-provider";

export default function RequestAQuoteDialog({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={
          "xl:max-w-[940px] 2xl:max-w-[1120px] 3xl:max-w-[1376px] bg-[#212121] py-6 sm:py-8 xl:py-10 2xl:py-12 3xl:py-16 px-6 sm:px-7 xl:px-8.5 2xl:px-9 3xl:px-11 rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px]"
        }
        closeClassName="3xl:size-6 3xl:top-6 3xl:right-8 text-[#858589] xl:[&_svg:not([class*='size-'])]:size-6 3xl:[&_svg:not([class*='size-'])]:size-8"
      >
        <DialogHeader className="text-start mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5">
          <DialogTitle asChild>
            <Heading
              as="h2"
              size="h1"
              className="font-medium text-white 2xl:mb-0.5"
            >
              Get a Quote
            </Heading>
          </DialogTitle>
          <DialogDescription asChild>
            <Text as="p" size="p1" className="max-lg:text-[12px] text-white">
              Share your details and our team will get back to you with the
              right solution.
            </Text>
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[68vh] overflow-y-auto px-4 py-1">
          <RecaptchaProvider>
            <RequestAQuoteForm onClose={() => setOpen(false)} />
          </RecaptchaProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
