import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import CustomerCareDetails from "@/components/blocks/customer-care/customer-care-details";
import CustomerCareForm from "@/components/blocks/customer-care/customer-care-form";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Customer Care | HYKON",
  description:
    "Stay updated with Hykon's financial reports and investor relations.",
};

export default async function CustomerCarePage() {
  let pageData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/customer-care`, {
      next: { revalidate: 60 },
    });

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
