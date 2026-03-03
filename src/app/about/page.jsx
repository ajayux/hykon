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
    heroSection,
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
//     "message": "About data fetched successfully",
//     "data": {
//         "aboutSection": {
//             "title": "Powering a safer,Smarter<br>Tomorrow",
//             "description": "<p>Hykon delivers reliable energy solutions built on innovation, quality, and decades of expertise.</p>\r\n<p>For over three decades, Hykon has been a trusted name in power electronics and renewable energy. From inverters and solar systems to lithium batteries and EV solutions, we design products that empower homes, businesses, and industries with uninterrupted, sustainable power</p>",
//             "media": {
//                 "type": "image",
//                 "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/128/blog-1_300.jpg",
//                 "alt": "Powering a safer,Smarter<br>Tomorrow"
//             },
//             "statistics": [
//                 {
//                     "id": 1,
//                     "number": "1999",
//                     "suffix": null,
//                     "label": "Startups"
//                 },
//                 {
//                     "id": 2,
//                     "number": "450",
//                     "suffix": "+",
//                     "label": "Empolyes"
//                 },
//                 {
//                     "id": 3,
//                     "number": "5",
//                     "suffix": "+",
//                     "label": "Companies"
//                 },
//                 {
//                     "id": 4,
//                     "number": "100",
//                     "suffix": "+",
//                     "label": "Crore Turnover"
//                 }
//             ]
//         },
//         "missionSection": {
//             "mission": {
//                 "title": "Mission",
//                 "description": "To create future-ready power solutions that improve everyday life and support a sustainable world.",
//                 "media": {
//                     "type": "image",
//                     "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/132/about-mission-1.svg",
//                     "alt": "Mission"
//                 }
//             },
//             "vision": {
//                 "title": "Vision",
//                 "description": "To be India's most trusted and innovative energy technology company.",
//                 "media": {
//                     "type": "image",
//                     "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/133/about-mission-2.svg",
//                     "alt": "Vision"
//                 }
//             },
//             "values": {
//                 "title": "Values",
//                 "description": "Quality, Innovation, Customer First, Sustainability, Integrity",
//                 "media": {
//                     "type": "image",
//                     "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/134/about-mission-3.svg",
//                     "alt": "Values"
//                 }
//             }
//         },
//         "chairmanSection": {
//             "media": {
//                 "type": "image",
//                 "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/129/about-chairman.jpg",
//                 "alt": "Chairman Image"
//             },
//             "description": "<p>&ldquo;At Hykon, innovation is not a choice &mdash; it&rsquo;s our foundation. Our goal is to bring reliable, safe, and eco-friendly power solutions to every Indian household and industry.&rdquo;</p>",
//             "chairman_name": "CHISTO GEORGE",
//             "designation": "Chairman & Managing Director, Hykon India Ltd"
//         },
//         "milestoneSection": {
//             "title": "Milestones",
//             "items": [
//                 {
//                     "id": 1,
//                     "year": "1990",
//                     "title": "Founded with a focus on power backup solutions."
//                 },
//                 {
//                     "id": 2,
//                     "year": "2000",
//                     "title": "First manufacturing facility established."
//                 },
//                 {
//                     "id": 3,
//                     "year": "2010",
//                     "title": "Solar division launched."
//                 },
//                 {
//                     "id": 4,
//                     "year": "2020",
//                     "title": "Lithium battery & EV product line introduced."
//                 },
//                 {
//                     "id": 5,
//                     "year": "2025",
//                     "title": "Pan-India presence with thousands of installations."
//                 }
//             ]
//         },
//         "whyHykonSection": {
//             "title": "Why Hykon",
//             "description": "<p>Decades of excellence, innovation, and customer trust make us the preferred choice for reliable energy solutions.</p>",
//             "items": [
//                 {
//                     "id": 1,
//                     "media": {
//                         "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/40/conversions/product-cat-white-1-converted.webp",
//                         "alt": "30+ years of industry experience"
//                     },
//                     "title": "30+ years of industry experience"
//                 },
//                 {
//                     "id": 2,
//                     "media": {
//                         "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/102/conversions/why-hykon-2-1-converted.webp",
//                         "alt": "Trusted by homeowners & enterprises"
//                     },
//                     "title": "Trusted by homeowners & enterprises"
//                 },
//                 {
//                     "id": 3,
//                     "media": {
//                         "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/103/conversions/why-hykon-3-1-converted.webp",
//                         "alt": "Strong service network"
//                     },
//                     "title": "Strong service network"
//                 },
//                 {
//                     "id": 4,
//                     "media": {
//                         "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/104/conversions/why-hykon-4-1-converted.webp",
//                         "alt": "Cutting-edge R&D and testing"
//                     },
//                     "title": "Cutting-edge R&D and testing"
//                 },
//                 {
//                     "id": 5,
//                     "media": {
//                         "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/105/conversions/why-hykon-5-1-converted.webp",
//                         "alt": "Energy-efficient, long-life products"
//                     },
//                     "title": "Energy-efficient, long-life products"
//                 }
//             ]
//         },
//         "manufacturingSection": {
//             "title": "Manufacturing & R&D",
//             "description": "<p>Our advanced manufacturing units and in-house R&amp;D labs ensure every product meets stringent safety, performance, and durability standards.</p>",
//             "items": [
//                 {
//                     "id": 1,
//                     "media": {
//                         "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/113/conversions/about-manu-1-converted.webp",
//                         "alt": "Advanced Manufacturing"
//                     },
//                     "title": "Advanced Manufacturing"
//                 },
//                 {
//                     "id": 2,
//                     "media": {
//                         "path": "https://beta.hykon.dev14.intersmarthosting.in/storage/112/conversions/about-manu-2-converted.webp",
//                         "alt": "In-House R&D Labs"
//                     },
//                     "title": "In-House R&D Labs"
//                 }
//             ]
//         },
//         "awardSection": {
//             "title": "Awards & Recognitions",
//             "description": "<p>Hykon is proud to be recognised and felicitated by some of the most influential and highly esteemed organisations in India and globally. These awards are a token of honour that we have amassed through maintaining outstanding quality and being a business model that keeps on improving without fail</p>",
//             "items": [
//                 {
//                     "id": 1,
//                     "media": {
//                         "type": "image",
//                         "path": null,
//                         "alt": "Achivements"
//                     }
//                 },
//                 {
//                     "id": 2,
//                     "media": {
//                         "type": "image",
//                         "path": null,
//                         "alt": "Achivement 2"
//                     }
//                 },
//                 {
//                     "id": 3,
//                     "media": {
//                         "type": "image",
//                         "path": null,
//                         "alt": "Achivement 3"
//                     }
//                 },
//                 {
//                     "id": 4,
//                     "media": {
//                         "type": "image",
//                         "path": null,
//                         "alt": "Achivement 4"
//                     }
//                 }
//             ]
//         },
//         "certificationSection": {
//             "title": "Certifications",
//             "description": "<p>Our advanced manufacturing units and in-house R&amp;D labs<br>&nbsp;ensure every product meets stringent safety, performance,<br>&nbsp;and durability standards.</p>\r\n<ul>\r\n<li>ISO Certified Company</li>\r\n<li>Compliance with national &amp; international quality standards</li>\r\n</ul>"
//         },
//         "aboutFooter": {
//             "title": "Presence Across India",
//             "description": "<p>Wide dealer network, service centres, and installation support across major cities.</p>",
//             "media": {
//                 "type": "image",
//                 "path": null,
//                 "alt": "About Image"
//             },
//             "button_one": {
//                 "text": "",
//                 "link": ""
//             },
//             "button_two": {
//                 "text": "",
//                 "link": ""
//             }
//         }
//     }
// }
