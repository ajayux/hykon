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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
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
    productSection,
    powerSection,
    vendorSection,
    newsSection,
    promotionsSection,
    blogsSection,
  } = homeData;

  // const localData = {
  //   productsSection: {
  //     title: "Categories",
  //     corporateItems: {
  //       id: "01",
  //       title: "Corporate",
  //       items: [
  //         {
  //           id: 1,
  //           title: "Solar Light",
  //           description:
  //             "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
  //         },
  //         {
  //           id: 2,
  //           title: "Solar power packs",
  //           description:
  //             "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
  //         },
  //         {
  //           id: 3,
  //           title: "Lithium Battery",
  //           description:
  //             "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
  //         },
  //         {
  //           id: 4,
  //           title: "Electric Vehicle",
  //           description:
  //             "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
  //         },
  //         {
  //           id: 5,
  //           title: "Heat Pump",
  //           description:
  //             "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
  //         },
  //         {
  //           id: 6,
  //           title: "E-Generator",
  //           description:
  //             "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
  //         },
  //         {
  //           id: 7,
  //           title: "BESS",
  //           description:
  //             "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
  //         },
  //       ],
  //       productsItems: [
  //         {
  //           id: 1,
  //           media: {
  //             path: "/images/pro-1.png",
  //             alt: "pro-1",
  //           },
  //           title: "Flash torch light",
  //           slug: "flash-torch-light",
  //           description:
  //             "Hykon Solar flash torch light is a torch that can be charged using solar power",
  //         },
  //         {
  //           id: 2,
  //           media: {
  //             path: "/images/pro-2.png",
  //             alt: "pro-2",
  //           },
  //           title: "Wallite series",
  //           slug: "wallite-series",
  //           description:
  //             "Hykon wallite series solar light is meant for lighting walls in pathway or stairs.",
  //         },
  //         {
  //           id: 3,
  //           media: {
  //             path: "/images/pro-3.png",
  //             alt: "pro-3",
  //           },
  //           title: "Aurora series",
  //           slug: "aurora-series",
  //           description:
  //             "Hykon Aurora series is of solar lantern lights that can lit up your....",
  //         },
  //         {
  //           id: 4,
  //           media: {
  //             path: "/images/pro-4.png",
  //             alt: "pro-4",
  //           },
  //           title: "Billite series",
  //           slug: "billite-series",
  //           description:
  //             "Hykon Billite series solar light is solar hoarding light with inbuilt lithium...",
  //         },
  //         {
  //           id: 5,
  //           media: {
  //             path: "/images/pro-5.png",
  //             alt: "pro-5",
  //           },
  //           title: "Solo R series",
  //           slug: "solo-r-series",
  //           description:
  //             "Hykon Solo R series is a solar street light which includes higher....",
  //         },
  //         {
  //           id: 6,
  //           media: {
  //             path: "/images/pro-6.png",
  //             alt: "pro-6",
  //           },
  //           title: "Solo R series",
  //           slug: "solo-r-series-2",
  //           description:
  //             "Hykon Solo R series is a solar street light which includes higher....",
  //         },
  //       ],
  //     },
  //     domesticItems: {
  //       id: "02",
  //       title: "Domestic",
  //       items: [
  //         {
  //           id: 1,
  //           title: "UPS & Inverters",
  //           description:
  //             "Hykon UPS is the best solution for power issues ensuring high-quality power for critical loads. Hykon provides Online UPS & Live Interactive Inverter India with a variety of products. A UPS can provide protection against power issues so that you don't have to worry about power outages. Expensive appliances need protection from power surges, spikes or dips, irregularities, and fluctuations in power which may have an adverse effect on your appliance.",
  //         },
  //         {
  //           id: 2,
  //           title: "E-Power Tools",
  //           description:
  //             "Hykon UPS is the best solution for power issues ensuring high-quality power for critical loads. Hykon provides Online UPS & Live Interactive Inverter India with a variety of products. A UPS can provide protection against power issues so that you don't have to worry about power outages. Expensive appliances need protection from power surges, spikes or dips, irregularities, and fluctuations in power which may have an adverse effect on your appliance.",
  //         },
  //         {
  //           id: 3,
  //           title: "Solar Water Heater",
  //           description:
  //             "Hykon UPS is the best solution for power issues ensuring high-quality power for critical loads. Hykon provides Online UPS & Live Interactive Inverter India with a variety of products. A UPS can provide protection against power issues so that you don't have to worry about power outages. Expensive appliances need protection from power surges, spikes or dips, irregularities, and fluctuations in power which may have an adverse effect on your appliance.",
  //         },
  //         {
  //           id: 4,
  //           title: "Solar Hybrid Inverter",
  //           description:
  //             "Hykon UPS is the best solution for power issues ensuring high-quality power for critical loads. Hykon provides Online UPS & Live Interactive Inverter India with a variety of products. A UPS can provide protection against power issues so that you don't have to worry about power outages. Expensive appliances need protection from power surges, spikes or dips, irregularities, and fluctuations in power which may have an adverse effect on your appliance.",
  //         },
  //         {
  //           id: 5,
  //           title: "Stainless steel water tank",
  //           description:
  //             "Hykon UPS is the best solution for power issues ensuring high-quality power for critical loads. Hykon provides Online UPS & Live Interactive Inverter India with a variety of products. A UPS can provide protection against power issues so that you don't have to worry about power outages. Expensive appliances need protection from power surges, spikes or dips, irregularities, and fluctuations in power which may have an adverse effect on your appliance.",
  //         },
  //       ],
  //       productsItems: [
  //         {
  //           id: 1,
  //           media: {
  //             path: "/images/pro-domestic-1.png",
  //             alt: "pro-1",
  //           },
  //           title: "Halo Home UPS",
  //           slug: "/products/halo-home-ups",
  //           description:
  //             "Hykon Halo Inverter, with its inbuilt Lithium Ferro-Phosphate...",
  //         },
  //         {
  //           id: 2,
  //           media: {
  //             path: "/images/pro-domestic-2.png",
  //             alt: "pro-2",
  //           },
  //           title: "Power Inverter",
  //           slug: "/products/power-inverter",
  //           description:
  //             "Hykon power inverter is an advanced DSP based intelligent control ...",
  //         },
  //         {
  //           id: 3,
  //           media: {
  //             path: "/images/pro-domestic-3.png",
  //             alt: "pro-3",
  //           },
  //           title: "Online UPS",
  //           slug: "/products/online-ups",
  //           description:
  //             "Hykon Online UPS supplies power irrespective of whether the mains...",
  //         },
  //         {
  //           id: 4,
  //           media: {
  //             path: "/images/pro-domestic-4.png",
  //             alt: "pro-4",
  //           },
  //           title: "Inline UPS",
  //           slug: "/products/inline-ups",
  //           description:
  //             "Green Inline UPS with advanced battery charging technology ensures...",
  //         },
  //         {
  //           id: 5,
  //           media: {
  //             path: "/images/pro-domestic-5.png",
  //             alt: "pro-5",
  //           },
  //           title: "Line Interactive UPS",
  //           slug: "/products/line-interactive-ups",
  //           description:
  //             "The line-interactive UPS from Hykon comes with a multi-tap variable...",
  //         },
  //         {
  //           id: 6,
  //           media: {
  //             path: "/images/pro-domestic-6.png",
  //             alt: "pro-6",
  //           },
  //           title: "Tubular Battery",
  //           slug: "/products/tubular-battery",
  //           description:
  //             "Hykon Bedtype Batteries for inverter and UPS applications & Hykon Tall...",
  //         },
  //       ],
  //     },
  //   },
  // };

  return (
    <>
      {heroSection && <HomeHero data={heroSection} />}
      {categoriesSection && <HomeCategories data={categoriesSection} />}
      {aboutSection && <HomeAbout data={aboutSection} />}
      {businessSection && <HomeBusiness data={businessSection} />}
      {productSection && (
        <HomeProducts data={productSection} />
      )}
      {
        powerSection && vendorSection &&
      <HomePowerVendor powerData={powerSection} vendorData={vendorSection} />
      }
      {newsSection && <HomeNews data={newsSection} />}
      {promotionsSection && <HomePromotions data={promotionsSection} />}
      {blogsSection && <HomeBlogs data={blogsSection} />}
    </>
  );
}
