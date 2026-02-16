import "./globals.css";
import { cn } from "@/lib/utils";
import { getFontVariable, getFontClassName } from "@/lib/fonts";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CursorFollower from "@/components/animations/cursor-follower";
import PageLoader from "@/components/animations/page-loader";
import SmoothScrolling from "@/components/utils/smooth-scrolling";
import FloatNavigation from "@/components/common/float-navigation";

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
  const fallbackData = {
    header_data: {
      name: "HYKON",
      logoUrl: "/images/logo.svg",
      logoWhiteUrl: "/images/logo-white.svg",
    },
    navigation_data: [],
    footer_data: {
      name: "HYKON",
      logoUrl: "/images/logo.svg",
    },
    social_link_data: [],
  };

  const data = globalData || fallbackData;

  const fontVariable = getFontVariable("en");
  const fontClassName = getFontClassName("en");

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
        <SmoothScrolling>
          <PageLoader />
          <CursorFollower />
          <FloatNavigation />

          <Header
            headerData={data.header_data}
            navigationData={data.navigation_data}
          />

          <main className="min-h-screen">{children}</main>

          <Footer
            footerData={data.footer_data}
            socialLinkData={data.social_link_data}
          />
        </SmoothScrolling>
      </body>
    </html>
  );
}
