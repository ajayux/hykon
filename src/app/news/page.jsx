import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import NewsListing from "@/components/blocks/news/news-listing";

export const metadata = {
  title: "News | HYKON",
  description:
    "Stay updated with the latest news, events, and announcements from Hykon.",
};

const heroSection = {
  title: "News",
  media: {
    type: "image",
    mobilePath: "/images/news-hero-1.jpg",
    desktopPath: "/images/news-hero-1.jpg",
    alt: "Hykon News",
  },
};

async function getNewsData(category = "upcoming", page = 1) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
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
  const params = await searchParams;
  const category = params?.category || "upcoming";
  const page = params?.page || 1;

  const newsData = await getNewsData(category, page);

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug={"news"} />
      <NewsListing data={newsData} activeCategory={category} />
    </>
  );
}

// {
//     "success": true,
//     "message": "News retrieved successfully.",
//     "data": {
//         "title": "News",
//         "description": "News listing page",
//         "filters": [
//             {
//                 "id": 1,
//                 "title": "Upcoming",
//                 "slug": "upcoming"
//             },
//             {
//                 "id": 2,
//                 "title": "Featured",
//                 "slug": "featured"
//             },
//             {
//                 "id": 3,
//                 "title": "Archive",
//                 "slug": "archive"
//             }
//         ],
//         "items": [
//             {
//                 "id": 1,
//                 "title": "Electric Auto Unit Inauguration",
//                 "slug": "electric-auto-unit-inauguration",
//                 "publishDay": "25",
//                 "publishMonthYear": "February 2026",
//                 "media": {
//                     "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/58/news-3-converted.webp",
//                     "alt": "Electric Auto Unit Inauguration"
//                 },
//                 "button": {
//                     "text": "Read More",
//                     "link": "https://beta.hykon.dev14.intersmarthosting.in/api/news/electric-auto-unit-inauguration"
//                 }
//             }
//         ],
//         "pagination": {
//             "current_page": 1,
//             "last_page": 1,
//             "per_page": 12,
//             "total": 1,
//             "has_more": false
//         }
//     },
//     "code": 200
// }
