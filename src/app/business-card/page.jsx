import BusinessCardHero from "@/components/blocks/business-card/business-hero";

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
};

export default function BusinesssCardPage() {
  return (
    <>
      <BusinessCardHero data={local_data?.businessHero} />
    </>
  );
}
