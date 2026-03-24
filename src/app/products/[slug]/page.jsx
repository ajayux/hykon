import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import CategoriesDetail from "@/components/blocks/categories/categories-detail";
import ProductDetail from "@/components/blocks/products/product-detail";
import ProductSimilar from "@/components/blocks/products/product-similar";
import ProductQuestions from "@/components/blocks/products/product-questions";

export const metadata = {
  title: "Product details | HYKON",
  description:
    "Browse our wide range of power solutions for homes, industries, and EV ecosystems.",
};

const localData = {
  heroSection: {
    title: null,
    media: {
      type: "image",
      mobilePath: "/images/products-hero-1.jpg",
      desktopPath: "/images/products-hero-1.jpg",
      alt: "Products",
    },
  },
  productDetailSection: {
    title: "Jupiter 260",
    slug: "jupiter-260",
    media: [
      {
        id: 1,
        type: "image",
        url: "/images/pro-detail-1.jpg",
        thumbnailUrl: "/images/placeholder.jpg",
        alt: "Jupiter 260",
      },
      {
        id: 2,
        type: "image",
        url: "/images/pro-detail-2.png",
        thumbnailUrl: "/images/pro-detail-2.png",
        alt: "Jupiter 260",
      },
      {
        id: 3,
        type: "image",
        url: "/images/pro-detail-1.jpg",
        thumbnailUrl: "/images/placeholder.jpg",
        alt: "Jupiter 260",
      },
      {
        id: 4,
        type: "image",
        url: "/images/pro-detail-1.jpg",
        thumbnailUrl: "/images/placeholder.jpg",
        alt: "Jupiter 260",
      },
      {
        id: 5,
        type: "image",
        url: "/images/pro-detail-1.jpg",
        thumbnailUrl: "/images/placeholder.jpg",
        alt: "Jupiter 260",
      },
    ],
    pricing: {
      mrp: 47590,
      sellingPrice: 42491,
      discountPercentage: 21,
      formattedDiscountPercentage: "21% off",
      currencyCode: "INR",
      currencySymbol: "₹",
      includesTax: true,
      taxLabel: "Inclusive of all tax",
      legalNotices: ["*Courier Charges Extra. Conditions Apply."],
    },
    availability: {
      isInStock: true,
      stockLabel: "In Stock",
    },
    variants: {
      items: [
        {
          id: 1,
          name: "Jupiter 130",
          slug: "jupiter-130",
          isAvailable: true,
        },
        {
          id: 2,
          name: "Jupiter 200",
          slug: "jupiter-200",
          isAvailable: true,
          isAvailable: true,
        },
        {
          id: 3,
          name: "Jupiter 260",
          slug: "jupiter-260",
          isAvailable: true,
        },
        {
          id: 4,
          name: "Jupiter 340",
          slug: "jupiter-340",
          isAvailable: true,
        },
        {
          id: 5,
          name: "Jupiter 340",
          slug: "jupiter-340",
          isAvailable: false,
        },
        {
          id: 6,
          name: "Jupiter 340",
          slug: "jupiter-340",
          isAvailable: true,
        },
      ],
    },
    contentTabs: [
      {
        id: 1,
        label: "Description",
        isDefault: true,
        description:
          "<p>A solar water heater is a device that utilizes sunlight to heat water for domestic, commercial, or industrial purposes. It harnesses the energy from the sun to raise the temperature of water, providing a cost-effective and environmentally friendly alternative to traditional water heating methods. Typically consisting of solar collectors and a circulation system, solar water heaters can be active or passive systems.</p><p>Hykon's Jupiter 260 solar water heater is having a capacity of 260 LPD, and is highly recommended for getting uninterrupted hot water at your home without spending any money on electricity bills.</p>",
      },
      {
        id: 2,
        label: "Specification",
        isDefault: false,
        description:
          "<h5>General Specification</h5><table><tbody><tr><td>Capacity</td><td>200 Litres</td></tr><tr><td>Inner Tank</td><td>Single moulded CFT</td></tr><tr><td>Outer Tank</td><td>Mirror Finish SS430</td></tr><tr><td>Stand</td><td>Aluminium Stand Parts</td></tr><tr><td>Glass Tubes</td><td>58x2100 Evacuated Glass Tubes</td></tr><tr><td>Water Quality</td><td>Suitable for water quality up to 2000PPM</td></tr></tbody></table>",
      },
    ],
    specificationVideo: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl:
        "https://cdn.hykon.com/products/jupiter-260/video-thumb.jpg",
    },
    brochureInfo: {
      label: "Download Brochure",
      url: "https://beta.hykon.dev14.intersmarthosting.in/storage/342/dummy-(2).pdf",
    },
    warrantyInfo: {
      label: "Warranty Policies",
      url: "/warranty-policies",
    },
    deliveryInfo: {
      label: "Delivery Policies",
      url: "/delivery-policies",
      estimatedDelivery: "7-10 business days",
      notes: "Courier Charges Extra. Conditions Apply.",
    },
  },
  similarProductSection: {
    title: "Similar Products",
    productItems: [
      {
        id: 1,
        title: "Jupiter 130",
        slug: "jupiter-130",
        mrp: "27570",
        price: "25000",
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
      },
      {
        id: 2,
        title: "Jupiter 200",
        slug: "jupiter-200",
        mrp: "43700",
        price: "39018",
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
      },
      {
        id: 3,
        title: "Jupiter 250",
        slug: "jupiter-250",
        mrp: "56600",
        price: "50000",
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
      },
      {
        id: 4,
        title: "Jupiter 130",
        slug: "jupiter-130",
        mrp: "27570",
        price: "25000",
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
      },
      {
        id: 5,
        title: "Jupiter 200",
        slug: "jupiter-200",
        mrp: "43700",
        price: "39018",
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
      },
      {
        id: 6,
        title: "Jupiter 250",
        slug: "jupiter-250",
        mrp: "56600",
        price: "50000",
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
      },
      {
        id: 7,
        title: "Jupiter 130",
        slug: "jupiter-130",
        mrp: "27570",
        price: "25000",
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
      },
      {
        id: 8,
        title: "Jupiter 200",
        slug: "jupiter-200",
        mrp: "43700",
        price: "39018",
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
      },
      {
        id: 9,
        title: "Jupiter 250",
        slug: "jupiter-250",
        mrp: "56600",
        price: "50000",
        media: {
          path: "https://beta.hykon.dev14.intersmarthosting.in/storage/321/pro-1-converted.webp",
          alt: "Inline UPS",
        },
      },
    ],
  },
  faqSection: {
    title: "Frequently Asked Questions",
    faqItems: [
      {
        id: 1,
        question: "How to select required capacity?",
        answer:
          "<p><span>The average hot water consumption per person is 25 litres per shower. The product capacity needed for your requirement can be arrived at by calculating the number of members consuming hot water.</span></p>",
      },
      {
        id: 2,
        question: "Does solar hot water work on rainy days?",
        answer:
          "<p>The average hot water consumption per person is 25 litres per shower. The product capacity needed for your requirement can be arrived at by calculating the number of members consuming hot water.</p>",
      },
      {
        id: 3,
        question: "What is the warranty for Hykon solar water heater?",
        answer: "<p><span>Hykon offers 5-year warranty for unit.</span></p>",
      },
      {
        id: 4,
        question:
          "Are there any potential issues with solar water heater if its left unused for an extended period?",
        answer:
          "<p><span>The risk of complaints can be avoided by covering the collector part of the solar water heater when it is not in use for an extended period of time.</span></p>",
      },
      {
        id: 5,
        question:
          "Can a solar water heater with normal gravity pressure be installed where a pressure pump is used?",
        answer:
          "<p><span>Pressurized model is only recommended for those sites where pressure pump is installed. Hykon Pressurized model, Turbo+ water heaters are suitable for households which use a pressure pump and have TDS less than 300 PPM. This solar water heater comes with a unique double-layered stainless steel pressurized inner tank which can stand water pressure up to 4bar.</span></p>",
      },
      {
        id: 6,
        question: "How much does a solar water heater cost?",
        answer:
          "<p><span>The cost varies depending on the size, type, and location. However, the initial investment is often offset by long-term savings on energy bills.</span></p>",
      },
      {
        id: 7,
        question: "Can a solar water heater provide hot water during winter?",
        answer:
          "<p><span>Yes, but the efficiency may be reduced in colder climates. Many systems include auxiliary heating options for cloudy or cold days.</span></p>",
      },
    ],
  },
  metaTags: {
    id: 13,
    meta_title: "Category detail",
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

export default async function productDetailPage({params}) {
    let productsData = null;
    const {slug} = await params;

    console.log(slug)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/api/variant/${slug}`, {
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const response = await res.json();
        productsData = response.data;
      }
    } catch (error) {
      console.error("Error fetching categories data:", error);
    }

    if (!productsData) {
      notFound();
    }


  const {
    heroSection,
    productDetailSection,
    similarProductSection,
    faqSection,
  } = productsData;



  const grandParentPage = {
    label: "Product Category",
    link: "category",
  };

  const parentPage = {
    label: productDetailSection?.categoryTitle,
    link: `category/${productDetailSection?.categorySlug}`,
  };

  const page = {
    label: productDetailSection?.productTitle,
    link: `products?product_slug=${productDetailSection?.productSlug}`,
  };

  return (
    <>
      <InnerHero data={heroSection} />
      <BreadcrumbInfo
        variant="extra-gap"
        grandParentPage={grandParentPage}
        parentPage={parentPage}
        page={page}
        slug={productDetailSection?.title}
      />
      {productDetailSection && <ProductDetail data={productDetailSection} />}
      {similarProductSection?.productItems?.length>0 && <ProductSimilar data={similarProductSection} />}
      {faqSection?.faqItems.length>0 && <ProductQuestions data={faqSection} />}
    </>
  );
}
