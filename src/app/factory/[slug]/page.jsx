import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import FactoryDetailSection from "@/components/blocks/factory/factory-detail-section";
import FactoryProcess from "@/components/blocks/factory/factory-process";
import FactoryGallery from "@/components/blocks/factory/factory-gallery";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug} | HYKON`,
    description: { slug },
  };
}

export default async function FactoryDetailPage({ params }) {
  const { slug } = await params;
  let factoryDetailData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/factory/${slug}`, {
      next: { revalidate: 60 },
    });

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
      <BreadcrumbInfo slug={`factory/${slug}`} />
      {factorySection && <FactoryDetailSection data={factorySection} />}
      {productProcessSection && <FactoryProcess data={productProcessSection} />}
      {gallerySection && <FactoryGallery data={gallerySection} />}
    </>
  );
}
