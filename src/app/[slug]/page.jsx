import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import ProductListing from "@/components/blocks/products/product-listing";
import { getMetaData } from "@/lib/api/metaApi";

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


export default async function ProductsPage({ params }) {
  const { slug } = await params;
  const categorySlugs = slug.split(",").filter(Boolean);

  const cookieStore = await cookies();
  const storedFilters = cookieStore.get("product_filters")?.value;
  let storedCategorySlug = null;
  if (storedFilters) {
    try {
      storedCategorySlug = JSON.parse(storedFilters)?.category_slug;
    } catch {}
  }

  console.log("storedCategorySlug", storedCategorySlug)
  const filterSlugs = storedCategorySlug
    ? storedCategorySlug.split(",").filter(Boolean)
    : categorySlugs;


    console.log("filterSlugs ", filterSlugs)
  let productsData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiParams = new URLSearchParams();
    filterSlugs.forEach((s) => apiParams.append("product_slug[]", s));

    const res = await fetch(`${baseUrl}/api/products?${apiParams}`);

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
      {productsData && <ProductListing data={productSection} slug={slug} />}
    </>
  );
}
