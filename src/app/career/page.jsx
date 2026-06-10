import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import CareerLife from "@/components/blocks/career/career-life";
import CareerPositions from "@/components/blocks/career/career-positions";
import { notFound } from "next/navigation";

import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("career");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

export default async function CareersPage() {
  let careerData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/careers`);

    if (res.ok) {
      const response = await res.json();
      careerData = response.data;
    }
  } catch (error) {
    console.error("Error fetching career data:", error);
  }
  if (!careerData) {
    notFound();
  }

  const { heroSection, careerInfoSection, careerSection } = careerData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="careers" />
      <CareerLife data={careerInfoSection} />
      <CareerPositions data={careerSection} />
    </>
  );
}
