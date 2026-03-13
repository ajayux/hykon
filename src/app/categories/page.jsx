import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import CategoriesSection from "@/components/blocks/categories/categories-section";
import CategoriesFeaturedProducts from "@/components/blocks/categories/categories-featured-products";
import CategoriesTryNow from "@/components/blocks/categories/categories-try-now";

export const metadata = {
  title: "Product Categories | HYKON",
  description:
    "Browse our wide range of power solutions for homes, industries, and EV ecosystems.",
};

const localData = {
  heroSection: {
    title: "Category",
    media: {
      type: "image",
      mobilePath:
        "https://beta.hykon.dev14.intersmarthosting.in/storage/320/banner-mobile.webp",
      desktopPath:
        "https://beta.hykon.dev14.intersmarthosting.in/storage/319/banner.webp",
      alt: "Category",
    },
  },
  categoriesSection: {
    title: "Power Solutions for Homes, Industries & EV Ecosystems",
    filters: [
      {
        id: 1,
        title: "Domestic",
        slug: "domestic",
      },
      {
        id: 2,
        title: "Corporate",
        slug: "corporate",
      },
    ],
    items: [
      {
        id: 1,
        iconPath:
          "/images/icon-categories-blue-1.svg",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/272/product-cat-white-9.png",
        name: "Solar Light",
        slug: "solar-light",
        description:
          "<p>Sustainable lighting solutions powered by solar energy</p>",
      },
      {
        id: 2,
        iconPath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/331/conversions/product-cat-white-2-converted.webp",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/332/conversions/product-cat-white-2-converted.webp",
        name: "Solar Water Heater",
        slug: "solar-water-heater",
        description:
          "<p>Best Solar water heaters 2021, Hykon Solar Water Heaters</p>",
      },
      {
        id: 3,
        iconPath:
          "/images/icon-categories-blue-1.svg",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/272/product-cat-white-9.png",
        name: "Solar Light",
        slug: "solar-light",
        description:
          "<p>Sustainable lighting solutions powered by solar energy</p>",
      },
      {
        id: 4,
        iconPath:
          "/images/icon-categories-blue-1.svg",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/272/product-cat-white-9.png",
        name: "Solar Light",
        slug: "solar-light",
        description:
          "<p>Sustainable lighting solutions powered by solar energy</p>",
      },
      {
        id: 5,
        iconPath:
          "/images/icon-categories-blue-1.svg",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/272/product-cat-white-9.png",
        name: "Solar Light",
        slug: "solar-light",
        description:
          "<p>Sustainable lighting solutions powered by solar energy</p>",
      },
      {
        id: 6,
        iconPath:
          "/images/icon-categories-blue-1.svg",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/272/product-cat-white-9.png",
        name: "Solar Light",
        slug: "solar-light",
        description:
          "<p>Sustainable lighting solutions powered by solar energy</p>",
      },
      {
        id: 7,
        iconPath:
          "/images/icon-categories-blue-1.svg",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/272/product-cat-white-9.png",
        name: "Solar Light",
        slug: "solar-light",
        description:
          "<p>Sustainable lighting solutions powered by solar energy</p>",
      },
      {
        id: 8,
        iconPath:
          "/images/icon-categories-blue-1.svg",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/272/product-cat-white-9.png",
        name: "Solar Light",
        slug: "solar-light",
        description:
          "<p>Sustainable lighting solutions powered by solar energy</p>",
      },
      {
        id: 9,
        iconPath:
          "/images/icon-categories-blue-1.svg",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/272/product-cat-white-9.png",
        name: "Solar Light",
        slug: "solar-light",
        description:
          "<p>Sustainable lighting solutions powered by solar energy</p>",
      },
      {
        id: 10,
        iconPath:
          "/images/icon-categories-blue-1.svg",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/272/product-cat-white-9.png",
        name: "Solar Light",
        slug: "solar-light",
        description:
          "<p>Sustainable lighting solutions powered by solar energy</p>",
      },
      {
        id: 11,
        iconPath:
          "/images/icon-categories-blue-1.svg",
        iconWhitePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/272/product-cat-white-9.png",
        name: "Solar Light",
        slug: "solar-light",
        description:
          "<p>Sustainable lighting solutions powered by solar energy</p>",
      },
    ],
  },
  featuresSection: {
    title: "Featured Products",
    description: "<p>Explore our best-selling and high-performance models.</p>",
    items: [
      {
        id: 1,
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
        title: "Inline UPS",
        slug: "inline-ups",
        description:
          "<p>Green Inline UPS with advanced battery charging technology ensures...</p>",
      },
      {
        id: 2,
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/339/parent-category-banners-1919x671-water-heater5f683406902c0.webp",
          alt: "Line Interactive UPS",
        },
        title: "Line Interactive UPS",
        slug: "line-interactive-ups",
        description:
          "<p>The line-interactive UPS from Hykon comes with a multi-tap variable...</p>",
      },
      {
        id: 3,
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
        title: "Inline UPS",
        slug: "inline-ups",
        description:
          "<p>Green Inline UPS with advanced battery charging technology ensures...</p>",
      },
      {
        id: 4,
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/339/parent-category-banners-1919x671-water-heater5f683406902c0.webp",
          alt: "Line Interactive UPS",
        },
        title: "Line Interactive UPS",
        slug: "line-interactive-ups",
        description:
          "<p>The line-interactive UPS from Hykon comes with a multi-tap variable...</p>",
      },
      {
        id: 6,
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
        title: "Inline UPS",
        slug: "inline-ups",
        description:
          "<p>Green Inline UPS with advanced battery charging technology ensures...</p>",
      },
      {
        id: 7,
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/339/parent-category-banners-1919x671-water-heater5f683406902c0.webp",
          alt: "Line Interactive UPS",
        },
        title: "Line Interactive UPS",
        slug: "line-interactive-ups",
        description:
          "<p>The line-interactive UPS from Hykon comes with a multi-tap variable...</p>",
      },
      {
        id: 8,
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
        title: "Inline UPS",
        slug: "inline-ups",
        description:
          "<p>Green Inline UPS with advanced battery charging technology ensures...</p>",
      },
      {
        id: 9,
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/339/parent-category-banners-1919x671-water-heater5f683406902c0.webp",
          alt: "Line Interactive UPS",
        },
        title: "Line Interactive UPS",
        slug: "line-interactive-ups",
        description:
          "<p>The line-interactive UPS from Hykon comes with a multi-tap variable...</p>",
      },
    ],
  },
  tryNowSection: {
    title: "Not Sure What You Need?",
    description:
      "<p>Try Volt Search Tool to find the perfect power solution for your requirements.</p>",
    media: {
      type: "image",
      mobilePath:
        "/images/categories-need-bg.jpg",
      desktopPath:
        "/images/categories-need-bg.jpg",
      alt: "Empowering a Greener Tomorrow!",
    },
  },
  metaTags: {
    id: 13,
    meta_title: "Category",
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

export default async function CategoriesPage() {
  //   let categoriesData = null;

  //   try {
  //     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  //     const res = await fetch(`${baseUrl}/api/categories`, {
  //       next: { revalidate: 60 },
  //     });

  //     if (res.ok) {
  //       const response = await res.json();
  //       categoriesData = response.data;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories data:", error);
  //   }

  //   if (!categoriesData) {
  //     notFound();
  //   }

  const categoriesData = localData;

  const {
    heroSection,
    categoriesSection,
    featuresSection,
    tryNowSection,
  } = categoriesData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="Product Category" />
      {categoriesSection && <CategoriesSection data={categoriesSection} />}
      {featuresSection && <CategoriesFeaturedProducts data={featuresSection} />}
      {tryNowSection && <CategoriesTryNow data={tryNowSection} />}
    </>
  );
}
