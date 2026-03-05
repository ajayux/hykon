import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import CareerLife from "@/components/blocks/career/career-life";
import CareerPositions from "@/components/blocks/career/career-positions";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Careers | HYKON",
  description: "Join our team and build your future with Hykon.",
};

const localData = {
  heroSection: {
    title: "Careers",
    media: {
      type: "image",
      mobilePath: "/images/career-hero-1.jpg",
      desktopPath: "/images/career-hero-1.jpg",
      alt: "Careers",
    },
  },
  careerInfoSection: {
    iconPath: "/images/career-about-logo-1.png",
    title: "Life at",
    description:
      "<p>Hykon's in-house quality control and testing labs play a critical role in ensuring product excellence. Each product is subjected to yejtcomprehensive to immediately notify the rental company by phone/text message on the service hotline or in writing via email in accordance with point 12 of the terms and conditions to coordinate further steps. If the vehicle is not returned on time (time or date) for other reasons, the renter is liable for any resulting damage and any additional costs The lessor reserves th performance, safety, and endurance tests before approval.</p><p>Our multi-stage inspection process guarantees compliance with industandards, delivering products that perform reliably in real-world conditions.</p>",
    mediaOne: {
      id: 1,
      type: "image",
      path: "/images/career-about-1.jpg",
      alt: "Careers",
    },
    mediaTwo: {
      id: 2,
      type: "image",
      path: "/images/career-about-2.jpg",
      alt: "Careers",
    },
    mediaThree: {
      id: 3,
      type: "image",
      path: "/images/career-about-3.jpg",
      alt: "Careers",
    },
    statistics: {
      number: "450",
      suffix: "+",
      label: "Employees",
    },
  },
  careerSection: {
    title: "Open Positions",
    filters: {
      positions: [
        {
          id: 1,
          title: "Manager",
          slug: "manager",
        },
        {
          id: 2,
          title: "Sales",
          slug: "sales",
        },
      ],
      locations: [
        {
          id: 1,
          title: "Kochi",
          slug: "kochi",
        },
        {
          id: 2,
          title: "Calicut",
          slug: "calicut",
        },
      ],
    },
    items: [
      {
        id: 1,
        title: "Project Manager",
        description:
          "<p>7- 10 yrs experience in the field of Project Sales Must Have Experience in the field of Solar Systems &amp; Battery Systems Should Have team Management Skills Experience in Corporate Sales or Projects</p>",
        slug: "project-manager",
        jobId: "HYKBJ013",
        location: "Kochi - Ernakulam",
        qualification:
          "ITI/Diploma in electronics B tech in Electrical or Electronics",
        position: "Manager",
        postedDate: "Feb 26 2026",
        button: {
          text: "Download",
          file: "https://beta.hykon.dev14.intersmarthosting.in/storage/110/dummy-(2).pdf",
        },
      },
      {
        id: 2,
        title: "Manager - Projects",
        description:
          "<p>7- 10 yrs experience in the field of Project Sales Must Have Experience in the field of Solar Systems &amp; Battery Systems Should Have team Management Skills Experience in Corporate Sales or Projects</p>",
        slug: "manager-projects",
        jobId: "HYKBJ013",
        location: "Kochi - Ernakulam",
        qualification:
          "ITI/Diploma in electronics B tech in Electrical or Electronics",
        position: "Manager",
        postedDate: "Feb 26 2026",
        button: {
          text: "Download",
          file: "https://beta.hykon.dev14.intersmarthosting.in/storage/110/dummy-(2).pdf",
        },
      },
    ],
  },
  metaTag: {
    id: 11,
    meta_title: "Careers",
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

export default async function CareersPage() {
  // let careerData = null;

  // try {
  //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  //   const res = await fetch(`${baseUrl}/api/careers`, {
  //     next: { revalidate: 60 },
  //   });

  //   if (res.ok) {
  //     const response = await res.json();
  //     careerData = response.data;
  //   }
  // } catch (error) {
  //   console.error("Error fetching factory detail data:", error);
  // }
  // if (!careerData) {
  //   notFound();
  // }

  const careerData = localData;

  const { heroSection, careerInfoSection, careerSection } = careerData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="careers" />
      <CareerLife data={careerInfoSection} />
      <CareerPositions data={careerSection} />
    </>
  );
}
