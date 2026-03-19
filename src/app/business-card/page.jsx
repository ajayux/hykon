import ScanConnect from "@/components/blocks/business-card/scan-connect";
import BusinessAbout from "@/components/blocks/business-card/business-about";
import BusinessCardHero from "@/components/blocks/business-card/business-hero";
import BusinessServices from "@/components/blocks/business-card/business-services";

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
};

export default function BusinesssCardPage() {
  return (
    <>
      <BusinessCardHero data={local_data?.businessHero} />
      <ScanConnect data={local_data?.scanConnect} />
      <BusinessAbout data={local_data?.businessAbout} />
      <BusinessServices data={local_data?.businessServices} />
    </>
  );
}
