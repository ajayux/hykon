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
    const res = await fetch(`${baseUrl}/api/blog/${slug}`);
    if (!res.ok) return { title: "Blog Not Found" };

    const response = await res.json();
    const data = response.data;
    if (!data) return { title: "Blog Not Found" };

    const { meta_title, meta_description, meta_keywords, other_meta_tags } =
      data.metaTag || {};
    const { other } = parseOtherMeta(other_meta_tags || "");
    const ogImage = data.blog?.media?.path || "";

    return {
      title: meta_title || data.blog?.title || "Blog",
      description: meta_description || "",
      keywords: meta_keywords || "",
      openGraph: {
        title: meta_title || data.blog?.title || "Blog",
        description: meta_description || "",
        images: ogImage
          ? [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: data.blog?.media?.alt || "",
              },
            ]
          : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: meta_title || data.blog?.title || "Blog",
        description: meta_description || "",
        images: ogImage ? [ogImage] : [],
      },
      other: { ...other },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      },
    };
  } catch {
    return { title: "Blog Not Found" };
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  let data = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/blog/${slug}`);

    if (res.ok) {
      const response = await res.json();
      data = response.data;
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  if (!data) {
    notFound();
  }

  const { heroSection, blog, keyBenifits, relatedBlogs } = data;

  const page = {
    link: "blog",
    label: "Blogs",
  };

  return (
    <>
      {heroSection && <InnerHero data={heroSection} />}
      <BreadcrumbInfo page={page} slug={`${blog?.title}`} />
      {blog && <BlogDetailSection data={blog} />}
      {keyBenifits?.items?.length > 0 && <BlogKeyBenefits data={keyBenifits} />}
      {relatedBlogs && (
        <BlogRelatedBlogs
          data={{
            title: "Related Blogs",
            description: "",
            items: relatedBlogs,
          }}
          variant="blog"
        />
      )}
    </>
  );
}
