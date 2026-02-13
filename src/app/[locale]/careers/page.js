import { notFound } from "next/navigation";
import Link from "next/link";
import InnerHero from "@/components/common/inner-hero";
import CareerHero from "@/components/blocks/career/career-hero";
import CareerJoin from "@/components/blocks/career/career-join";
const local_data = {
  career_hero: {
    media: {
      media_type: "image",
      mobile_path: "/images/service-bnr.jpg",
      desktop_path: "/images/service-bnr.jpg",
      media_alt: "service-hero-1",
    },
    title_ar: "الخدمات",
    title: "Career",
  },
  
}

export default async function CareerPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

   let careerData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/projects?locale=${locale}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const response = await res.json();
      careerData = response.data;
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  if (!careerData) {
    notFound();
  }

  const { hero, projects } = careerData;

   return (
      <>
        <InnerHero
          locale={locale}
          data={local_data?.career_hero}
          slug={"Career"}
        />

        <CareerHero locale={locale} data={local_data?.career_info} />
        <CareerJoin locale={locale} data={local_data?.career_join} />
  
        {/* <ProjectsMonth locale={locale} data={local_data?.project_month} />
  
        <ProjectsSuccessStories locale={locale} data={local_data?.success_stories} />
  
        <ProjectsMore locale={locale} data={local_data?.recent_projects} />
  
        <ProjectsImage locale={locale} data={local_data?.project_image} /> */}
      </>
    );
}

