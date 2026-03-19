import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import HykonnectAbout from "@/components/blocks/hykonnect/hykonnect-about";
import HykonnectBenefits from "@/components/blocks/hykonnect/hykonnect-benefits";
import HykonnectHow from "@/components/blocks/hykonnect/hykonnect-how";
import { notFound } from "next/navigation";

const localData = {
  heroSection: {
    title: "Your Digital Connection<br/> to Hykon",
    media: {
      type: "image",
      mobilePath: "/images/hykonnect-hero-1.jpg",
      desktopPath: "/images/hykonnect-hero-1.jpg",
    },
  },
  aboutSection: {
    title: "Your Digital Connection to Hykon",
    description:
      "<p>Are you a plumber, electrician, or dealer who trusts and recommends Hykon products? Now, your valuable recommendations can earn you exciting rewards with Hykonnect, Hykon's exclusive referral and loyalty program!</p><p>We value your partnership and understand the power of your word-of-mouth. Hykonnect is designed to appreciate your efforts by rewarding you every time you recommend Hykon Halo Inverter to your customers. It's simple, rewarding, and designed with you in mind.</p>",
  },
  whyHyconnectSection: {
    title: "Why Join HyConnect",
    items: [
      {
        id: 1,
        title: "Earn Cash Rewards",
        description:
          "Get rewarded for every Hykon Halo Inverter you recommend.",
      },
      {
        id: 2,
        title: "Easy to Use",
        description:
          "The Hykonnect app makes earning and redeeming rewards simple and hassle-free.",
      },
      {
        id: 3,
        title: "Instant Credits",
        description:
          "See your rewards accumulate instantly in your digital wallet.",
      },
      {
        id: 4,
        title: "Direct Cash Redemption",
        description:
          "Convert your earnings into real cash whenever you need it.",
      },
      {
        id: 5,
        title: "Stay Connected with Hykon",
        description: "Get updates on new products, promotions, and more.",
      },
      {
        id: 6,
        title: "Strengthen Your Business",
        description:
          "Enhance your value to your customers by recommending quality Hykon products and earning rewards in the process.",
      },
    ],
  },
  howItWorksSection: {
    media: {
      type: "image",
      alt: "How It Works",
      path: "/images/hykonnect-howItWorksSection-1.jpg",
    },
  },
  metaTag: {
    id: 8,
    meta_title: "HyConnect",
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("Hyconnect");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

export default async function HykonnectPage() {
  let hykonnectData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/hykonnect`);

    if (res.ok) {
      const response = await res.json();
      hykonnectData = response.data;
    }
  } catch (error) {
    console.error("Error fetching factory detail data:", error);
  }

  if (!hykonnectData) {
    notFound();
  }

  const { heroSection, aboutSection, whyHyconnectSection, howItWorksSection } =
    hykonnectData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="hykonnect" />
      <HykonnectAbout data={aboutSection} />
      <HykonnectBenefits data={whyHyconnectSection} />
      <HykonnectHow data={howItWorksSection} />
    </>
  );
}
