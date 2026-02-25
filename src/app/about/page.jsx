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
      <InnerHero data={heroSection} />
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
