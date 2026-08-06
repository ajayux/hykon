import "./globals.css";
import { cn } from "@/lib/utils";
import { getFontVariable, getFontClassName } from "@/lib/fonts";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import FloatNavigation from "@/components/common/float-navigation";
import HomeQuestions from "@/components/blocks/home/home-questions";
import Providers from "./providers";
import {GoogleTagManager} from "@next/third-parties/google"
import Script from "next/script";

export const metadata = {
  verification: {
    google: "OAG15f15OYQUo2zcOL-aqfijVaKhRwqCAlyRObl7JFE",
  },
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
    process.env.NEXT_PUBLIC_SITE_URL,
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
      hasSubmenu: false,
      name: "Products",
      slug: "/category",
    },
    {
      id: 3,
      hasSubmenu: true,
      name: "Solutions",
      slug: null,
      submenu: [
        {
          id: "3-1",
          name: "Services",
          slug: "/service",
        },
        {
          id: "3-1",
          name: "Projects",
          slug: "/projects",
        },
      ],
    },
    {
      id: 4,
      hasSubmenu: true,
      name: "Insights",
      slug: null,

      submenu: [
        {
          id: "4-1",
          name: "Media",
          slug: "/news-events",
        },
        {
          id: "4-1",
          name: "Blog",
          slug: "/blog",
        },
      ],
    },
    {
      id: 5,
      hasSubmenu: false,
      name: "Career",
      slug: "/career",
    },
    {
      id: 6,
      hasSubmenu: false,
      name: "Hykonnect",
      slug: "/hykonnect",
    },
    {
      id: 7,
      hasSubmenu: false,
      name: "FAQ",
      slug: "/faq",
    },
    {
      id: 8,
      hasSubmenu: false,
      name: "Customer Care",
      slug: "/customer-care",
    },
    {
      id: 9,
      hasSubmenu: false,
      name: "Contact",
      slug: "/contact-us",
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}/api/layout`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      globalData = response.data;
    }
  } catch (error) {
    console.error("Error fetching global layout data:", error);
  }

  const {
    headerData,
    footerData,
    socialLinkData,
    questionsSection,
    mobileMenuData,
  } = globalData || {};

  const productSubmenu =
    footerData?.productCategories?.items?.map((item, index) => ({
      id: `2-${index + 1}`,
      name: item.name,
      slug: `/category/${item.slug}`,
    })) ?? [];

  const navigationData = localData.navigationData.map((navItem) =>
    navItem.id === 2 && productSubmenu.length > 0
      ? { ...navItem, submenu: productSubmenu }
      : navItem,
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
      {/* <head>
       <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head> */}
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      <Script id="xbotic-chat-widget" strategy="afterInteractive">
        {`!function(e,t,a){var c=e.head||e.getElementsByTagName("head")[0],n=e.createElement("script");n.async=!0,n.defer=!0,n.type="text/javascript",n.src=t+"/static/js/chat_widget.js?config="+JSON.stringify(a),c.appendChild(n)}(document,"https://xbotic.cbots.live",{bot_key:"1fb6735e3c794a9f",welcome_msg:true,branding_key:"xbotic",server:"https://xbotic.cbots.live",e:"p"});`}
      </Script>
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
