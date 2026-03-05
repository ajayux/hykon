import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import BlogsListing from "@/components/blocks/blogs/blogs-listing";

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
  filters: [
    {
      id: 1,
      title: "Upcoming",
      slug: null,
    },
  ],
  items: [
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
      id: 3,
      title: "Heat Pump vs Geyser: Which one saves you more in the long run?",
      slug: "heat pump vs geyser: Which one saves you more in the long run?",
      media: {
        path: "/images/blog-3.jpg",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      },
    },

    {
      id: 4,
      title:
        "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency.... ",
      slug: "still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency ",
      media: {
        path: "/images/blog-4.jpg",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      },
    },

    {
      id: 5,
      title:
        "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency.... ",
      slug: "still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency ",
      media: {
        path: "/images/blog-5.jpg",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      },
    },

    {
      id: 6,
      title: "Heat Pump vs Geyser: Which one saves you more in the long run?",
      slug: "heat pump vs geyser: Which one saves you more in the long run?",
      media: {
        path: "/images/blog-6.jpg",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      },
    },

    {
      id: 7,
      title: "Heat Pump vs Geyser: Which one saves you more in the long run?",
      slug: "heat pump vs geyser: Which one saves you more in the long run?",
      media: {
        path: "/images/blog-3.jpg",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      },
    },

    {
      id: 8,
      title:
        "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency.... ",
      slug: "still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency ",
      media: {
        path: "https://beta.hykon.dev14.intersmarthosting.in/storage/213/blog-1_300-(1)-converted.webp",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      },
    },

    {
      id: 9,
      title:
        "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency.... ",
      slug: "still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency ",
      media: {
        path: "/images/blog-4.jpg",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      },
    },

    {
      id: 10,
      title:
        "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency.... ",
      slug: "still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency ",
      media: {
        path: "/images/blog-5.jpg",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      },
    },

    {
      id: 11,
      title: "Heat Pump vs Geyser: Which one saves you more in the long run?",
      slug: "heat pump vs geyser: Which one saves you more in the long run?",
      media: {
        path: "/images/blog-6.jpg",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
      },
    },

    {
      id: 12,
      title: "Heat Pump vs Geyser: Which one saves you more in the long run?",
      slug: "heat pump vs geyser: Which one saves you more in the long run?",
      media: {
        path: "/images/blog-3.jpg",
        alt: "EV vs Home Energy Storage: Different Applications of Lithium Technology",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/ev-vs-home-energy-storage-different-applications-of-lithium-technology",
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
      <BreadcrumbInfo slug={"blogs"} />
      <BlogsListing data={data} />
    </>
  );
}
