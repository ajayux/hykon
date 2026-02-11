import AboutInfo from "@/components/blocks/about/about-info";
import AboutSpec from "@/components/blocks/about/about-spec";
import AboutStatistics from "@/components/blocks/about/about-statistics";
import InnerHero from "@/components/common/inner-hero";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const local_data = {
  hero: {
    media: {
      media_type: "image",
      mobile_path: "/images/about-banner.jpg",
      desktop_path: "/images/about-banner.jpg",
      media_alt: "about-hero-1",
    },
    title_ar: "عننا",
    title: "About Us",
  },

  about_info: {
    media_type: "image",
    media_alt: "WASSO Graphic",
    media_alt_ar: "مشروع سكايلاين هايتس",
    media_path: "/images/home-about-1.jpg",
    sub_title: "ABOUT WASSO",
    sub_title_ar: "عن واسو",
    title: "Discover the WASSO Difference",
    title_ar: "اكتشف الفرق في واسو",
    description:
      "<p>Wasso is a leading project management company committed to delivering excellence in construction and engineering solutions.</p>",
    description_ar:
      "<p>وasso هي شركة إدارة المشاريع المتميزة، ملتزمة بتقديم القيمة في حلول البناء والهندسة.</p>",
    mission: {
      title: "Our Mission",
      title_ar: "مهمتنا",
      icon_path: "/images/mission-icon.svg",
      description:
        "<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>",
      description_ar:
        "<p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.</p>",
    },
    vision: {
      title: "Our Vision",
      title_ar: "رؤيتنا",
      icon_path: "/images/vision-icon.svg",
      description:
        "<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>",
      description_ar:
        "<p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.</p>",
    },
  },

  about_spec: {
    media: {
      media_type: "image",
      media_path: "/images/about-spec-1.jpg",
      media_alt: "about-spec-1",
    },
    items: [
      {
        id: 1,
        title: "Integrity",
        title_ar: "الكفاءة",
        icon_path: "/images/spec-icon-1.svg",
        description:
          "<p>We uphold the highest standards of honesty, ethics, and transparency in every project we undertake.</p>",
        description_ar:
          "<p>نحن نحافظ على أعلى معايير الصدق والأخلاق والشفافية في كل مشروع نقوم به.</p>",
      },
      {
        id: 2,
        title: "Excellence",
        title_ar: "الكفاءة",
        icon_path: "/images/spec-icon-2.svg",
        description:
          "<p>We strive for precision, quality, and continuous improvement in all aspects of our work.</p>",
        description_ar:
          "<p>نحن نسعى لتحقيق الدقة والكفاءة والتحسين المستمر في جميع جوانب عملنا.</p>",
      },
      {
        id: 3,
        title: "Collaboration",
        title_ar: "التعاون",
        icon_path: "/images/spec-icon-3.svg",
        description:
          "<p>We believe in the power of teamwork, strong partnerships, and clear communication to achieve shared success.</p>",
        description_ar:
          "<p>نحن نؤمن بالقوة من التعاون، العلاقات القوية، والاتصال واضح لتحقيق النجاح المشترك.</p>",
      },
      {
        id: 4,
        title: "Innovation",
        title_ar: "الابتكار",
        icon_path: "/images/spec-icon-4.svg",
        description:
          "<p>We embrace modern technology, creative thinking, and smarter solutions to drive efficiency and sustainability.</p>",
        description_ar:
          "<p>نحن نؤمن بالقوة من التعاون، العلاقات القوية، والاتصال واضح لتحقيق النجاح المشترك.</p>",
      },
    ],
  },

  about_statistics: {
    title: "Our Achievements",
    title_ar: "إنجازاتنا",
    items: [
      {
        number: "25",
        suffix: "+",
        label: "Years of Experience",
        label_ar: "سنة من الخبرة",
        description: "Trusted project management solutions across the UAE.",
        description_ar:
          "حلول إدارة مشاريع موثوقة في جميع أنحاء الإمارات العربية المتحدة.",
      },
      {
        number: "50",
        suffix: "+",
        label: "Projects Delivered",
        label_ar: "مشروع تم تسليمه",
        description:
          "Completed residential, commercial, and infrastructure projects.",
        description_ar: "مشاريع سكنية وتجارية وبنية تحتية مكتملة.",
      },
      {
        number: "2",
        suffix: "B+",
        label: "Project Value Managed",
        label_ar: "قيمة المشاريع المدارة",
        description: "Managing diverse projects with precision and efficiency.",
        description_ar: "إدارة مشاريع متنوعة بدقة وكفاءة.",
      },
      {
        number: "300",
        suffix: "+",
        label: "Expert Professionals",
        label_ar: "محترف خبير",
        description: "Skilled team delivering quality, on-time execution.",
        description_ar: "فريق ماهر يقدم تنفيذًا عالي الجودة وفي الوقت المحدد.",
      },
      {
        number: "95",
        suffix: "%",
        label: "Client Satisfaction",
        label_ar: "رضا العملاء",
        description: "Proven record of exceeding project expectations.",
        description_ar: "سجل مثبت في تجاوز توقعات المشروع.",
      },
    ],
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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "عن واسو" : "About WASSO",
    description:
      locale === "ar"
        ? "تعرف على واسو لإدارة المشاريع - شركة رائدة في إدارة المشاريع والهندسة وتطوير العقارات"
        : "Learn about WASSO Project Management - Leading company in project management, engineering, and real estate development",
  };
}

