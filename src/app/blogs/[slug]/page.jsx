import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import BlogDetailSection from "@/components/blocks/blogs/blog-detail-section";


export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug} | HYKON`,
    description: { slug },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  let blogDetailData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      blogDetailData = response.data;
    }
  } catch (error) {
    console.error("Error fetching blog detail data:", error);
  }

  if (!blogDetailData) {
    notFound();
  }

  const { heroSection, blogSection } =
    blogDetailData;

  return (
    <>
      {heroSection && <InnerHero data={heroSection} />}
      <BreadcrumbInfo slug={`Media Center/${slug}`} />
      {blogSection && <BlogDetailSection data={blogSection} />}
      
    </>
  );
}
