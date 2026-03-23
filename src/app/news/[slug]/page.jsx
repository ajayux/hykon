import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import { getMetaData } from "@/lib/api/metaApi";


import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import BlogDetailSection from "@/components/blocks/blogs/blog-detail-section";
import BlogKeyBenefits from "@/components/blocks/blogs/blog-key-benefits";
import BlogRelatedBlogs from "@/components/blocks/blogs/related-blogs";




export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, lang } = resolvedParams;
  const { data, error } = await getMetaData(`news-details?slug=${slug}`, lang);

  if (!data || error) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const { meta_title, meta_description, meta_keywords, other_meta_tags, title, featured_image, image_alt_text, published_on } = data;

  // Use blog's own image or fallback
  const ogImage = featured_image || DefaultOgImage;
  const { other, scripts } = parseOtherMeta(other_meta_tags);

  return {
    title: meta_title || title || "Blog Post",
    description: meta_description || "Read our latest blog post",
    keywords: meta_keywords || "",

    // Enhanced SEO fields
    openGraph: {
      title: meta_title || title || "Blog Post",
      description: meta_description || "Read our latest blog post",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: image_alt_text || title || "Blog post image",
        },
      ],
      type: "article",
      publishedTime: published_on ? published_on : undefined,
      authors: undefined,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/blog/${slug}`,
    },

    twitter: {
      card: "summary_large_image",
      title: meta_title || title || "Blog Post",
      description: meta_description || "Read our latest blog post",
      images: [ogImage],
    },

    other: {
      ...other,
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/news/${slug}`,
    },
  };
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
      {relatedNews && (
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
