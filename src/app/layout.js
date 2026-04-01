import "./globals.css";
import { cn } from "@/lib/utils";
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
  authors: [{ name: "intersmart" }],
  creator: "intersmart",
  publisher: "intersmart",
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
      slug: "/about-us",
    },
    {
      id: 2,
      hasSubmenu: true,
      name: "Products",
      slug: "/category",
      // submenu: [
      //   {
      //     id: "2-1",
      //     name: "Solar Water Heater",
      //     slug: "/category/solar-water-heater",
      //   },
      //   {
      //     id: "2-2",
      //     name: "SST",
      //     slug: "/category/sst",
      //   },
      //   {
      //     id: "2-3",
      //     name: "Inverter Battery",
      //     slug: "/category/inverter-battery",
      //   },
      //   {
      //     id: "2-4",
      //     name: "Lithium Battery",
      //     slug: "/category/lithium-battery",
      //   },
      //   {
      //     id: "2-5",
      //     name: "Electric Vehicle",
      //     slug: "/category/electric-vehicle",
      //   },
      //   {
      //     id: "2-6",
      //     name: "E-Generator",
      //     slug: "/category/e-generator",
      //   },
      //   {
      //     id: "2-7",
      //     name: "BESS",
      //     slug: "/category/bess",
      //   },
      //   {
      //     id: "2-8",
      //     name: "UPS",
      //     slug: "/category/ups",
      //   },
      //   {
      //     id: "2-9",
      //     name: "Solar Systems",
      //     slug: "/category/solar-systems",
      //   },
      //   {
      //     id: "2-10",
      //     name: "Heat Pump",
      //     slug: "/category/heat-pump",
      //   },
      // ],
    },
    {
      id: 3,
      hasSubmenu: false,
      name: "Contact",
      slug: "/contact-us",
    },
    {
      id: 4,
      hasSubmenu: false,
      name: "News",
      slug: "/news-events",
    },
    {
      id: 5,
      hasSubmenu: false,
      name: "Blogs",
      slug: "/blog",
    },
    {
      id: 6,
      hasSubmenu: false,
      name: "Career",
      slug: "/career",
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
      hasSubmenu: false,
      name: "Customer Care",
      slug: "/customer-care",
    },
  ],
  quickLinks: {
    title: "Quick Links",
    items: [
      {
        id: 0,
        label: "About",
        slug: "/about-us",
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
        label: "Warranty & Complaints",
        slug: "/warranty",
      },
      {
        id: 3,
        label: "Hykonnect",
        slug: "/hykonnect",
      },
      {
        id: 4,
        label: "Terms & Conditions",
        slug: "/terms-and-conditions",
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
        slug: "/career",
      },
      {
        id: 12,
        label: "News",
        slug: "/news-events",
      },
      {
        id: 13,
        label: "Contact",
        slug: "/contact-us",
      },
      {
        id: 14,
        label: "Power Calculator",
        slug: "/power-calculator",
      },
      {
        id: 15,
        label: "Service",
        slug: "/service",
      },
      {
        id: 15,
        label: "Privacy Policy",
        slug: "/privacy-policy",
      },
    ],
  },
};

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
    footerData,
    socialLinkData,
    questionsSection,
    mobileMenuData,
  } = globalData;

  const productSubmenu =
    footerData?.productCategories?.items?.map((item, index) => ({
      id: `2-${index + 1}`,
      name: item.name,
      slug: `/category/${item.slug}`,
    })) ?? [];

  const navigationData = localData.navigationData.map((navItem) =>
    navItem.id === 2 && productSubmenu.length > 0
      ? { ...navItem, submenu: productSubmenu }
      : navItem
  );

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
      </head>
      <body className={cn("antialiased", fontClassName, fontVariable)}>
        <FloatNavigation />

        <Header
          data={headerData}
          navigationData={navigationData}
          socialLinkData={socialLinkData}
          mobileMenuData={mobileMenuData}
        />

        <main className="min-h-screen">
          <Providers>
            {children}
            {questionsSection && <HomeQuestions data={questionsSection} />}
          </Providers>
        </main>

        <Footer
          quickLinks={localData?.quickLinks}
          footerData={footerData}
          socialLinkData={socialLinkData}
        />
      </body>
    </html>
  );
}
