import InnerHero from "@/components/common/inner-hero";

const localData = {
  title: "Blog",
  description: "Blog Listing Page",
  heroSection: {
    title: "Blogs",
    media: {
      type: "image",
      path: "/images/placeholder.jpg",
      alt: "Blogs",
    },
  },
  filters: [
    {
      id: 1,
      title: "Upcoming",
      slug: null,
    },
  ],
  items: [
    {
      id: 2,
      title:
        "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      slug: "ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      media: {
        path: "https://beta.hykon.dev14.intersmarthosting.in/storage/217/conversions/blog-2_300-converted.webp",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      },
    },
    {
      id: 1,
      title:
        "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency",
      slug: "still-using-a-tubular-battery-make-the-switch-to-lithium-for-better-efficiency",
      media: {
        path: "https://beta.hykon.dev14.intersmarthosting.in/storage/213/blog-1_300-(1)-converted.webp",
        alt: "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/still-using-a-tubular-battery-make-the-switch-to-lithium-for-better-efficiency",
      },
    },
  ],
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 2,
    has_more: false,
  },
  metaTag: {
    id: 6,
    meta_title: "Blogs",
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

export default function BlogsPage({ data = localData }) {
  const { heroSection } = data;
  return (
    <>
      <InnerHero data={heroSection} />
    </>
  );
}
