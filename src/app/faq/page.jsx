import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import FaqListing from "@/components/blocks/faq/faq-listing";
import { notFound } from "next/navigation";

// const localData = {
//   title: "FAQ",
//   // description: "Blog Listing Page",
//   heroSection: {
//     title: "FAQ",
//     media: {
//       type: "image",
//       mobilePath: "/images/faq-hero.jpg",
//       desktopPath: "/images/faq-hero.jpg",
//       alt: "Faq",
//     },
//   },
//   "filterItems": [
//       { "id": 1, "title": "Solar Water Heater", "slug": "solar-water-heater" },
//       { "id": 2, "title": "Stainless steel water tank", "slug": "stainless-steel-water-tank" },
//       { "id": 3, "title": "UPS & Inverters", "slug": "ups-inverters" }
//   ],

//   "metaTag": {
//       "id": 10,
//       "meta_title": "Faq",
//       "meta_description": null,
//       "meta_keywords": null,
//       "other_meta_tags": null
//   }

// };


export default async function faqPage() {
  let faqData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/faq`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      faqData = response.data;
    }
  } catch (error) {
    console.error("Error fetching factory detail data:", error);
  }
  if (!faqData) {
    notFound();
  }

  const { heroSection, filterItems, faqs } = faqData;

  return (
    <>
      <InnerHero data={heroSection} overlayOpacity={70} />
      <BreadcrumbInfo slug="faq" />

      <FaqListing
        data={{
          title: "FAQ",
          filterItems: filterItems,
          faqs: faqs,
        }}
      />
    </>
  );
}
