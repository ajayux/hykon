import HomeHero from "@/components/blocks/home/home-hero";
import HomeCategories from "@/components/blocks/home/home-categories";

// import HomeAbout from "@/components/blocks/home/home-about";
// import HomeStatistics from "@/components/blocks/home/home-statistics";
// import HomeServices from "@/components/blocks/home/home-services";
import { notFound } from "next/navigation";

import dynamic from "next/dynamic";
import HomeAbout from "@/components/blocks/home/home-about";
import HomeBusiness from "@/components/blocks/home/home-business";

// Lazy load below-the-fold components for better performance
// const HomePortfolio = dynamic(
//   () => import("@/components/blocks/home/home-portfolio"),
//   {
//     loading: () => (
//       <div className="w-full py-10 sm:py-10 xl:py-17.5 2xl:py-25 bg-[#fffbf2]" />
//     ),
//     ssr: true,
//   },
// );

// const HomePartners = dynamic(
//   () => import("@/components/blocks/home/home-partners"),
//   {
//     loading: () => (
//       <div className="w-full h-auto block pt-7.5 sm:pt-10 xl:pt-17.5 2xl:pt-22.5" />
//     ),
//   },
// );

export const metadata = {
  title: "HYKON - Home",
  description:
    "HYKON - Modern Next.js boilerplate with animations and UI components",
};

export default async function HomePage() {
  let homeData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await fetch(`${baseUrl}/api/home`, {
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

  const {
    heroSection,
    categoriesSection,
    aboutSection,
    businessSection,
    services,
    portfolio,
    partners,
  } = homeData;

  return (
    <>
      {heroSection && <HomeHero data={heroSection} />}
      {categoriesSection && <HomeCategories data={categoriesSection} />}
      {aboutSection && <HomeAbout data={aboutSection} />}
      {businessSection && <HomeBusiness data={businessSection} />}

      {/* 
      {statistics && <HomeStatistics data={statistics} />}

      {services && <HomeServices data={services} />}

      {portfolio && <HomePortfolio data={portfolio} />}

      {partners && <HomePartners data={partners} />} */}
    </>
  );
}
