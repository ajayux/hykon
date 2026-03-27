import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import NewsListing from "@/components/blocks/news/news-listing";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../not-found";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } =
    await getMetaData("news-events");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

export default async function NewsPage() {
  let projectData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/projects`);

    if (res.ok) {
      const response = await res.json();
      projectData = response.data;
    }
  } catch (error) {
    console.error("Error fetching factory detail data:", error);
  }
  if (!projectData) {
    NotFound();
  }

  const { heroSection, newsSection } = projectData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug={"Projects"} />
      <NewsListing data={newsSection} variant={"projects"} />
    </>
  );
}
