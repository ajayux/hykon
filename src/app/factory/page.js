import React from 'react'

export default function FactoryPage() {
  return (
    <div>FactoryPage</div>
  )
}


import { notFound } from "next/navigation";

import InnerHero from "@/components/common/inner-hero";
import AboutStory from "@/components/blocks/about/about-story";

import AboutMission from "@/components/blocks/about/about-mission";
import AboutLeadership from "@/components/blocks/about/about-leadership";
import AboutMilestones from "@/components/blocks/about/about-milestones";
import AboutWhyHykon from "@/components/blocks/about/about-why-hykon";
import AboutManufacturing from "@/components/blocks/about/about-manufacturing";
import AboutAwards from "@/components/blocks/about/about-awards";
import AboutPresence from "@/components/blocks/about/about-presence";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";

export const metadata = {
  title: "About Us | HYKON",
  description:
    "Learn more about Hykon India, our mission, vision, and our journey in sustainable energy.",
};

const localData = {
  heroSection: {
    title: "About Us",
    media: {
      type: "image",
      mobilePath: "/images/about-hero-1.jpg",
      desktopPath: "/images/about-hero-1.jpg",
      alt: "Modern Smart Building",
    },
  },
};

export default async function AboutPage() {
  let aboutData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/about`, {
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
      <BreadcrumbInfo slug={"about"} />
      {aboutSection && <AboutStory data={aboutSection} />}
      {missionSection && <AboutMission data={missionSection} />}
      {chairmanSection && <AboutLeadership data={chairmanSection} />}
      {milestoneSection && <AboutMilestones data={milestoneSection} />}
      {whyHykonSection && <AboutWhyHykon data={whyHykonSection} />}
      {manufacturingSection && (
        <AboutManufacturing data={manufacturingSection} />
      )}
      {(awardSection || certificationSection) && (
        <AboutAwards
          awardData={awardSection}
          certificationData={certificationSection}
        />
      )}
      {aboutFooter && <AboutPresence data={aboutFooter} />}
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