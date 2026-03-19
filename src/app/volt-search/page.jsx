import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import { notFound } from "next/navigation";
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
  } = await getMetaData("volt-search");
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

const localData = {
  heroSection: {
    title: "Volt Search",
    media: {
      type: "image",
      mobilePath: "/images/career-hero-1.jpg",
      desktopPath: "/images/career-hero-1.jpg",
      alt: "Careers",
    },
  },
  voltSearchSection: {
    title: "Find the Perfect Power Product for Your Home or Business",
    description:
      "<p>Calculate your power requirements and get personalized recommendations for inverters, batteries, and energy storage systems.</p>",
  },
};

export default async function VoltSearchPage() {
  // let voltSearchData = null;

  // try {
  //   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  //   //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  //   const res = await fetch(`${baseUrl}/api/reports`, {
  //     next: { revalidate: 60 },
  //   });

  //   if (res.ok) {
  //     const response = await res.json();
  //     voltSearchData = response.data;
  //   }
  // } catch (error) {
  //   console.error("Error fetching investor relations data:", error);
  // }

  // if (!voltSearchData) {
  //   notFound();
  // }

  const voltSearchData = localData;

  const { heroSection, voltSearchSection } = voltSearchData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="VOLT Search" />
    </>
  );
}
