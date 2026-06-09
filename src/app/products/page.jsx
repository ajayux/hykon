import { notFound, redirect } from "next/navigation";
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


export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawSlug = resolvedSearchParams?.["product_slug"];
  const product_slugs = rawSlug ? rawSlug.split(",").filter(Boolean) : [];

  const backup_capacity = resolvedSearchParams?.backup_capacity || null;
  const approx_runtime = resolvedSearchParams?.approx_runtime || null;
  const backup_hours = resolvedSearchParams?.VAh || null;
  const from = resolvedSearchParams?.from || null;

  const page = resolvedSearchParams?.page || "1";
  // if no params present then navigate to category page
  if (!product_slugs.length && !backup_capacity && !from) {
    redirect("/category");
  }

  let productsData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const params = new URLSearchParams();
    product_slugs.forEach((s) => params.append("product_slug[]", s));

    if (from) params.set("from", from);
    if (backup_capacity) params.set("backup_capacity", backup_capacity);
    if (approx_runtime) params.set("approx_runtime", approx_runtime);
    if (backup_hours) params.set("backup_hours", backup_hours);


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
      {productsData && <ProductListing data={productSection} from={from} />}
    </>
  );
}
