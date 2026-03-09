import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import BlogDetailSection from "@/components/blocks/blogs/blog-detail-section";
import BlogKeyBenefits from "@/components/blocks/blogs/blog-key-benefits";
import BlogRelatedBlogs from "@/components/blocks/blogs/related-blogs";

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
      alt: "Electric Auto Unit Inauguration",
      gallery: [
        {
          path: "/images/blog-detail-img-1.jpg",
          alt: "Electric Auto Unit Inauguration"
        },
        {
          path: "/images/blog-detail-img-2.jpg",
          alt: "Electric Auto Unit Inauguration"
        }
      ]
    },
    description:
      `<p>Hykon India ltd, manufacturing unit 5 , for making electric auto-rickshaw was inaugurated by Sri EP Jayarajan , Minister of Sports, industry and Youth affairs of Kerala. Ribbon cutting and unveiling of plaque, also was done by EP Jayarajan. The function was preceded by Sri Denny Varghese, Grama Panchayat President, Kodashery.</p>
      <p>Key note address was given by Sri Christo George, Chairman and managing director of Hykon India Company. Special address was delivered by Sri Santhosh Koshy Thomas, Managing Director of KINFRA and Dr VM Xavier, President of Thrissur Management Association. Felication was delivered by Smt Leena Davis Vice President, block Panchayat Chalakudy; Sri Jenish P Jose, District Panchayat Member, Athirapilly division Deepa Poly, Ward member of Kodashery Panchayat; Sri Adv. Lijo John, Block Panchayat Member Chalakudy</p>
      <p>The function was well attended by people from all walks of life. It was conducted in accordance with full vivid protocol. Welcome speech was given by Sri George Christo, Director of Hykon India ltd. and vote of thanks was delivered by Sri R Harikumar, Chief Operating Officer at Hykon India ltd.</P><br>
      <h3>How EVs Harness Lithium-Ion Technology</h3>
      <p>Electric vehicles need a power source that is light and compact. They also need to deliver quick bursts of power when needed. Lithium-ion batteries fit this role well. Here’s why they work so well in EVs:</p>
      <ul>
        <li><b>Great power-to-weight ratio  :</b>  These batteries store a lot of energy without adding too much weight. This helps the vehicle go farther on one charge.</li>
        <li><b>Handles fast discharge  :</b>  EV batteries can give power fast. This is key for quick starts and smooth drives at high speeds.</li>
        <li><b>Faster charging  :</b>  Lithium batteries charge quicker. This makes EVs easier to use daily, even in busy cities.</li>
      </ul>
      <p>Clean and low-cost transport is becoming more important in India, especially for last-mile trips. Electric autos with lithium batteries are helping meet this need. They cut pollution and help drivers save on running costs.</p>
      <p>Worldwide, more people are choosing EVs. Much of this is possible because of better lithium battery technology.</p>
      <h3>The Growing Role of Lithium-Ion in Home Energy Storage</h3>
      <p>Lithium-ion batteries aren’t just changing the way we travel. They’re also changing how we power our homes. As more families choose solar panels and other clean energy options, the need for smarter storage is growing fast.</p>
      <p>Here’s why lithium batteries work so well for home use:</p>
      <ul>
      <li><b>Great for solar storage  :</b>  They store extra solar power during the day. That power is ready at night or when the grid fails.</li>
      <li><b>Longer backup time  :</b>  These batteries last longer during an outage. You don’t have to worry about the battery health even when used more deeply.</li>
      <li><b>Compact and safe  :</b>  Lithium batteries take up less space. They’re also safer to keep inside your home. What makes Hykon Halo the best choice as an inverter is its compact size with the built-in lithium-ion battery.</li>
      <li><b>Quick to recharge  :</b>  They charge faster. Even if power cuts happen one after the other, your home stays ready.</li>
      </ul>
      <p>In places where power cuts happen often — or in modern homes where steady energy is a must — lithium-ion is becoming the clear choice. Looking for the best inverter in India with an inbuilt lithium-ion battery? Halo from Hykon will be the No. 1 choice for you.</p>
      `,
    text:
    `<p>Hykon India ltd, manufacturing unit 5 , for making electric auto-rickshaw was inaugurated by Sri EP Jayarajan , Minister of Sports, industry and Youth affairs of Kerala. Ribbon cutting and unveiling of plaque, also was done by EP Jayarajan. The function was preceded by Sri Denny Varghese, Grama Panchayat President, Kodashery.</p>
      <p>Key note address was given by Sri Christo George, Chairman and managing director of Hykon India Company. Special address was delivered by Sri Santhosh Koshy Thomas, Managing Director of KINFRA and Dr VM Xavier, President of Thrissur Management Association. Felication was delivered by Smt Leena Davis Vice President, block Panchayat Chalakudy; Sri Jenish P Jose, District Panchayat Member, Athirapilly division Deepa Poly, Ward member of Kodashery Panchayat; Sri Adv. Lijo John, Block Panchayat Member Chalakudy</p>
      <p>The function was well attended by people from all walks of life. It was conducted in accordance with full vivid protocol. Welcome speech was given by Sri George Christo, Director of Hykon India ltd. and vote of thanks was delivered by Sri R Harikumar, Chief Operating Officer at Hykon India ltd.</p>
    `,
  },

  keyBenifits: {
    title: "Key Benefits",
    media: {
      type: "image",
      alt: "Key Benefits",
      path: "/images/key-benefits.jpg",
    },
    
    items: [
  { icon: "/images/blogdetails-benefits-1.png", title: "Vast Experience" },
  { icon: "/images/blogdetails-benefits-2.png", title: "Quality Solutions" },
  { icon: "/images/blogdetails-benefits-3.png", title: "Reliable Service" },
  { icon: "/images/blogdetails-benefits-4.png", title: "Diverse Clients" },
  ],
  },
  relatedBlogs: [
    {
      id: 1,
      title:
        "Empowering a Greener Tomorrow!",
      slug: "On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha",
      publishDay: "12",
      publishMonthYear: "June 2025",
      media: {
        path: "/images/related-1.jpg",
        alt: "Empowering a Greener Tomorrow",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/still-using-a-tubular-battery-make-the-switch-to-lithium-for-better-efficiency",
      },
    },
    {
      id: 2,
      title:
        "Solar Division to Partner with State Government ..",
      slug: "On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric",
      publishDay: "25",
      publishMonthYear: "June 2025",
      media: {
        path: "/images/related-2.jpg",
        alt: "Solar Division to Partner with State Government",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/still-using-a-tubular-battery-make-the-switch-to-lithium-for-better-efficiency",
      },
    },
    {
      id: 3,
      title:
        "Solar Division to Partner with State Government ..",
      slug: "still-using-a-tubular-battery-make-the-switch-to-lithium-for-better-efficiency",
      publishDay: "25",
      publishMonthYear: "June 2025",
      media: {
        path: "/images/related-2.jpg",
        alt: "Solar Division to Partner with State Government",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/still-using-a-tubular-battery-make-the-switch-to-lithium-for-better-efficiency",
      },
    },
    {
      id: 4,
      title:
        "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency",
      slug: "still-using-a-tubular-battery-make-the-switch-to-lithium-for-better-efficiency",
      publishDay: "27",
      publishMonthYear: "Feb 2026",
      media: {
        path: "https://beta.hykon.dev14.intersmarthosting.in/storage/213/blog-1_300-(1)-converted.webp",
        alt: "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency",
      },
      button: {
        link: "https://beta.hykon.dev14.intersmarthosting.in/api/blog/still-using-a-tubular-battery-make-the-switch-to-lithium-for-better-efficiency",
      },
    },
    {
      id: 5,
      title:
        "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency",
      slug: "still-using-a-tubular-battery-make-the-switch-to-lithium-for-better-efficiency",
      publishDay: "27",
      publishMonthYear: "Feb 2026",
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
  const { heroSection, news, keyBenifits, relatedBlogs } = data;

  return (
    <>
      {heroSection && <InnerHero data={heroSection} />}
      <BreadcrumbInfo slug={`${news?.title}`} />
      {news && <BlogDetailSection data={news} />}
      {keyBenifits && <BlogKeyBenefits data={keyBenifits} />}
      {relatedBlogs && (<BlogRelatedBlogs data={{
      title: "Related Blogs",
      description: "",
      items: relatedBlogs,
    }}
  />
)}
    </>
  );
}
