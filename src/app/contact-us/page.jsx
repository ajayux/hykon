import InnerHero from "@/components/common/inner-hero";
import ContactDetails from "@/components/blocks/contact/contact-details";
import ServiceNetwork from "@/components/blocks/contact/service-network";
import MapSection from "@/components/blocks/contact/map-section";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import { notFound } from "next/navigation";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } =
    await getMetaData("contact");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

export default async function ContactPage() {
  let contactData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/contact`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      contactData = response.data;
    }
  } catch (error) {
    console.error("Error fetching factory detail data:", error);
  }
  if (!contactData) {
    notFound();
  }

  // const contactData = localData;
  const { heroSection, addressSection, serviceNetworkSection, mapSection } =
    contactData;

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo slug="contact" />
      <ContactDetails data={addressSection} />
      <ServiceNetwork data={serviceNetworkSection} />
      <MapSection data={mapSection} />
    </>
  );
}

