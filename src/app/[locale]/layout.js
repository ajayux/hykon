import "./../globals.css";
import { cn } from "@/lib/utils";
import { locales, localeDirection } from "../../il8n/config";
import { getFontVariable, getFontClassName } from "@/lib/fonts";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CursorFollower from "@/components/animations/cursor-follower";
import PageLoader from "@/components/animations/page-loader";
import SmoothScrolling from "@/components/utils/smooth-scrolling";
import FloatNavigation from "@/components/common/float-navigation";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: {
    default: "HYKON",
    template: "%s | HYKON",
  },
  description:
    "Modern Next.js boilerplate with internationalization, animations, and UI components.",
  keywords: [
    "nextjs",
    "react",
    "tailwind",
    "boilerplate",
    "i18n",
    "framer-motion",
  ],
  authors: [{ name: "HYKON" }],
  creator: "HYKON",
  publisher: "HYKON",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_AE",
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

export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;

  const locale = resolvedParams.locale;
  const dir = localeDirection[resolvedParams.locale] || "ltr";

  let globalData = null;

  try {
    // During build, use relative URL or skip fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const url = `${baseUrl}/api/global?locale=${locale}`;

    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (res.ok) {
      const response = await res.json();
      globalData = response.data;
    }
  } catch (error) {
    // Silently fail during build - will use fallback data
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching global data:", error);
    }
  }

  // Fallback data if API fails
  const fallbackData = {
    header_data: {
      name: "HYKON",
      name_ar: "هايكون",
      logoUrl: "/images/logo.svg",
      logoWhiteUrl: "/images/logo-white.svg",
    },
    navigation_data: [],
    footer_data: {
      name: "HYKON",
      name_ar: "هايكون",
      logoUrl: "/images/logo.svg",
    },
    social_link_data: [],
  };

  const data = globalData || fallbackData;

  const fontVariable = getFontVariable(locale);
  const fontClassName = getFontClassName(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(fontVariable, "antialiased")}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={cn("antialiased", fontClassName, fontVariable)}>
        <SmoothScrolling>
          <PageLoader />
          <CursorFollower />
          <FloatNavigation locale={locale} />

          <Header
            locale={locale}
            headerData={data.header_data}
            navigationData={data.navigation_data}
          />

          <main className="min-h-screen">{children}</main>

          <Footer
            locale={locale}
            footerData={data.footer_data}
            socialLinkData={data.social_link_data}
          />
        </SmoothScrolling>
      </body>
    </html>
  );
}
