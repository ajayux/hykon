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
  title: "Media Center",
  // description: "Blog Listing Page",
  heroSection: {
    title: "Media Center",
    media: {
      type: "image",
      mobilePath: "/images/blogs-hero-1.jpg",
      desktopPath: "/images/blogs-hero-1.jpg",
      alt: "Blogs",
    },
  },
  news: {
    title: "Electric Auto Unit Inauguration",
    date: "27 February 2026",
    author: "#Author",
    media: {
      path: "/images/blog-detail-1.jpg",
      alt: "Empowering a Greener Tomorrow!",
    },
    description:
      `<p>Hykon India ltd, manufacturing unit 5 , for making electric auto-rickshaw was inaugurated by Sri EP Jayarajan , Minister of Sports, industry and Youth affairs of Kerala. Ribbon cutting and unveiling of plaque, also was done by EP Jayarajan. The function was preceded by Sri Denny Varghese, Grama Panchayat President, Kodashery.</p>
      <p>Key note address was given by Sri Christo George, Chairman and managing director of Hykon India Company. Special address was delivered by Sri Santhosh Koshy Thomas, Managing Director of KINFRA and Dr VM Xavier, President of Thrissur Management Association. Felication was delivered by Smt Leena Davis Vice President, block Panchayat Chalakudy; Sri Jenish P Jose, District Panchayat Member, Athirapilly division Deepa Poly, Ward member of Kodashery Panchayat; Sri Adv. Lijo John, Block Panchayat Member Chalakudy</p>
      <p>The function was well attended by people from all walks of life. It was conducted in accordance with full vivid protocol. Welcome speech was given by Sri George Christo, Director of Hykon India ltd. and vote of thanks was delivered by Sri R Harikumar, Chief Operating Officer at Hykon India ltd.</P>`,
    newsec:
      `<h3>How EVs Harness Lithium-Ion Technology</h3>
      <p>Electric vehicles need a power source that is light and compact. They also need to deliver quick bursts of power when needed. Lithium-ion batteries fit this role well. Here’s why they work so well in EVs:</p>
      <p>The function was well attended by people from all walks of life. It was conducted in accordance with full vivid protocol. Welcome speech was given by Sri George Christo, Director of Hykon India ltd. and vote of thanks was delivered by Sri R Harikumar, Chief Operating Officer at Hykon India ltd.</P>`
    
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
   const { heroSection, news } = data;

  return (
    <>
      {heroSection && <InnerHero data={heroSection} />}
      <BreadcrumbInfo slug={`${news?.title}`} />
      {news && <BlogDetailSection data={news} />}
    </>
  );
}
