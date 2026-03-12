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
    template: "%s | HYKON",
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

export default async function RootLayout({ children }) {
  let globalData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/global`;

    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

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

        <Header data={headerData} navigationData={navigationData} />

        <main className="min-h-screen">
          <Providers>
          {children}
          </Providers>
          </main>

        {questionsSection && <HomeQuestions data={questionsSection} />}

        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
        />

        <Footer footerData={footerData} socialLinkData={socialLinkData} />
      </body>
    </html>
  );
}
