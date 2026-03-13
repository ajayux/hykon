import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import CategoriesDetail from "@/components/blocks/categories/categories-detail";

export const metadata = {
  title: "Product | HYKON",
  description:
    "Browse our wide range of power solutions for homes, industries, and EV ecosystems.",
};

const localData = {
  heroSection: {
    title: "Solar Water Heater",
    media: {
      type: "image",
      mobilePath:
        "https://beta.hykon.dev14.intersmarthosting.in/storage/334/parent-category-banners-1919x671-water-heater5f683406902c0.webp",
      desktopPath:
        "https://beta.hykon.dev14.intersmarthosting.in/storage/333/parent-category-banners-1919x671-water-heater5f683406902c0.webp",
      alt: "Solar Water Heater",
    },
  },
  categoryDetailSection: {
    title: "Solar Water Heater",
    description:
      '<p>Best Solar water heaters 2021, Hykon Solar Water Heaters ensures an uninterrupted supply of hot water in all seasons and is the most effective and eco-friendly way of generating hot water for domestic and commercial uses. With minimum one-time investment - you will get Free hot water without incurring any fuel costs - like Electricity, Gas, etc. All Domestic models are having "Slope roof variants " available - suitable for houses with Slanted roofing or Slate roofs. This will save the cost of additional structures for Solar water heaters in such houses. Solar water heater capacity ranges from 100 liters, 130 liters, 200 liters, 260 liters, 340 liters for up to 1000 liters capacity. HykonIndia is the most trusted seller of Solar water heaters. The bestseller of the solar water heater in India- Hykonindia.com.</p>',
    button: {
      label: "Download",
      url: "https://beta.hykon.dev14.intersmarthosting.in/storage/342/dummy-(2).pdf",
    },
    specification: {
      description:
        "<ul><li>Jupiter Series</li><li>Industrial- Solar Thermal System</li><li>Moon Series</li><li>Institutional- Jumbo Series</li><li>Pluto Series</li><li>Pressurised- Turbo Series</li></ul>",
      specificationMedia: [
        {
          id: 1,
          path: "/images/pro-spec-1.png",
          alt: "pro-spec-1",
        },
        {
          id: 2,
          path: "/images/pro-spec-1.png",
          alt: "pro-spec-1",
        },
        {
          id: 3,
          path: "/images/pro-spec-1.png",
          alt: "pro-spec-1",
        },
        {
          id: 4,
          path: "/images/pro-spec-1.png",
          alt: "pro-spec-1",
        },
        {
          id: 5,
          path: "/images/pro-spec-1.png",
          alt: "pro-spec-1",
        },
      ],
    },
    items: [
      {
        id: 1,
        title: "Jupiter Series",
        description:
          "<p>The best and ideal domestic solar water heater for all your hot water requirements at home with amazing features such as:</p><ul><li>Multi-stage Liquid Injection Puff filling</li><li>On-Site Warranty</li><li>Safe Water for Cooking Purpose</li><li>High Thermal Efficiency</li><li>Evacuated Tube with 3 Layers</li><li>Reliable Welding Technology</li><li>Rust Proof</li></ul>",
        slug: "jupiter-series",
        media: {
          type: "image",
          path: "/images/pro-varient-1.png",
          alt: "Jupiter Series",
        },
        button: {
          label: "Download",
          url: "https://beta.hykon.dev14.intersmarthosting.in/storage/342/dummy-(2).pdf",
        },
        variants: {
          title: "Jupiter Series",
          items: [
            {
              id: 1,
              title: "Jupiter 130",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
            {
              id: 2,
              title: "Jupiter 200",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
            {
              id: 3,
              title: "Jupiter 260",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
            {
              id: 4,
              title: "Jupiter 340",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
          ],
        },
      },
      {
        id: 2,
        title: "Moon Series",
        description:
          "<p>The best and ideal domestic solar water heater for all your hot water requirements at home with amazing features such as:</p><ul><li>Multi-stage Liquid Injection Puff filling</li><li>On-Site Warranty</li><li>Safe Water for Cooking Purpose</li><li>High Thermal Efficiency</li><li>Evacuated Tube with 3 Layers</li><li>Reliable Welding Technology</li><li>Rust Proof</li></ul>",
        slug: "moon-series",
        media: {
          type: "image",
          path: "/images/pro-varient-1.png",
          alt: "Jupiter Series",
        },
        button: {
          label: "Download",
          url: "https://beta.hykon.dev14.intersmarthosting.in/storage/342/dummy-(2).pdf",
        },
        variants: {
          title: "Jupiter",
          items: [
            {
              id: 1,
              title: "Jupiter 130",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
            {
              id: 2,
              title: "Jupiter 200",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
            {
              id: 3,
              title: "Jupiter 260",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
            {
              id: 4,
              title: "Jupiter 340",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
            {
              id: 5,
              title: "Jupiter 130",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
            {
              id: 6,
              title: "Jupiter 200",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
            {
              id: 7,
              title: "Jupiter 260",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
            {
              id: 8,
              title: "Jupiter 340",
              mrp: "27570",
              price: "25000",
              slug: "jupiter-130",
            },
          ],
        },
      },
    ],
  },
  metaTags: {
    id: 13,
    meta_title: "Category",
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

export default async function categoriesDetailsPage() {
  //   let productsData = null;

  //   try {
  //     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  //     const res = await fetch(`${baseUrl}/api/solar-water-heater`, {
  //       next: { revalidate: 60 },
  //     });

  //     if (res.ok) {
  //       const response = await res.json();
  //       productsData = response.data;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories data:", error);
  //   }

  //   if (!productsData) {
  //     notFound();
  //   }

  const productsData = localData;

  const { heroSection, categoryDetailSection } = productsData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="Product Category/ Product Listing1" />
      {categoryDetailSection && (
        <CategoriesDetail data={categoryDetailSection} />
      )}
    </>
  );
}
