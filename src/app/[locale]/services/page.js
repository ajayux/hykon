import { notFound } from "next/navigation";
import Link from "next/link";

import InnerHero from "@/components/common/inner-hero";
import ServiceList from "@/components/blocks/service/service-list";

// Local data removed

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "الخدمات" : "Services",
    description:
      locale === "ar"
        ? "استعرض خدماتنا في إدارة المشاريع والإشراف الهندسي وإدارة العقود وضمان الجودة"
        : "Browse our services in project management, engineering supervision, contracts management, and quality assurance",
  };
}

export default async function ServicesPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams.locale;
  const category = resolvedSearchParams?.category || null;
  const page = resolvedSearchParams?.page || "1";

  let servicesData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const queryParams = new URLSearchParams({
      locale,
      page,
      limit: "12",
    });
    if (category) queryParams.append("category", category);

    const res = await fetch(
      `${baseUrl}/api/services?${queryParams.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (res.ok) {
      const response = await res.json();
      servicesData = response.data;
    }
  } catch (error) {
    console.error("Error fetching services data:", error);
  }

  if (!servicesData) {
    notFound();
  }

  const { heroInfo, serviceList } = servicesData;

  return (
    <>
      <InnerHero locale={locale} data={heroInfo} slug={"Services"} />

      <ServiceList data={serviceList} locale={locale} />
    </>
  );
}
