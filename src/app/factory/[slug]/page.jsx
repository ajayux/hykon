import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import FactoryDetailSection from "@/components/blocks/factory/factory-detail-section";
import FactoryProcess from "@/components/blocks/factory/factory-process";
import FactoryGallery from "@/components/blocks/factory/factory-gallery";

const localData = {
  heroSection: {
    title: "Trissur Power And Electronic Units",
    media: {
      type: "image",
      path: "/images/placeholder.jpg",
      alt: "Trissur Power And Electronic Units",
    },
  },
  factorySection: {
    media: {
      path: "https://beta.hykon.dev14.intersmarthosting.in/storage/43/conversions/home-calculate-bg_optimized_300_1_optimized_300-converted.webp",
      alt: "Trissur Power And Electronic Units",
    },
    title: "Trissur Power And Electronic Units",
    description:
      "<p>The Thrissur Power Electronics Unit is a key manufacturing hub of Hykon Electronics, dedicated to the design, assembly, and testing of advanced power electronics solutions. This facility plays a vital role in ensuring the performance, efficiency, and reliability that define Hykon's power products. Equipped with modern assembly lines, calibrated testing equipment, and skilled technical teams, the Thrissur unit focuses on delivering robust inverters and power management systems that meet demanding operational conditions. Every product manufactured at this unit undergoes systematic quality checks and functional testing, reinforcing Hykon's commitment to safety, durability, and consistent power output. The facility operates with strict process controls and industry-compliant practices, supporting both large-scale production and customized power solutions</p>",
    technology_used:
      "<h2>Technology Used</h2><p>Hykon’s manufacturing facilities leverage advanced automation to ensure precision, consistency, and efficient production. Automated assembly systems and process-controlled machinery minimize manual errors while maintaining high output quality across product lines.</p><p>Comprehensive safety standards are embedded throughout the factory floor. Structured workflows, protective systems, and regular compliance checks create a secure working environment for both personnel and equipment.</p><p>Specialised manufacturing and testing equipment are used for component assembly, calibration, and performance validation. This enables accurate production, dependable functionality, and adherence to stringent quality benchmarks at every stage.</p><ul><li>Hykon’s manufacturing facilities leverage advanced automation to ensure precision</li><li>Comprehensive safety standards are embedded throughout the factory floor.</li><li>Specialised manufacturing and testing equipment are used for component assembly</li><li>Hykon’s manufacturing facilities leverage advanced automation to ensure precision</li><li>Comprehensive safety standards are embedded throughout the factory floor.</li><li>Specialised manufacturing and testing equipment are used for component assembly</li></ul>",
  },
  productProcessSection: {
    title: "Production Process",
    items: [
      {
        id: 1,
        step: "Step 01",
        title: "Material Inspection",
        media: {
          pathWhite: "/images/factorydetail-proProcess-white-1.svg",
          path: "/images/factorydetail-proProcess-1.svg",
          alt: "Material Inspection",
        },
      },
      {
        id: 2,
        step: "Step 02",
        title: "Precision Assembly",
        media: {
          pathWhite: "/images/factorydetail-proProcess-white-2.svg",
          path: "/images/factorydetail-proProcess-2.svg",
          alt: "Precision Assembly",
        },
      },
      {
        id: 3,
        step: "Step 03",
        title: "System Integration & Configuration",
        media: {
          pathWhite: "/images/factorydetail-proProcess-white-3.svg",
          path: "/images/factorydetail-proProcess-3.svg",
          alt: "System Integration & Configuration",
        },
      },
      {
        id: 4,
        step: "Step 04",
        title: "Outreach",
        media: {
          pathWhite: "/images/factorydetail-proProcess-white-4.svg",
          path: "/images/factorydetail-proProcess-4.svg",
          alt: "Outreach",
        },
      },
    ],
  },
  gallerySection: {
    title: "Gallery",
    items: [
      {
        id: 46,
        media: {
          type: "image",
          path: "/images/placeholder.jpg",
          alt: "factory-gallery",
        },
      },
      {
        id: 47,
        media: {
          type: "image",
          path: "/images/placeholder.jpg",
          alt: "factory-gallery",
        },
      },
    ],
  },
  metaTag: {
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug} | HYKON`,
    description: { slug },
  };
}

export default async function FactoryDetailPage({ params }) {
  const { slug } = await params;
  let factoryDetailData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/factory/${slug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      factoryDetailData = response.data;
    }
  } catch (error) {
    console.error("Error fetching factory detail data:", error);
  }

  if (!factoryDetailData) {
    notFound();
  }

  //   const factoryDetailData = localData;

  const { heroSection, factorySection, productProcessSection, gallerySection } =
    factoryDetailData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug={`factory/${slug}`} />
      {factorySection && <FactoryDetailSection data={factorySection} />}
      {productProcessSection && <FactoryProcess data={productProcessSection} />}
      {gallerySection && <FactoryGallery data={gallerySection} />}
    </>
  );
}
