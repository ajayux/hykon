import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import CategoriesDetail from "@/components/blocks/categories/categories-detail";
import { parseOtherMeta } from "@/lib/helper";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/${slug}`);

    if (!res.ok) return { title: "Category Not Found" };
    
    const response = await res.json();
    const data = response.data;
    if (!data) return { title: "Category Not Found" };
    
    const { meta_title, meta_description, meta_keywords, other_meta_tags } = data.metaTags || {};
    const { other } = parseOtherMeta(other_meta_tags || "");
    const ogImage = data.category?.media?.path || "";

    return {
      title: meta_title || "Category",
      description: meta_description || "",
      keywords: meta_keywords || "",
      openGraph: {
        title: meta_title || "Category",
        description: meta_description || "",
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: data.category?.media?.alt || "" }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: meta_title || data.category?.title || "Category",
        description: meta_description || "",
        images: ogImage ? [ogImage] : [],
      },
      other: { ...other },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/category/${slug}`,
      },
    };
  } catch {
    return { title: "Category Not Founds" };
  }
}

export default async function categoriesDetailPage({params}) {
  
  const { slug } = await params;
  
  let productsData = null;
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/api/${slug}`);

      if (res.ok) {
        const response = await res.json();
        productsData = response.data;
      }
    } catch (error) {
      console.error("Error fetching categories data:", error);
    }

    if (!productsData) {
      notFound();
    }


  const page = {
    label: "Product Category",
    link: "category",
  }

  const { heroSection, categoryDetailSection } = productsData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo page={page} slug={`${heroSection?.title}`} />
      {categoryDetailSection && (
        <CategoriesDetail data={categoryDetailSection} categorySlug={slug} categoryName={heroSection?.title} />
      )}
    </>
  );
}
