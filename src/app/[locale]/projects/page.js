import { notFound } from "next/navigation";
import ProjectsMonth from "@/components/blocks/projects/projects-month";
import InnerHero from "@/components/common/inner-hero";
import ProjectsMore from "@/components/blocks/projects/projects-more";
import ProjectsSuccessStories from "@/components/blocks/projects/projects-success-stories";
import ProjectsImage from "@/components/blocks/projects/projects-image";

const local_data = {
  projects_hero: {
    media: {
      media_type: "image",
      mobile_path: "/images/project-banner.jpg",
      desktop_path: "/images/project-banner.jpg",
      media_alt: "service-hero-1",
    },
    title_ar: "الخدمات",
    title: "Our Projects",
  },

  project_month: {
    media: {
      media_type: "image",
      mobile_path: "/images/pom.png",
      desktop_path: "/images/pom.png",
      media_alt: "Projects of the Month",
    },
    title: "Projects of the Month",
    title_ar: "مشاريع الشهر",
    description:
      "<p>A 45-story luxury residential tower featuring sustainable design elements, panoramic views,<br /> and world-class amenities. This landmark project redefines modern urban living with its innovative architectural approach and commitment to environmental excellence.</p>",
    description_ar:
      "<p>في مجموعة واسو، ندرك أن كل مشروع فريد من نوعه، مع مجموعة خاصة من الفرص والتحديات. وتستند خدمة إدارة المشاريع لدينا على مبدأ تحويل المشاريع المعقدة إلى نجاحات ملموسة. سواء كان مشروعًا جديدًا أو توسعة أو تجديدًا، فإننا نقدم نهجًا شاملاً يضمن تحقيق أهدافك بكفاءة وفعالية.</p>",
  },

  recent_projects: {
    title: "Recent Projects",
    title_ar: "المشاريع الحديثة",
    description:
      "<p>At Wasso Group, we recognize that every project is unique, with its own set of opportunities and challenges. Our project management service is built on the principle of transforming complex</p>",
    description_ar:
      "<p>في مجموعة واسو، ندرك أن كل مشروع فريد من نوعه، مع مجموعة خاصة من الفرص والتحديات. وتستند خدمة إدارة المشاريع لدينا على مبدأ تحويل المشاريع المعقدة إلى نجاحات ملموسة. سواء كان مشروعًا جديدًا أو توسعة أو تجديدًا، فإننا نقدم نهجًا شاملاً يضمن تحقيق أهدافك بكفاءة وفعالية.</p>",
    items: [
      {
        id: 1,
        title: "Lume Residences, Garden City",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-1",
        media: {
          path: "/images/projects-recent-1.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 2,
        title: "Victoria Residences, UAE",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-2",
        media: {
          path: "/images/projects-recent-2.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 3,
        title: "The Majestic Pointe, Al Shindagha",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-3",
        media: {
          path: "/images/projects-recent-3.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 4,
        title: "Lume Residences, Garden City",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-1",
        media: {
          path: "/images/projects-recent-1.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 5,
        title: "Victoria Residences, UAE",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-2",
        media: {
          path: "/images/projects-recent-2.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
    ],
  },

  success_stories: {
    title: "Building Success Stories",
    title_ar: "بناء قصص النجاح",
    description:
      "<p>At Wasso Group, we recognize that every project is unique, with its own set of opportunities and challenges. Our project management service is built on the principle of transforming complex</p>",
    description_ar:
      "<p>في مجموعة واسو، ندرك أن كل مشروع فريد من نوعه، مع مجموعة خاصة من الفرص والتحديات. وتستند خدمة إدارة المشاريع لدينا على مبدأ تحويل المشاريع المعقدة إلى نجاحات ملموسة. سواء كان مشروعًا جديدًا أو توسعة أو تجديدًا، فإننا نقدم نهجًا شاملاً يضمن تحقيق أهدافك بكفاءة وفعالية.</p>",
    items: [
      {
        id: 1,
        title: "Luxury Residential Tower, Dubai",
        title_ar: "برج سكني فاخر، دبي",
        slug: "/project-details-1",
        media: {
          path: "/images/st1.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 2,
        title: "Regal Haven, Al Raha Beach",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-2",
        media: {
          path: "/images/st2.png",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 3,
        title: "The Majestic Pointe, Al Shindagha",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-3",
        media: {
          path: "/images/st3.png",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 4,
        title: "Lume Residences, Garden City",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-1",
        media: {
          path: "/images/st1.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 5,
        title: "Victoria Residences, UAE",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-2",
        media: {
          path: "/images/st2.png",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
    ],
  },

  project_image: {
    media: {
      media_type: "image",
      mobile_path: "/images/st4.png",
      desktop_path: "/images/st4.png",
      media_alt: "Projects images",
    },
  },
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "المشاريع" : "Projects",
    description:
      locale === "ar"
        ? "استعرض مشاريعنا المميزة في إدارة المشاريع والهندسة وتطوير العقارات"
        : "Browse our featured projects in project management, engineering, and real estate development",
  };
}

export default async function ProjectsPage({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let projectsData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/projects?locale=${locale}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const response = await res.json();
      projectsData = response.data;
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  if (!projectsData) {
    notFound();
  }

  const { hero, projects } = projectsData;

  // const category = searchParams?.category || null;
  // const page = searchParams?.page || "1";

  // let projectsData = null;

  // try {
  //   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  //   const queryParams = new URLSearchParams({
  //     locale,
  //     page,
  //     limit: "12",
  //   });
  //   if (category) queryParams.append("category", category);

  //   const res = await fetch(
  //     `${baseUrl}/api/projects?${queryParams.toString()}`,
  //     {
  //       cache: "no-store",
  //     },
  //   );

  //   if (res.ok) {
  //     const response = await res.json();
  //     projectsData = response.data;
  //   }
  // } catch (error) {
  //   console.error("Error fetching projects data:", error);
  // }

  // if (!projectsData) {
  //   notFound();
  // }

  // const { projects, pagination } = projectsData;

  return (
    <>
      <InnerHero
        locale={locale}
        data={local_data?.projects_hero}
        slug={"Our Projects"}
      />

      <ProjectsMonth locale={locale} data={local_data?.project_month} />

      <ProjectsSuccessStories
        locale={locale}
        data={local_data?.success_stories}
      />

      <ProjectsMore locale={locale} data={local_data?.recent_projects} />

      <ProjectsImage locale={locale} data={local_data?.project_image} />
    </>
  );
}
