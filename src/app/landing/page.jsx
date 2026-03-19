"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import LandingHero from "@/components/blocks/landing/landing-hero";
import LandingPower from "@/components/blocks/landing/landing-power";
import LandingHomes from "@/components/blocks/landing/laning-homes";
import LandingHeader from "@/components/blocks/landing/landing-header";
import LandingFooter from "@/components/blocks/landing/landing-footer";
import LandingSidebar from "@/components/blocks/landing/landing-sidebar";
import LandingTrusted from "@/components/blocks/landing/landing-trusted";
import LandingFeatures from "@/components/blocks/landing/landing-feature";
import LandingPerformance from "@/components/blocks/landing/landing-performance";

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
      video_path: "/videos/dummy-video.mp4",
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
        iconPath: "/images/feature-1.svg",
      },
      {
        id: 2,
        title: "Built-in Battery Management System (BMS)",
        description:
          "Protects against over-charging, over-discharging, overheating, and short circuits.",
        iconPath: "/images/feature-2.svg",
      },
      {
        id: 3,
        title: "Maintenance-Free Operation",
        description: "No water topping, no corrosion, no periodic servicing.",
        iconPath: "/images/feature-3.svg",
      },
      {
        id: 4,
        title: "Compact & Lightweight",
        description:
          "Easy installation with significantly reduced space and weight.",
        iconPath: "/images/feature-4.svg",
      },
      {
        id: 5,
        title: "Eco-Friendly & Sustainable",
        description:
          "Cleaner energy storage with reduced environmental impact.",
        iconPath: "/images/feature-5.svg",
      },
    ],
    specifications_list: [
      {
        id: 1,
        label: "Battery Type",
        value: "LiFePO4",
      },
      {
        id: 2,
        label: "Nominal Voltage",
        value: "25.6 V",
      },
      {
        id: 3,
        label: "Capacity",
        value: "100 Ah",
      },
      {
        id: 4,
        label: "Charging Voltage",
        value: "28.8 V",
      },
      {
        id: 5,
        label: "Standard Charging Current",
        value: "50 A (0.5C)",
      },
      {
        id: 6,
        label: "Max Discharge Current",
        value: "100 A",
      },
      {
        id: 7,
        label: "Dimensions (L×W×H)",
        value: "370 × 150 × 360 mm",
      },
      {
        id: 8,
        label: "Weight",
        value: "Approx. 24 kg",
      },
      {
        id: 9,
        label: "Compatibility",
        value: "All inverter & solar systems",
      },
      {
        id: 10,
        label: "Warranty",
        value: "5 Years",
      },
    ],
  },
  landingTrusted: {
    title: "Trusted by Thousands of Indian Homes",
    description:
      "Chosen by families across India for quality, comfort, and reliability.",
    trusted_list: [
      {
        id: 1,
        description:
          "After switching to Hykon’s LiFePO4 battery, our backup time improved drastically, and maintenance is zero. Highly recommended.",
        name: "Homeowner",
        location: "Kerala",
        media: {
          path: "/images/trusted-1.jpg",
          alt: "trusted-1",
        },
      },
      {
        id: 2,
        description:
          "Compact, lightweight and reliable. Perfect for our solar installation projects.",
        name: "Solar Installer Partner",
        location: "Kerala",
        media: {
          path: "/images/trusted-2.jpg",
          alt: "trusted-1",
        },
      },
      {
        id: 3,
        description:
          "Hykon has always been dependable. This battery is a solid upgrade from traditional systems.",
        name: "Commercial User",
        location: "Kerala",
        media: {
          path: "/images/trusted-3.jpg",
          alt: "trusted-1",
        },
      },
      {
        id: 4,
        description:
          "Compact, lightweight and reliable. Perfect for our solar installation projects.Compact, lightweight and reliable. Perfect for our solar installation projects.Compact, lightweight and reliable. Perfect for our solar installation projects.",
        name: "Solar Installer Partner",
        location: "Kerala",
        media: {
          path: "/images/trusted-2.jpg",
          alt: "trusted-1",
        },
      },
    ],
  },
  landingHomes: {
    countNumber: 50000,
    suffix: "+",
    title: "Happy Homes Powered Since 1991",
    description:
      "With over three decades of expertise in power and energy solutions, Hykon is a name trusted across India for innovation, quality, and reliability.",
    feature_list: [
      {
        id: 1,
        iconPath: "/images/landing-home-icon-1.svg",
        title: "30+ Years of Industry Experience",
      },
      {
        id: 2,
        iconPath: "/images/landing-home-icon-2.svg",
        title: "5 Year Product Warranty",
      },
      {
        id: 3,
        iconPath: "/images/landing-home-icon-3.svg",
        title: "Made for Indian Power Conditions",
      },
      {
        id: 4,
        iconPath: "/images/landing-home-icon-4.svg",
        title: "Nationwide Dealer & Service Network",
      },
    ],
  },
  landingFooter: {
    logoUrl: "/images/footer-logo.svg",
    logoName: "Hykon",
    description:
      "Hykon India has successfully evolved its expertise from power electronics into a leader in sustainable energy.",
    contactInfo: {
      phone: "+91 123 456 7890",
      email: "info@company.com",
      isExternal: true,
    },
    locations: [
      {
        id: 1,
        email: "info@company.com",
        title: "Thrissur",
        isExternal: true,
      },
      {
        id: 2,
        email: "info@company.com",
        title: "Coimbatore",
        isExternal: true,
      },
      {
        id: 3,
        email: "info@company.com",
        title: "Kochi",
        isExternal: true,
      },
      {
        id: 4,
        email: "info@company.com",
        title: "Pune",
        isExternal: true,
      },
    ],
    copyright: "© 2026 HYKON. All rights reserved.",
    socialLinkData: [
      {
        link: "/",
        icon: "/images/facebook.svg",
        name: "Facebook",
      },
      {
        link: "/",
        icon: "/images/youtube.svg",
        name: "youtube",
      },
      {
        link: "/",
        icon: "/images/instagram.svg",
        name: "instagram",
      },
      {
        link: "/",
        icon: "/images/linkedin.svg",
        name: "linkedin",
      },
      {
        link: "/",
        icon: "/images/x.svg",
        name: "x",
      },
    ],
  },
};

export default function LandingPage() {
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
        <LandingTrusted
          isSidebarOpen={isSidebarOpen}
          data={local_data?.landingTrusted}
        />
        <LandingHomes
          isSidebarOpen={isSidebarOpen}
          data={local_data?.landingHomes}
        />
        <LandingFooter
          isSidebarOpen={isSidebarOpen}
          data={local_data?.landingFooter}
        />
      </div>
      <LandingSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </div>
  );
}
