import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import ProductListing from "@/components/blocks/products/product-listing";
import { getMetaData } from "@/lib/api/metaApi";
import { API_BASE_URL } from "@/lib/api/constants";

export async function generateMetadata() {
  const {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  } = await getMetaData("products");
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

// const localData = {
//   heroSection: {
//     title: null,
//     media: {
//       type: "image",
//       mobilePath: "/images/products-hero-1.jpg",
//       desktopPath: "/images/products-hero-1.jpg",
//       alt: "Products",
//     },
//   },

//   productSection: {
//     filters: {
//       title: "Category",
//       categoryItems: [
//         {
//           id: 1,
//           name: "Pressurised Turbo Series",
//           slug: "pressurised-turbo-series",
//         },
//         {
//           id: 2,
//           name: "Jupiter Series",
//           slug: "jupiter-series",
//         },
//         {
//           id: 3,
//           name: "Industrial Solar Thermal System",
//           slug: "industrial-solar-thermal-system",
//         },
//         {
//           id: 4,
//           name: "Pluto Series",
//           slug: "pluto-series",
//         },
//         {
//           id: 5,
//           name: "Moon Series",
//           slug: "moon-series",
//         },
//         {
//           id: 6,
//           name: "Institutional Jumbo Series",
//           slug: "institutional-jumbo-series",
//         },
//       ],
//     },
//     // productInfo: {
//     //   title: "Jupiter Series",
//     //   slug: "jupiter-series",
//     //   productItems: [
//     //     {
//     //       id: 1,
//     //       title: "Jupiter 130",
//     //       slug: "jupiter-130",
//     //       mrp: "27570",
//     //       price: "25000",
//     //       media: {
//     //         path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
//     //         alt: "Inline UPS",
//     //       },
//     //     },
//     //     {
//     //       id: 2,
//     //       title: "Jupiter 200",
//     //       slug: "jupiter-200",
//     //       mrp: "43700",
//     //       price: "39018",
//     //       media: {
//     //         path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
//     //         alt: "Inline UPS",
//     //       },
//     //     },
//     //     {
//     //       id: 3,
//     //       title: "Jupiter 250",
//     //       slug: "jupiter-250",
//     //       mrp: "56600",
//     //       price: "50000",
//     //       media: {
//     //         path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
//     //         alt: "Inline UPS",
//     //       },
//     //     },
//     //     {
//     //       id: 4,
//     //       title: "Jupiter 250",
//     //       slug: "jupiter-250",
//     //       mrp: "56600",
//     //       price: "50000",
//     //       media: {
//     //         path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
//     //         alt: "Inline UPS",
//     //       },
//     //     },
//     //     {
//     //       id: 5,
//     //       title: "Jupiter 250",
//     //       slug: "jupiter-250",
//     //       mrp: "56600",
//     //       price: "50000",
//     //       media: {
//     //         path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
//     //         alt: "Inline UPS",
//     //       },
//     //     },
//     //     {
//     //       id: 6,
//     //       title: "Jupiter 250",
//     //       slug: "jupiter-250",
//     //       mrp: "56600",
//     //       price: "50000",
//     //       media: {
//     //         path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
//     //         alt: "Inline UPS",
//     //       },
//     //     },
//     //   ],
//     //   pagination: {
//     //     current_page: 1,
//     //     last_page: 1,
//     //     per_page: 8,
//     //     total: 8,
//     //     has_more: false,
//     //   },
//     // },
//   },
// };

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawSlug = resolvedSearchParams?.["product_slug"];
  const product_slugs = rawSlug ? rawSlug.split(",").filter(Boolean) : [];

  const backup_capacity = resolvedSearchParams?.backup_capacity || null;
  const from = resolvedSearchParams?.from || null;

  const page = resolvedSearchParams?.page || "1";
  let productsData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const params = new URLSearchParams();
    product_slugs.forEach((s) => params.append("product_slug[]", s));

    if (from) params.set("from", from);
    params.set("page", page);

    const res = await fetch(`${baseUrl}/api/products?${params}`);

    if (res.ok) {
      const response = await res.json();
      productsData = response.data;
    }
  } catch (error) {
    console.error("Error fetching products data:", error);
  }

  if (!productsData) {
    notFound();
  }

  const { heroSection, productSection } = productsData;

  const { categorySlug, categoryTitle, productTitle } = productSection;

  const grandParentPage = { label: "Product Category", link: "category" };

  const parentPage = categorySlug && categoryTitle
    ? { label: categoryTitle, link: `category/${categorySlug}` }
    : null;




  const breadcrumbSlug = productTitle ?? (categoryTitle ?? "Product Category");

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo
        grandParentPage={parentPage ? grandParentPage : null}
        page={parentPage}
        slug={breadcrumbSlug}
      />
      {productsData && <ProductListing data={productSection} />}
    </>
  );
}
