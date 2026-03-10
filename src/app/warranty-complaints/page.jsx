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

const localData = {
  customerCare: {
    qrCode: "/images/qr-code.png",
    whatsappNumber: "96051 33333",
    email: "priya@intersmart.in",
    callCenterNumber: ["96051 33333,96051 33444"],
    timing:
      "<p>9 am to 7 pm&nbsp;<br><span>(Monday to Saturday)</span><br><br>9 am to 6 pm&nbsp;<br><span>(Sunday)</span></p>",
    locations: ["Thrissur,Kochi,Pune,Coimbatore"],
  },
  formSections: {
    filters: [
      {
        id: 1,
        title: "Warranty Registration",
        slug: "warranty-registration",
      },
      {
        id: 2,
        title: "Registration Complaints",
        slug: "registration-complaints",
      },
    ],
  },
  metaTag: {
    id: 12,
    meta_title: "Customer Care",
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

export default async function WarrantyComplaintsPage() {
  // let pageData = null;

  // try {
  //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  //   const res = await fetch(`${baseUrl}/api/customer-care`, {
  //     next: { revalidate: 60 },
  //   });

  //   if (res.ok) {
  //     const response = await res.json();
  //     pageData = response.data;
  //   }
  // } catch (error) {
  //   console.error("Error fetching customer care data:", error);
  // }

  // if (!pageData) {
  //   notFound();
  // }

  const pageData = localData;
  const { formSections } = pageData;

  return (
    <>
      <BreadcrumbInfo slug="Warranty & Complaints" />
      <WarrantyFormInfo data={formSections} />
    </>
  );
}
