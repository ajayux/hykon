import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import FaqListing from "@/components/blocks/faq/faq-listing";
import { notFound } from "next/navigation";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("faq");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

export default async function faqPage() {
  let faqData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/faq`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      faqData = response.data;
    }
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
  }
  if (!faqData) {
    notFound();
  }

  const { heroSection, faqSection } = faqData;

  console.log(faqData)

  return (
    <>
      <InnerHero data={heroSection} overlayOpacity={70} />
      <BreadcrumbInfo slug="faq" />

      <FaqListing
        data={{
          title: faqSection?.title,
          filterItems: faqSection?.filterItems,
          faqs: faqSection?.faqs,
        }}
      />
    </>
  );
}