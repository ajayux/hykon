import HomeAbout from "@/components/blocks/home/home-about";
import HomeHero from "@/components/blocks/home/home-hero";
import HomeStatistics from "@/components/blocks/home/home-statistics";
import HomeServices from "@/components/blocks/home/home-services";
import { notFound } from "next/navigation";

import dynamic from "next/dynamic";

// Lazy load below-the-fold components for better performance
const HomePortfolio = dynamic(
  () => import("@/components/blocks/home/home-portfolio"),
  {
    loading: () => (
      <div className="w-full py-10 sm:py-10 xl:py-17.5 2xl:py-25 bg-[#fffbf2]" />
    ),
    ssr: true,
  },
);

const HomePartners = dynamic(
  () => import("@/components/blocks/home/home-partners"),
  {
    loading: () => (
      <div className="w-full h-auto block pt-7.5 sm:pt-10 xl:pt-17.5 2xl:pt-22.5" />
    ),
  },
);

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "هايكون - الصفحة الرئيسية" : "HYKON - Home",
    description:
      locale === "ar"
        ? "هايكون - قالب Next.js حديث مع دعم متعدد اللغات والرسوم المتحركة"
        : "HYKON - Modern Next.js boilerplate with internationalization and animations",
  };
}

export default async function HomePage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let homeData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await fetch(`${baseUrl}/api/home?locale=${locale}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (res.ok) {
      const response = await res.json();
      homeData = response.data;
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  if (!homeData) {
    notFound();
  }

  const { hero, aboutSection, statistics, services, portfolio, partners } =
    homeData;

  return (
    <>
      {hero?.sliders && hero.sliders.length > 0 && (
        <>
          <HomeHero data={hero} locale={locale} />
          {/* <HomeHeroWebgl data={hero} locale={locale} /> */}
        </>
      )}
      {aboutSection && <HomeAbout data={aboutSection} locale={locale} />}

      {statistics && <HomeStatistics data={statistics} locale={locale} />}

      {services && <HomeServices data={services} locale={locale} />}

      {/* {services && <HomeServicesCarousel data={services} locale={locale} />} */}

      {portfolio && <HomePortfolio data={portfolio} locale={locale} />}

      {partners && <HomePartners data={partners} locale={locale} />}
    </>
  );
}
