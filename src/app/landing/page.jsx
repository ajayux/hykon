"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import LandingHero from "@/components/landing/LandingHero";
import LandingPower from "@/components/landing/LandingPower";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingSidebar from "@/components/landing/LandingSidebar";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingPerformance from "@/components/landing/LandingPerformance";

const local_data = {
  landingHero: {
    sliders: [
      {
        id: 1,
        media: {
          type: "image",
          mobilePath: "/images/landing-banner-1.webp",
          path: "/images/landing-banner-1.webp",
          alt: "banner",
        },
        title: "POWER THAT LASTS. <br> PERFORMANCE <br> YOU CAN TRUST.",
      },
      {
        id: 2,
        media: {
          type: "image",
          mobilePath: "/images/landing-banner-1.webp",
          path: "/images/landing-banner-1.webp",
          alt: "banner",
        },
        title: "POWER THAT LASTS. <br> PERFORMANCE <br> YOU CAN TRUST.02",
      },
      {
        id: 3,
        media: {
          type: "image",
          mobilePath: "/images/landing-banner-1.webp",
          path: "/images/landing-banner-1.webp",
          alt: "banner",
        },
        title: "POWER THAT LASTS. <br> PERFORMANCE <br> YOU CAN TRUST.03",
      },
      {
        id: 4,
        media: {
          type: "image",
          mobilePath: "/images/landing-banner-1.webp",
          path: "/images/landing-banner-1.webp",
          alt: "banner",
        },
        title: "POWER THAT LASTS. <br> PERFORMANCE <br> YOU CAN TRUST.04",
      },
    ],
  },
  landingFeatures: {
    title: "HiLIFE 24V 100Ah <br> LiFePO4 Battery",
    description:
      "<p>Smart, Safe & Long-Life Energy Storage for Inverter and Solar Systems. Upgrade to next-generation energy storage with Hykon’s HiLIFE LiFePO4 Battery. Designed for high efficiency, extended lifespan, and zero maintenance, this compact 24V battery delivers reliable power for homes, offices, and solar applications—without the limitations of traditional batteries.</p>",
    feature_title: "Key Features",
    feature_description:
      "<ul><li>5× Longer Life than Lead-Acid</li><li>Lightweight & Space-Saving Design</li><li>Advanced Built-in BMS for Safety</li><li>Works with All Major Inverters & Solar Systems</li></ul>",
    media: {
      type: "image",
      path: "/images/landing-features.jpg",
      alt: "features",
    },
  },
  landingPower: {
    title: "See HiLIFE Power in Action",
    description:
      "Discover how the HiLIFE 24V 100Ah LiFePO4 Battery delivers consistent, safe, and efficient power for everyday and critical energy needs.",
    media: {
      thumbnail_path: "/images/landing-power-banner.webp",
      video_path: "/videos/about-hero.mp4",
      alt: "power",
    },
  },
  landingPerformance: {
    title: "Engineered for Performance & Longevity",
    description:
      "Smart, Safe & Long-Life Energy Storage for Inverter and Solar Systems.",
    highlight_list: [
      {
        id: 1,
        title: "Advanced LiFePO4 Technology",
        description:
          "Stable chemistry ensures higher safety and longer cycle life.",
        icon: {
          path: "/images/feature-1.svg",
          alt: "feature-1",
        },
      },
      {
        id: 2,
        title: "Built-in Battery Management System (BMS)",
        description:
          "Protects against over-charging, over-discharging, overheating, and short circuits.",
        icon: {
          path: "/images/feature-2.svg",
          alt: "feature-2",
        },
      },
      {
        id: 3,
        title: "Maintenance-Free Operation",
        description:
          "No water topping, no corrosion, no periodic servicing.",
        icon: {
          path: "/images/feature-3.svg",
          alt: "feature-3",
        },
      },
      {
        id: 4,
        title: "Compact & Lightweight",
        description:
          "Easy installation with significantly reduced space and weight.",
        icon: {
          path: "/images/feature-4.svg",
          alt: "feature-4",
        },
      },
      {
        id: 5,
        title: "Eco-Friendly & Sustainable",
        description:
          "Cleaner energy storage with reduced environmental impact.",
        icon: {
          path: "/images/feature-5.svg",
          alt: "feature-",
        },
      },
    ],
  },
};

export default function LandingPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={cn("bg-[#181818] flex", !isSidebarOpen && "overflow-hidden")}
    >
      <div
        className={cn(
          "h-full transition-all duration-700 ease-in-out",
          isSidebarOpen
            ? "w-full lg:w-[calc(100%-340px)] xl:w-[calc(100%-370px)] 2xl:w-[calc(100%-440px)] 3xl:w-[calc(100%-550px)]"
            : "w-full",
        )}
      >
        <LandingHeader />
        <LandingHero
          isSidebarOpen={isSidebarOpen}
          data={local_data?.landingHero}
        />
        <LandingFeatures
          isSidebarOpen={isSidebarOpen}
          data={local_data?.landingFeatures}
        />
        <LandingPower
          isSidebarOpen={isSidebarOpen}
          data={local_data?.landingPower}
        />
        <LandingPerformance
          isSidebarOpen={isSidebarOpen}
          data={local_data?.landingPerformance}
        />
        <LandingFooter />
      </div>
      <LandingSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </div>
  );
}
