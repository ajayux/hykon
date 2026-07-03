import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import CategoriesSection from "@/components/blocks/categories/categories-section";
import CategoriesFeaturedProducts from "@/components/blocks/categories/categories-featured-products";
import CategoriesTryNow from "@/components/blocks/categories/categories-try-now";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } =
    await getMetaData("category");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}


export default async function CategoriesPage() {
    let categoriesData = null;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/api/categories`, {
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const response = await res.json();
        categoriesData = response.data;
      }
    } catch (error) {
      console.error("Error fetching categories data:", error);
    }

    if (!categoriesData) {
      notFound();
    }


  const {
    heroSection,
    filterItems,
    categoriesSection,
    featuresSection,
    tryNowSection,
  } = categoriesData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="Product Category" />
      {categoriesSection && <CategoriesSection data={categoriesSection} filterData = {filterItems} />}
      {featuresSection && <CategoriesFeaturedProducts data={featuresSection} />}
      {tryNowSection && <CategoriesTryNow data={tryNowSection} />}
    </>
  );
}
