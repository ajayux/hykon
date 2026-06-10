import { parseOtherMeta } from "../helper";
import { API_URL } from "./client";
import { defaultMeta, DefaultOgImage } from "./constants";

const fallback = {
  title: "Hykon India",
  description: "India's Leader In Power Electronics and Green Energy",
  keywords: "hykon, solar, power electronics, green energy",
};

export async function getMetaData(pageKey) {
  const pageMeta = defaultMeta?.[pageKey] || fallback;

  const metaTitle = pageMeta.title;
  const metaDescription = pageMeta.description;
  const metaKeywords = pageMeta.keywords;

  try {
    const response = await fetch(`${API_URL}/meta-tags?page=${pageKey}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });


    const result = await response.json();
    const meta = result.data;


    if (result?.success) {
      const { other } = parseOtherMeta(meta?.other_meta_tags || "");

      return {
        title: meta?.meta_title,
        description: meta?.meta_description || metaDescription,
        keywords: meta?.meta_keywords || metaKeywords,
        openGraph: {
          title: meta?.og_title || meta?.meta_title || metaTitle,
          description: meta?.og_description || meta?.meta_description || metaDescription,
          images: meta?.og_image
            ? [{ url: meta.og_image, width: 1200, height: 630 }]
            : [{ url: DefaultOgImage, width: 1200, height: 630 }],
          type: "website",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${pageKey}`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || metaTitle,
          description: meta?.twitter_description || meta?.meta_description || metaDescription,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${pageKey}`,
        },
        other,
        error: null,
      };
    }

    return buildFallbackMetadata(metaTitle, metaDescription, metaKeywords, pageKey);
  } catch (error) {
    return buildFallbackMetadata(metaTitle, metaDescription, metaKeywords, pageKey);
  }
}

function buildFallbackMetadata(title, description, keywords, pageKey) {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [{ url: DefaultOgImage, width: 1200, height: 630 }],
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${pageKey}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${pageKey}`,
    },
    other: {},
    error: "No metadata found",
  };
}