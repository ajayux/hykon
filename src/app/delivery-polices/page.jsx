import { notFound } from "next/navigation";
import TermsAndConditions from "@/components/blocks/terms/terms-conditions";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } =
    await getMetaData("delivery-polices");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

export default async function TermsPage() {
  let termsData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/delivery-policy`, {
      next: { revalidate: 0 },
    });

    if (res.ok) {
      const response = await res.json();
      termsData = response.data;
    }

  } catch (error) {
    console.error("Error fetching terms data:", error);
  }
  if (!termsData) {
    notFound();
  }

  return (
    <>
      <TermsAndConditions data={termsData?.policy} />
    </>
  );
}
