import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { getFontVariable, getFontClassName } from "@/lib/fonts";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import FloatNavigation from "@/components/common/float-navigation";
import HomeQuestions from "@/components/blocks/home/home-questions";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "HYKON",
    template: "%s",
  },
  description: "Modern Next.js boilerplate with animations and UI components.",
  keywords: ["nextjs", "react", "tailwind", "boilerplate", "framer-motion"],
  authors: [{ name: "HYKON" }],
  creator: "HYKON",
  publisher: "HYKON",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HYKON",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hykon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const dynamic = "force-dynamic";


const localData = {
     navigationData: [
      {
        id: 1,
        hasSubmenu: false,
        name: "About",
        slug: "/about",
      },
      {
        id: 2,
        hasSubmenu: true,
        name: "Products",
        slug: "/categories",
        submenu: [
          {
            id: "2-1",
            name: "Solar Water Heater",
            slug: "/categories/solar-water-heater",
          },
          {
            id: "2-2",
            name: "SST",
            slug: "/categories/sst",
          },
          {
            id: "2-3",
            name: "Inverter Battery",
            slug: "/categories/inverter-battery",
          },
          {
            id: "2-4",
            name: "Lithium Battery",
            slug: "/categories/lithium-battery",
          },
          {
            id: "2-5",
            name: "Electric Vehicle",
            slug: "/categories/electric-vehicle",
          },
          {
            id: "2-6",
            name: "E-Generator",
            slug: "/categories/e-generator",
          },
          {
            id: "2-7",
            name: "BESS",
            slug: "/categories/bess",
          },
          {
            id: "2-8",
            name: "UPS",
            slug: "/categories/ups",
          },
          {
            id: "2-9",
            name: "Solar Systems",
            slug: "/categories/solar-systems",
          },
          {
            id: "2-10",
            name: "Heat Pump",
            slug: "/categories/heat-pump",
          },
        ],
      },
      {
        id: 3,
        hasSubmenu: true,
        name: "Contact",
        slug: "/contact",
      },
      {
        id: 4,
        hasSubmenu: false,
        name: "News",
        slug: "/news",
      },
      {
        id: 5,
        hasSubmenu: false,
        name: "Blogs",
        slug: "/blogs",
      },
      {
        id: 6,
        hasSubmenu: false,
        name: "Career",
        slug: "/careers",
      },
      {
        id: 7,
        hasSubmenu: false,
        name: "Hykonnect",
        slug: "/hykonnect",
      },
      {
        id: 8,
        hasSubmenu: false,
        name: "FAQ",
        slug: "/faq",
      },
      {
        id: 9,
        hasSubmenu: true,
        name: "Customer Care",
        slug: "/customer-care",
        submenu: [
          {
            id: "9-1",
            name: "Warranty Registration",
            slug: "/customer-care/warranty-registration",
          },
          {
            id: "9-2",
            name: "Register Complaints",
            slug: "/customer-care/register-complaints",
          },
          {
            id: "9-3",
            name: "Privacy Policy",
            slug: "/customer-care/privacy-policy",
          },
          {
            id: "9-4",
            name: "Terms & Conditions",
            slug: "/customer-care/terms-conditions",
          },
          {
            id: "9-5",
            name: "Return Policy",
            slug: "/customer-care/return-policy",
          },
          {
            id: "9-6",
            name: "Shipping Policy",
            slug: "/customer-care/shipping-policy",
          },
          {
            id: "9-7",
            name: "Investor Relations",
            slug: "/customer-care/investor-relations",
          },
          {
            id: "9-8",
            name: "Categories",
            slug: "/categories",
          },
        ],
      },
    ],
      quickLinks: {
        title: "Quick Links",
        items: [
          {
            id: 0,
            label: "About",
            slug: "/about",
          },
          {
            id: 1,
            label: "FAQ",
            slug: "/faq",
          },
          {
            id: 2,
            label: "Customer Care",
            slug: "/customer-care",
          },
          {
            id: 1,
            label: "Warranty Registration",
            slug: "/warranty-complaints",
          },
          {
            id: 3,
            label: "Hykonnect",
            slug: "/hykonnect",
          },
          {
            id: 4,
            label: "Terms & Conditions",
            slug: "/terms",
          },
          {
            id: 7,
            label: "Investor Relations",
            slug: "/investor-relations",
          },
          {
            id: 8,
            label: "Factory",
            slug: "/factory",
          },
          {
            id: 9,
            label: "Career",
            slug: "/careers",
          },
          {
            id: 12,
            label: "News",
            slug: "/news",
          },
          {
            id: 13,
            label: "Contact",
            slug: "/contact",
          },
          {
            id: 14,
            label: "Power Calculator",
            slug: "/power-calculator",
          },
        ],
      },
}


export default async function RootLayout({ children }) {
  let globalData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/layout`;

    const res = await fetch(url);

    if (res.ok) {
      const response = await res.json();
      globalData = response.data;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching global data:", error);
    }
  }

  // Fallback data if API fails
  // const fallbackData = {
  //   headerData: {
  //     name: "HYKON",
  //     logoUrl: "/images/logo.svg",
  //     logoWhiteUrl: "/images/logo-white.svg",
  //   },
  //   navigationData: [],
  //   footerData: {
  //     name: "HYKON",
  //     logoUrl: "/images/logo.svg",
  //   },
  //   socialLinkData: [],
  // };

  const {
    headerData,
    navigationData,
    footerData,
    socialLinkData,
    questionsSection,
    mobileMenuData,
  } = globalData;

  const fontVariable = getFontVariable();
  const fontClassName = getFontClassName();

  return (
    <html
      lang="en"
      dir="ltr"
      className={cn(fontVariable, "antialiased")}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={cn("antialiased", fontClassName, fontVariable)}>
        {/* <FloatNavigation /> */}

        <Header
          data={headerData}
          navigationData={localData?.navigationData}
          socialLinkData={socialLinkData}
          mobileMenuData={mobileMenuData}
        />

        <main className="min-h-screen">
          <Providers>
            {children}
            {questionsSection && <HomeQuestions data={questionsSection} />}
          </Providers>
        </main>

        <Toaster position="top-right" richColors closeButton expand />

        <Footer quickLinks={localData?.quickLinks} footerData={footerData} socialLinkData={socialLinkData} />
      </body>
    </html>
  );
}
