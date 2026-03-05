import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import BlogDetailSection from "@/components/blocks/blogs/blog-detail-section";

// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   return {
//     title: `${slug} | HYKON`,
//     description: { slug },
//   };
// }

const localData = {
  heroSection: {
    title: "Empowering a Greener Tomorrow!",
    media: {
      type: "image",
      mobilePath:
        "https://beta.hykon.dev14.intersmarthosting.in/storage/185/conversions/news-2_optimized_300-converted.webp",
      desktopPath:
        "https://beta.hykon.dev14.intersmarthosting.in/storage/184/conversions/news-2_optimized_300-converted.webp",
      alt: "Empowering a Greener Tomorrow!",
    },
  },
  news: {
    title: "Empowering a Greener Tomorrow!",
    date: "27 February 2026",
    author: null,
    media: {
      path: "https://beta.hykon.dev14.intersmarthosting.in/storage/183/conversions/news-2_optimized_300-converted.webp",
      alt: "Empowering a Greener Tomorrow!",
    },
    content:
      "<div>\r\n<div><span>On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha<br></span>\r\n<div>\r\n<div><span>On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha</span>\r\n<div>\r\n<div><span>On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha</span></div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>",
    galleries: [
      {
        id: 186,
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/186/news-2_optimized_300.png",
          alt: "Empowering a Greener Tomorrow!",
        },
      },
      {
        id: 187,
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/187/news-1.jpg",
          alt: "Empowering a Greener Tomorrow!",
        },
      },
    ],
    description:
      "<div>\r\n<div><span>On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha</span>\r\n<div>\r\n<div><span>On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha</span>\r\n<div>\r\n<div><span>On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha</span>\r\n<div>\r\n<div><span>On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha</span>\r\n<div>\r\n<div><span>On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha</span></div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>",
  },
  keyBenifits: {
    title: "Key Benifits",
    media: {
      type: "image",
      alt: "Key Benifits",
      path: "https://beta.hykon.dev14.intersmarthosting.in/storage/188/news-1.jpg",
    },
    items: [],
  },
  relatedNews: [
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
  metaTag: {
    meta_title: "Empowering a Greener Tomorrow!",
    meta_description: "Empowering a Greener Tomorrow!",
    meta_keywords: "Empowering a Greener Tomorrow!",
    other_meta_tags: "",
  },
};

export default async function BlogDetailPage({ data = localData }) {
  // const { slug } = await params;
  // let blogDetailData = null;

  // try {
  //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  //   const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
  //     next: { revalidate: 60 },
  //   });

  //   if (res.ok) {
  //     const response = await res.json();
  //     blogDetailData = response.data;
  //   }
  // } catch (error) {
  //   console.error("Error fetching blog detail data:", error);
  // }

  // if (!blogDetailData) {
  //   notFound();
  // }

  const { heroSection, news } = data;

  return (
    <>
      {heroSection && <InnerHero data={heroSection} />}
      <BreadcrumbInfo slug={`News/${news?.title}`} />
      {news && <BlogDetailSection data={news} />}
    </>
  );
}
