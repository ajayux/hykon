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

import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("about");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

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


