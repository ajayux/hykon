import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import NewsListing from "@/components/blocks/news/news-listing";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../not-found";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } =
    await getMetaData("service");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

export default async function NewsPage() {
  let serviceData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/service`);

    if (res.ok) {
      const response = await res.json();
      serviceData = response.data;
    }
  } catch (error) {
    console.error("Error fetching factory detail data:", error);
  }
  if (!serviceData) {
    NotFound();
  }

  const { heroSection, newsSection } = serviceData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug={"Service"} />
      <NewsListing data={newsSection} variant={"service"} />
    </>
  );
}
