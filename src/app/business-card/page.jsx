import ScanConnect from "@/components/blocks/business-card/scan-connect";
import BusinessHero from "@/components/blocks/business-card/business-hero";
import BusinessAbout from "@/components/blocks/business-card/business-about";
import BusinessFooter from "@/components/blocks/business-card/business-footer";
import BusinessContact from "@/components/blocks/business-card/business-contact";
import BusinessGallery from "@/components/blocks/business-card/business-gallery";
import BusinessServices from "@/components/blocks/business-card/business-services";
import BusinessVideos from "@/components/blocks/business-card/business-videos";
import BusinessHeader from "@/components/blocks/business-card/business-header";

const local_data = {
  businessHero: {
    name: "AJISH T G",
    designation: "General Manager - R&D",
    media: {
      type: "image",
      mobilePath: "/images/business-hero-1.jpg",
      path: "/images/business-hero-1.jpg",
      alt: "Business",
    },
    call: "tel:1234567890",
    whatsapp: "https://wa.me/1234567890",
    direction: "https://www.google.com/maps",
    mail: "mailto:WV5tM@example.com",
    website: "https://www.example.com",
    address:
      "Hykon India Ltd, Kinfra Emc Info Park Expressway, Kakkanad, Kochi-682039",
    companyCall: "9072394451",
    companyMail: "gmrd@hykonindia.com",
    sociallinks: [
      {
        link: "/",
        icon: "/images/facebook.svg",
        name: "Facebook",
      },
      {
        link: "/",
        icon: "/images/youtube.svg",
        name: "youtube",
      },
      {
        link: "/",
        icon: "/images/instagram.svg",
        name: "instagram",
      },
      {
        link: "/",
        icon: "/images/linkedin.svg",
        name: "linkedin",
      },
      {
        link: "/",
        icon: "/images/x.svg",
        name: "x",
      },
    ],
  },
  scanConnect: {
    title: "Scan me to connect",
    path: "/images/scan-connect.svg",
    alt: "Scan & Connect",
  },
  businessAbout: {
    title: "About Us",
    subTitle: "Hykon: Powering the Nation, One Innovation at a Time",
    description:
      "<p>Hykon, established in 1991, is a leading ISO 9001-certified company with a rich heritage in power electronics. Our journey began with a vision – to become a pioneer in this critical field and contribute to the nation's growth. From a humble beginning with just five employees, Hykon has flourished under the leadership of Mr. Christo George, a dedicated technocrat with a passion for innovation.</p><p>Today, Hykon stands tall with a diverse portfolio. We are not just a power electronics company anymore; we have strategically expanded into Medical Transcription Technology, Information Technology and Solar Energy, constantly seeking new avenues to serve our nation's evolving needs.</p>",
    vissionList: [
      {
        id: 1,
        iconPath: "/images/vision-1.svg",
        title: "Vision",
        description:
          "Our mission is to empower the nation by delivering innovative solutions in power electronics and green energy. We create value for our customers & stakeholders by providing a comprehensive range of products and services that address the evolving needs of the nation's energy landscape.",
      },
      {
        id: 2,
        iconPath: "/images/vision-2.svg",
        title: "Vision",
        description:
          "Our vision is to be a National player in Green Energy and Power solutions through continual improvement in R & D, Quality and Customer service.",
      },
    ],
  },
  businessVideos: {
    title: "Youtube Videos",
    Videos: [
      {
        id: 1,
        path: "/videos/dummy-video.mp4",
        alt: "Business",
      },
      {
        id: 2,
        path: "/videos/dummy-video.mp4",
        alt: "Business",
      },
      {
        id: 3,
        path: "/videos/dummy-video.mp4",
        alt: "Business",
      },
      {
        id: 4,
        path: "/videos/dummy-video.mp4",
        alt: "Business",
      },
    ],
  },
  businessServices: {
    title: "Products & Services",
    gallery: [
      {
        id: 1,
        path: "/images/business-service-1.jpg",
        alt: "business-service-1",
      },
      {
        id: 2,
        path: "/images/business-service-1.jpg",
        alt: "business-service-1",
      },
      {
        id: 3,
        path: "/images/business-service-1.jpg",
        alt: "business-service-1",
      },
    ],
  },
  businessGallery: {
    title: "Image Gallery",
    items: [
      {
        id: 1,
        type: "image",
        path: "/images/business-gallery-1.jpg",
        alt: "Business",
      },
      {
        id: 2,
        type: "image",
        path: "/images/business-gallery-2.jpg",
        alt: "Business",
      },
      {
        id: 3,
        type: "image",
        path: "/images/business-gallery-3.jpg",
        alt: "Business",
      },
      {
        id: 4,
        type: "image",
        path: "/images/business-gallery-1.jpg",
        alt: "Business",
      },
      {
        id: 5,
        type: "video",
        path: "/videos/dummy-video.mp4",
        alt: "Business",
      },
    ],
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 3,
      total: 4,
      has_more: true,
    },
  },
  businessContact: {
    title: "Contact Us",
  },
};

export default function BusinesssCardPage() {
  return (
    <div className="w-full h-full bg-black">
      <div className="max-w-[410px] mx-auto overflow-hidden">
        <BusinessHeader />
        <BusinessHero data={local_data?.businessHero} />
        <ScanConnect data={local_data?.scanConnect} />
        <BusinessAbout data={local_data?.businessAbout} />
        <BusinessVideos data={local_data?.businessVideos} />
        <BusinessServices data={local_data?.businessServices} />
        <BusinessGallery data={local_data?.businessGallery} />
        <BusinessContact data={local_data?.businessContact} />
        <BusinessFooter />
      </div>
    </div>
  );
}
