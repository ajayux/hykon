import InnerHero from "@/components/common/inner-hero";
import ContactDetails from "@/components/blocks/contact/contact-details";
import ServiceNetwork from "@/components/blocks/contact/service-network";
import MapSection from "@/components/blocks/contact/map-section";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";

export const metadata = {
  title: "Contact | HYKON",
  description: "Join our team and build your future with Hykon.",
};

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

// {
//     "success": true,
//     "message": "Contact data fetched successfully",
//     "data": {
//         "heroSection": {
//             "title": "Contact",
//             "media": {
//                 "type": "image",
//                 "mobilePath": "https://beta.hykon.dev14.intersmarthosting.in/storage/300/banner-mobile.webp",
//                 "desktopPath": "https://beta.hykon.dev14.intersmarthosting.in/storage/299/banner.webp",
//                 "alt": "Contact"
//             }
//         },
//         "addressSection": {
//             "title": "Corporate Office",
//             "address": "<p>Hykon India Ltd.<br><span>KINFRA EMC<br></span><span>Infopark Expressway<br></span><span>Kakkanad,&nbsp;</span><span>Kochi -682039</span></p>",
//             "cin": "U52599KL1998PLC012330",
//             "gst": "32AAACH6869H1ZH",
//             "customer_support": "+91 9020 121 121",
//             "service_support": "+91 9539 882 000",
//             "sales_support": "+91 8086 545 000",
//             "email": "ho@hykonindia.com",
//             "fax": "0487 - 2425527"
//         },
//         "serviceNetworkSection": {
//             "title": "Service Network",
//             "locationFilter": [
//                 {
//                     "id": 1,
//                     "title": "KERALA",
//                     "slug": "kerala"
//                 },
//                 {
//                     "id": 2,
//                     "title": "TAMIL NADU",
//                     "slug": "tamil-nadu"
//                 }
//             ],
//             "items": [
//                 {
//                     "id": 1,
//                     "title": "ALAPPUZHA",
//                     "phone": "+9020 121 121",
//                     "email": "svekm@hykonindia.com"
//                 },
//                 {
//                     "id": 2,
//                     "title": "ERNAKULAM",
//                     "phone": "+9020 121 121",
//                     "email": "svekm@hykonindia.com"
//                 },
//                 {
//                     "id": 3,
//                     "title": "IDUKKI",
//                     "phone": "+9020 121 121",
//                     "email": "svktm@hykonindia.com"
//                 },
//                 {
//                     "id": 4,
//                     "title": "KANNUR",
//                     "phone": "+9020 121 121",
//                     "email": "svknr@hykonindia.com"
//                 }
//             ]
//         },
//         "mapSection": {
//             "title": "Location",
//             "map_iframe": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d415899.1490153593!2d76.8710625!3d8.863560999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3b05bbe776100aa1%3A0xcc50b36bf9ee6b01!2sHykon%20India%20Limited%2C%20TC-2%2F1420%2F2%2C3%20Vaidhyuthi%20Bhavan%20Road%2C%20Vrindavan%20Gardens%2C%20Pattom%2C%20Thiruvananthapuram%2C%20Kerala%20695004!3m2!1d8.5171999!2d76.94023!5e1!3m2!1sen!2sin!4v1772711897005!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
//         },
//         "metaTag": {
//             "id": 3,
//             "meta_title": "Contact",
//             "meta_description": null,
//             "meta_keywords": null,
//             "other_meta_tags": null
//         }
//     }
// }
