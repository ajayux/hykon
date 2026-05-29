import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import { parseOtherMeta } from "@/lib/helper";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import FactoryDetailSection from "@/components/blocks/factory/factory-detail-section";
import FactoryProcess from "@/components/blocks/factory/factory-process";
import FactoryGallery from "@/components/blocks/factory/factory-gallery";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/factory/${slug}`);
    if (!res.ok) return { title: "Factory Not Found" };

    const response = await res.json();
    const data = response.data;
    if (!data) return { title: "Factory Not Found" };

    const { meta_title, meta_description, meta_keywords, other_meta_tags } = data.metaTag || {};
    const { other } = parseOtherMeta(other_meta_tags || "");
    const ogImage = data.factorySection?.media?.path || "";

    return {
      title: meta_title || data.factorySection?.title || "Factory",
      description: meta_description || "",
      keywords: meta_keywords || "",
      openGraph: {
        title: meta_title || data.factorySection?.title || "Factory",
        description: meta_description || "",
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: data.factorySection?.media?.alt || "" }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: meta_title || data.factorySection?.title || "Factory",
        description: meta_description || "",
        images: ogImage ? [ogImage] : [],
      },
      other: { ...other },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/factory/${slug}`,
      },
    };
  } catch {
    return { title: "Factory Not Found" };
  }
}

export default async function FactoryDetailPage({ params }) {
  const { slug } = await params;
  let factoryDetailData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/factory/${slug}`);

    if (res.ok) {
      const response = await res.json();
      factoryDetailData = response.data;
    }
  } catch (error) {
    console.error("Error fetching factory detail data:", error);
  }

  if (!factoryDetailData) {
    notFound();
  }

  const { heroSection, factorySection, productProcessSection, gallerySection } =
    factoryDetailData;

  return (
    <>
      {heroSection && <InnerHero data={heroSection} />}
      <BreadcrumbInfo page={{ link: "factory", label: "Factory" }} slug={factorySection?.title} />
      {factorySection && <FactoryDetailSection data={factorySection} />}
      {productProcessSection && <FactoryProcess data={productProcessSection} />}
      {gallerySection && <FactoryGallery data={gallerySection} />}
    </>
  );
}
