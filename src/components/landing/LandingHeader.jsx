"use client";
import React from "react";
import Image from "next/image";

export default function LandingHeader() {
   return (
      <header className="absolute top-0 left-0 w-full z-50 py-10 flex items-center justify-between pointer-events-none">
         <div className="container">
            <Image
               src="/images/brand-logo.svg"
               alt="Hykon Logo"
               width={160}
               height={48}
               className="brightness-0 invert"
            />
         </div>
      </header>
   );
}
