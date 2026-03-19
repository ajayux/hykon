import BusinessCardHero from "@/components/blocks/business-card/BusinessCardHero";

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
    call_link: "tel:1234567890",
    whatsapp_link: "https://wa.me/1234567890",
    direction_link: "https://www.google.com/maps",
    mail_link: "mailto:WV5tM@example.com",
    website_link: "https://www.example.com",
    address_label:
      "Hykon India Ltd, Kinfra Emc Info Park Expressway, Kakkanad, Kochi-682039",
    company_call_link: "9072394451",
    company_Mail_link: "gmrd@hykonindia.com",
  },
};

export default function BusinesssCardPage() {
  return (
    <>
      <BusinessCardHero data={local_data?.businessHero} />
    </>
  );
}
