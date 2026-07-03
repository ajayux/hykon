import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import CustomerCareDetails from "@/components/blocks/customer-care/customer-care-details";
import CustomerCareForm from "@/components/blocks/customer-care/customer-care-form";
import { notFound } from "next/navigation";

import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("customer-care");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}


export default async function CustomerCarePage() {
  let pageData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/customer-care`);

    if (res.ok) {
      const response = await res.json();
      pageData = response.data;
    }
  } catch (error) {
    console.error("Error fetching customer care data:", error);
  }

  if (!pageData) {
    notFound();
  }

  const { heroSection, customerCare, formSections } = pageData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="customer-care" />
      <CustomerCareDetails data={customerCare} />
      <CustomerCareForm data={formSections} />
    </>
  );
}
