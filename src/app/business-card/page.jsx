import BusinessContact from "@/components/blocks/business-card/business-contact";
import BusinessFooter from "@/components/blocks/business-card/business-footer";
import BusinessGallery from "@/components/blocks/business-card/business-gallery";
import BusinessHero from "@/components/blocks/business-card/business-hero";

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
  const businessCardData = local_data;

  const { businessHero, businessGallery, businessContact } = businessCardData;
  return (
    <>
      <BusinessHero data={businessHero} />
      <BusinessGallery data={businessGallery} />
      <BusinessContact data={businessContact} />
      <BusinessFooter />
    </>
  );
}
