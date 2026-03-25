import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import { parseOtherMeta } from "@/lib/helper";

import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import BlogDetailSection from "@/components/blocks/blogs/blog-detail-section";
import BlogKeyBenefits from "@/components/blocks/blogs/blog-key-benefits";
import BlogRelatedBlogs from "@/components/blocks/blogs/related-blogs";


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/news/${slug}`);
    if (!res.ok) return { title: "News Not Found" };

    const response = await res.json();
    const data = response.data;
    if (!data) return { title: "News Not Found" };

    const { meta_title, meta_description, meta_keywords, other_meta_tags } = data.metaTag || {};
    const { other } = parseOtherMeta(other_meta_tags || "");
    const ogImage = data.news?.media?.path || "";

    return {
      title: meta_title || data.news?.title || "News",
      description: meta_description || "",
      keywords: meta_keywords || "",
      openGraph: {
        title: meta_title || data.news?.title || "News",
        description: meta_description || "",
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: data.news?.media?.alt || "" }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: meta_title || data.news?.title || "News",
        description: meta_description || "",
        images: ogImage ? [ogImage] : [],
      },
      other: { ...other },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/news/${slug}`,
      },
    };
  } catch {
    return { title: "News Not Found" };
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  let data = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/news/${slug}`);

    if (res.ok) {
      const response = await res.json();
      data = response.data;
    }

    console.log("newsData : ",data)

  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  if (!data) {
    notFound();
  }

  const { heroSection, news, keyBenifits, relatedNews } = data;


  const page = {
    link: "news-events",
    label: "News",
  }

  return (
    <>
      {heroSection && <InnerHero data={heroSection} />}
      <BreadcrumbInfo page={page} slug={`${news?.title}`} />
      {news && <BlogDetailSection data={news} />}
      {keyBenifits?.items?.length>0 && <BlogKeyBenefits data={keyBenifits} />}
      {relatedNews?.length >0  && (
        <BlogRelatedBlogs
          data={{
            title: "Related News",
            description: "",
            items: relatedNews,
          }}
          variant = "news"
        />
      )}
    </>
  );
}
