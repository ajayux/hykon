import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import NewsList from "@/components/blocks/news/news-list";

export const metadata = {
  title: "News | HYKON",
  description:
    "Stay updated with the latest news, events, and announcements from Hykon.",
};

async function getNewsData(category = "upcoming", page = 1) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/news?category=${category}&page=${page}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (res.ok) {
      const response = await res.json();
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching news data:", error);
  }
  return null;
}

export default async function NewsPage({ searchParams }) {
  const category = searchParams?.category || "upcoming";
  const page = searchParams?.page || 1;

  const newsData = await getNewsData(category, page);

  if (!newsData) {
    // We can show a fallback or notFound
    // For now, let's try to handle it gracefully in the components
  }

  const heroSection = {
    title: "News",
    media: {
      type: "image",
      mobilePath: "/images/news-hero.jpg",
      desktopPath: "/images/news-hero.jpg",
      alt: "Hykon News",
    },
  };

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug={"news"} />
      <section className="news-section py-20 bg-[#111111]">
        <div className="container mx-auto px-4">
          <NewsList initialData={newsData} activeCategory={category} />
        </div>
      </section>
    </>
  );
}
