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
