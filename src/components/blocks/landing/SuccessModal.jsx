"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Heading, Text } from "@/components/utils/typography";
import { Button } from "@/components/ui/button";

export default function SuccessModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-[#000000]/80 backdrop-blur-xl z-[9998]" />
        <DialogContent 
           showCloseButton={false}
           className="bg-[#1A1A1A] border-none shadow-[0_0_50px_rgba(0,0,0,0.5)] p-10 lg:p-14 xl:p-20 max-w-[90%] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] rounded-[40px] lg:rounded-[50px] flex flex-col items-center text-center gap-8 lg:gap-10 z-[9999] outline-none"
        >
          <div className="relative w-28 h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#008dd2]/30 blur-[60px] rounded-full scale-150" />
            <Image
              src="/images/form-submitted-success.svg"
              alt="Success"
              fill
              className="object-contain relative z-10"
              unoptimized
            />
          </div>

          <div className="space-y-3 lg:space-y-4">
            <Heading
              as="h2"
              size="h2"
              className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight"
            >
              Your Request is Submitted
            </Heading>
            <Text
              as="p"
              size="p1"
              className="text-white/60 text-base lg:text-lg xl:text-xl max-w-[320px] lg:max-w-[450px] mx-auto leading-relaxed font-light"
            >
              Our energy expert will contact you shortly.
            </Text>
          </div>

          <Button
            asChild
            onClick={onClose}
            className="group mt-6 bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-full pl-10 pr-2 py-2 lg:py-3 h-auto text-[16px] lg:text-[18px] xl:text-[20px] flex items-center gap-6 transition-all duration-300"
          >
            <Link href="/">
              Back to Home
              <span className="w-10 lg:w-12 xl:w-14 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <Image
                  src="/images/icon-arrow-right-white.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="w-1/2"
                />
              </span>
            </Link>
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
