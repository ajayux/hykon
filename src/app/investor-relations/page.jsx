import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import InvestorReports from "@/components/blocks/investor/investor-reports";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Investor Relations | HYKON",
  description:
    "Stay updated with Hykon's financial reports and investor relations.",
};

export default async function InvestorRelationsPage() {
  let investorData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/reports`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      investorData = response.data;
    }
  } catch (error) {
    console.error("Error fetching investor relations data:", error);
  }

  if (!investorData) {
    notFound();
  }

  const { heroSection, reportsSection } = investorData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="investor-relations" />
      <InvestorReports data={reportsSection} />
    </>
  );
}
