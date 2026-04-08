"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import LandingHero from "@/components/blocks/landing/landing-hero";
import LandingPower from "@/components/blocks/landing/landing-power";
import LandingHomes from "@/components/blocks/landing/landing-homes";
import LandingHeader from "@/components/blocks/landing/landing-header";
import LandingFooter from "@/components/blocks/landing/landing-footer";
import LandingSidebar from "@/components/blocks/landing/landing-sidebar";
import LandingTrusted from "@/components/blocks/landing/landing-trusted";
import LandingFeatures from "@/components/blocks/landing/landing-features";
import LandingPerformance from "@/components/blocks/landing/landing-performance";

export default function LandingClient({ data, slug }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={cn(
        "w-full h-auto bg-[#181818] flex",
        !isSidebarOpen && "overflow-hidden",
      )}
    >
      <div
        className={cn(
          "h-full transition-all duration-700 ease-in-out",
          isSidebarOpen
            ? "w-full lg:w-[calc(100%-340px)] xl:w-[calc(100%-370px)] 2xl:w-[calc(100%-440px)] 3xl:w-[calc(100%-550px)]"
            : "w-full",
        )}
      >
        <LandingHeader isSidebarOpen={isSidebarOpen} />
        <LandingHero
          isSidebarOpen={isSidebarOpen}
          data={data?.landingHero}
        />
        <LandingFeatures
          isSidebarOpen={isSidebarOpen}
          data={data?.landingFeatures}
        />
        <LandingPower
          isSidebarOpen={isSidebarOpen}
          data={data?.landingPower}
        />
        <LandingPerformance
          isSidebarOpen={isSidebarOpen}
          data={data?.landingPerformance}
        />
        <LandingTrusted
          isSidebarOpen={isSidebarOpen}
          data={data?.landingTrusted}
        />
        <LandingHomes
          isSidebarOpen={isSidebarOpen}
          data={data?.landingHomes}
        />
        <LandingFooter
          isSidebarOpen={isSidebarOpen}
          data={data?.landingFooter}
        />
      </div>
      <LandingSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} slug={slug} />
    </div>
  );
}
