import { notFound } from "next/navigation";

import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";

export const metadata = {
  title: "Factory | HYKON",
  description:
    "Learn more about Hykon India, our mission, vision, and our journey in sustainable energy.",
};

const localData = {
  heroSection: {
    title: "Factory",
    media: {
      type: "image",
      mobilePath: "/images/factory-hero-1.jpg",
      desktopPath: "/images/factory-hero-1.jpg",
      alt: "Factory",
    },
  },
};

export default async function FactoryPage() {
  let aboutData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/factory`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      aboutData = response.data;
    }
  } catch (error) {
    console.error("Error fetching about data:", error);
  }

  if (!aboutData) {
    notFound();
  }

  const {
    aboutSection,
    missionSection,
    chairmanSection,
    milestoneSection,
    whyHykonSection,
    manufacturingSection,
    awardSection,
    certificationSection,
    aboutFooter,
  } = aboutData;

  const { heroSection } = localData;

  return (
    <>
      {heroSection && <InnerHero data={heroSection} />}
      <BreadcrumbInfo slug={"factory"} />
    </>
  );
}

// {
//     "success": true,
//     "message": "Factory data fetched successfully",
//     "data": {
//         "heroSection": {
//             "media": {
//                 "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/254/banner.webp",
//                 "alt": "Factory"
//             },
//             "title": "Factory"
//         },
//         "innovationSection": {
//             "title": "Where Innovation Meets Precision",
//             "description": "<p>Hykon Electronics&amp;rsquo; manufacturing facilities are the backbone of our commitment to reliable, high-performance power solutions. Equipped with advanced machinery, automated processes, and stringent quality systems, our factory is designed to deliver consistency, efficiency, and scale. From raw material inspection to final product dispatch, every stage is engineered to meet international standards and evolving energy demands</p>",
//             "items": []
//         },
//         "factorySection": {
//             "title": "Manufacturing<br/> Excellence in India",
//             "items": [
//                 {
//                     "id": "01",
//                     "title": "Trissur Power And Electronic Units",
//                     "slug": "trissur-power-and-electronic-units",
//                     "media": {
//                         "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/42/conversions/home-calculate-bg_optimized_300_1_optimized_300-converted.webp",
//                         "alt": "Trissur Power And Electronic Units"
//                     },
//                     "button": {
//                         "label": "View Details",
//                         "link": "https://beta.hykon.dev14.intersmarthosting.in/api/factory/trissur-power-and-electronic-units"
//                     }
//                 }
//             ]
//         },
//         "qualitySection": {
//             "title": "Quality Control & <br> Testing Labs",
//             "description": "<p>Hykon Electronics&rsquo; manufacturing facilities are the backbone of our commitment to reliable, high-performance power solutions. Equipped with advanced machinery, automated processes, and stringent quality systems, our factory is designed to deliver consistency, efficiency, and scale. From raw material inspection to final product dispatch, every stage is engineered to meet international standards and evolving energy demands</p>",
//             "media": {
//                 "type": "image",
//                 "alt": "Quality Control & <br> Testing Labs",
//                 "image": "https://beta.hykon.dev14.intersmarthosting.in/storage/48/blog-1_300-converted.webp"
//             }
//         },
//         "metaTag": {
//             "id": 7,
//             "meta_title": "Factory",
//             "meta_description": null,
//             "meta_keywords": null,
//             "other_meta_tags": null
//         }
//     }
// }
