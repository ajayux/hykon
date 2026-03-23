import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import BlogsListing from "@/components/blocks/blogs/blogs-listing";
import { notFound } from "next/navigation";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("blog");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

const localData = {
  title: "Blog",
  description: "Blog Listing Page",
  heroSection: {
    title: "Blogs",
    media: {
      type: "image",
      mobilePath: "/images/blogs-hero-1.jpg",
      desktopPath: "/images/blogs-hero-1.jpg",
      alt: "Blogs",
    },
  },
};

export default async function BlogsPage() {
  let blogsData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/blogs`);

    if (res.ok) {
      const response = await res.json();
      blogsData = response.data;
    }
  } catch (error) {
    console.error("Error fetching factory detail data:", error);
  }
  if (!blogsData) {
    notFound();
  }

  const { heroSection, blogSection } = blogsData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug={"blogs"} />
      <BlogsListing data={blogSection} />
    </>
  );
}