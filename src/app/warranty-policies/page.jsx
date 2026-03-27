import { notFound } from "next/navigation";
import TermsAndConditions from "@/components/blocks/terms/terms-conditions";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/warranty-policy`);

    const response = await res.json();
    const data = response.data;

    const { meta_title, meta_description, meta_keywords, other_meta_tags } = data.metaTag || {};
    const { other } = parseOtherMeta(other_meta_tags || "");
    const ogImage = data.heroSection?.media?.desktopPath || "";

    return {
      title: meta_title || data.policy?.title || "Warranty Policy",
      description: meta_description || "",
      keywords: meta_keywords || "",
      openGraph: {
        title: meta_title || data.policy?.title || "Warranty Policy",
        description: meta_description || "",
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: data.heroSection?.media?.alt || "" }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: meta_title || data.policy?.title || "Warranty Policy",
        description: meta_description || "",
        images: ogImage ? [ogImage] : [],
      },
      other: { ...other },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/warranty-policy`,
      },
    };
  } catch {
    return { title: "Warranty Policy" };
  }
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
  if (!warrantyPolicyData || !warrantyPolicyData.policy?.content) {
    notFound();
  }

  return (
    <>
      <TermsAndConditions data={warrantyPolicyData?.policy} />
    </>
  );
}
