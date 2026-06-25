import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import InvestorReports from "@/components/blocks/investor/investor-reports";
import { notFound } from "next/navigation";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  } = await getMetaData("investor relations");
  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  };
}

export default async function InvestorRelationsPage() {
  let investorData = null;

   try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/reports`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      investorData = response.data;
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
  }


  const { heroSection, reportSection, reportsSection } = investorData || {};

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="investor Relations" />
      <InvestorReports data={reportSection || reportsSection} />
    </>
  );
}
