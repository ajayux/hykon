import { notFound } from "next/navigation";
import TermsAndConditions from "@/components/blocks/terms/terms-conditions";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } =
    await getMetaData("terms-and-conditions");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

export default async function TermsPage() {
  let warrantyPolicyData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/warranty-policy`, {
      next: { revalidate: 0 },
    });

    if (res.ok) {
      const response = await res.json();
      warrantyPolicyData = response.data;
    }

  } catch (error) {
    console.error("Error fetching terms data:", error);
  }
  if (!warrantyPolicyData) {
    notFound();
  }

  return (
    <>
      <TermsAndConditions data={warrantyPolicyData?.policy} />
    </>
  );
}
