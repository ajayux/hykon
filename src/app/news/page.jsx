import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import NewsListing from "@/components/blocks/news/news-listing";

export const metadata = {
  title: "News | HYKON",
  description:
    "Stay updated with the latest news, events, and announcements from Hykon.",
};

export default async function NewsPage() {
  let newsData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/news`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      newsData = response.data;
    }
  } catch (error) {
    console.error("Error fetching factory detail data:", error);
  }
  if (!newsData) {
    notFound();
  }

  const { heroSection, newsSection } = newsData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug={"news"} />
      <NewsListing data={newsSection} />
    </>
  );
}
