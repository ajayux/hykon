import { notFound } from "next/navigation";

import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import FactoryInfo from "@/components/blocks/factory/factory-info";
import FactoryListing from "@/components/blocks/factory/factory-listing";
import FactoryQualityControl from "@/components/blocks/factory/factory-qaulity-control";

import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("factory");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

export default async function FactoryPage() {
  let factoryData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/factory`);

    if (res.ok) {
      const response = await res.json();
      factoryData = response.data;
    }
  } catch (error) {
    console.error("Error fetching factory data:", error);
  }

  if (!factoryData) {
    notFound();
  }

  const { heroSection, innovationSection, factorySection, qualitySection } =
    factoryData;

  return (
    <>
      {heroSection && <InnerHero data={heroSection} />}
      <BreadcrumbInfo slug={"factory"} />
      {innovationSection && <FactoryInfo data={innovationSection} />}
      {factorySection && <FactoryListing data={factorySection} />}
      {qualitySection && <FactoryQualityControl data={qualitySection} />}
    </>
  );
}
