import { notFound } from "next/navigation";

import HomeHero from "@/components/blocks/home/home-hero";
import HomeCategories from "@/components/blocks/home/home-categories";

import HomeAbout from "@/components/blocks/home/home-about";
import HomeBusiness from "@/components/blocks/home/home-business";
import HomePowerVendor from "@/components/blocks/home/home-power-vendor";
import HomeNews from "@/components/blocks/home/home-news";
import HomePromotions from "@/components/blocks/home/home-promotions";
import HomeBlogs from "@/components/blocks/home/home-blogs";
import HomeProducts from "@/components/blocks/home/home-products";
import { apiClient } from "@/lib/api/client";
import { getMetaData } from "@/lib/api/metaApi";

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


export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("home");

  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  };
}


export default async function HomePage() {
  let homeData = null;

 try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/home`, {
      next: { revalidate: 60 },
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
    productSection,
    powerSection,
    vendorSection,
    newsSection,
    promotionsSection,
    blogsSection,
  } = homeData;

  

  return (
    <>
      {heroSection && <HomeHero data={heroSection} />}
      {categoriesSection && <HomeCategories data={categoriesSection} />}
      {aboutSection && <HomeAbout data={aboutSection} />}
      {businessSection && <HomeBusiness data={businessSection} />}
      {productSection &&
      <HomeProducts data={productSection} />
       }
      {powerSection && vendorSection && (
        <HomePowerVendor powerData={powerSection} vendorData={vendorSection} />
      )}
      {newsSection && <HomeNews data={newsSection} />}
      {promotionsSection && <HomePromotions data={promotionsSection} />}
      {blogsSection && <HomeBlogs data={blogsSection} />}
    </>
  );
}