export default async function AboutPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let aboutData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/about?locale=${locale}`, {
      cache: "no-store",
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

  const { hero, mission, vision, values, story, team, achievements } =
    aboutData;

  return (
    <>
      {hero && (
        <InnerHero
          locale={locale}
          data={local_data?.hero}
          slug={"Our Projects"}
        />
      )}

      <AboutInfo locale={locale} data={local_data?.about_info} />

      <AboutSpec locale={locale} data={local_data?.about_spec} />

      <AboutStatistics locale={locale} data={local_data?.about_statistics} />

      <div className="min-h-screen">
        {/* Mission & Vision */}
        {(mission || vision) && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="grid gap-8 md:grid-cols-2">
                {mission && (
                  <div>
                    <h2 className="mb-4 text-3xl font-bold">
                      {locale === "ar" ? mission.title_ar : mission.title}
                    </h2>
                    <p className="text-gray-600">
                      {locale === "ar"
                        ? mission.description_ar
                        : mission.description}
                    </p>
                  </div>
                )}
                {vision && (
                  <div>
                    <h2 className="mb-4 text-3xl font-bold">
                      {locale === "ar" ? vision.title_ar : vision.title}
                    </h2>
                    <p className="text-gray-600">
                      {locale === "ar"
                        ? vision.description_ar
                        : vision.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Values */}
        {values && values.length > 0 && (
          <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
                {locale === "ar" ? "قيمنا" : "Our Values"}
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {values.map((value, index) => (
                  <div key={index} className="text-center">
                    <h3 className="mb-2 text-xl font-semibold">
                      {locale === "ar" ? value.title_ar : value.title}
                    </h3>
                    <p className="text-gray-600">
                      {locale === "ar"
                        ? value.description_ar
                        : value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Story */}
        {story && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-3xl font-bold md:text-4xl">
                {locale === "ar" ? story.title_ar : story.title}
              </h2>
              <div
                className="prose max-w-none text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: locale === "ar" ? story.content_ar : story.content,
                }}
              />
              {story.timeline && story.timeline.length > 0 && (
                <div className="mt-12">
                  <h3 className="mb-8 text-2xl font-bold">
                    {locale === "ar" ? "الجدول الزمني" : "Timeline"}
                  </h3>
                  <div className="space-y-8">
                    {story.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white">
                            {item.year}
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 text-xl font-semibold">
                            {locale === "ar" ? item.title_ar : item.title}
                          </h4>
                          <p className="text-gray-600">
                            {locale === "ar"
                              ? item.description_ar
                              : item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Team Stats */}
        {team && (
          <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
                {locale === "ar" ? team.title_ar : team.title}
              </h2>
              <p className="mb-12 text-center text-gray-600">
                {locale === "ar" ? team.description_ar : team.description}
              </p>
              {team.stats && team.stats.length > 0 && (
                <div className="grid gap-8 md:grid-cols-3">
                  {team.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
                        {stat.number}
                      </div>
                      <p className="text-lg text-gray-600">
                        {locale === "ar" ? stat.label_ar : stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
                {locale === "ar" ? "إنجازاتنا" : "Our Achievements"}
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <h3 className="mb-2 text-xl font-semibold">
                      {locale === "ar"
                        ? achievement.title_ar
                        : achievement.title}
                    </h3>
                    <p className="text-gray-600">
                      {locale === "ar"
                        ? achievement.description_ar
                        : achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
