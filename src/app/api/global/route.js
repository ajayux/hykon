import { NextResponse } from "next/server";

/**
 * GET /api/global
 */
export async function GET(request) {
  const globalData = {
    headerData: {
      id: "uuid-primary-key",
      name: "Hykon",
      tagline: "Powering the Nation",
      slug: "/",
      logoUrl: "/images/brand-logo.svg",
      logoWhiteUrl: "/images/brand-logo-white.svg",
      description:
        "Hykon India Has Successfully Evolved Its Expertise From Power Electronics Into A Leader In Sustainable Energy.",
      websiteUrl: "https://hykon.in/",
      countryOfOrigin: "India",
      establishedYear: "2025",
      phone: "+91 123 456 7890",
      email: "info@company.com",
      seoTitle: "Hykon - Powering the Nation",
      seoDescription:
        "Hykon India Has Successfully Evolved Its Expertise From Power Electronics Into A Leader In Sustainable Energy.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    navigationData: [
      {
        id: 1,
        hasSubmenu: false,
        name: "About",
        slug: "/about",
      },
      {
        id: 2,
        hasSubmenu: true,
        name: "Products",
        slug: "/products",
        submenu: [
          {
            id: "2-1",
            name: "Solar Water Heater",
            slug: "/products/solar-water-heater",
          },
          {
            id: "2-2",
            name: "SST",
            slug: "/products/sst",
          },
          {
            id: "2-3",
            name: "Inverter Battery",
            slug: "/products/inverter-battery",
          },
          {
            id: "2-4",
            name: "Lithium Battery",
            slug: "/products/lithium-battery",
          },
          {
            id: "2-5",
            name: "Electric Vehicle",
            slug: "/products/electric-vehicle",
          },
          {
            id: "2-6",
            name: "E-Generator",
            slug: "/products/e-generator",
          },
          {
            id: "2-7",
            name: "BESS",
            slug: "/products/bess",
          },
          {
            id: "2-8",
            name: "UPS",
            slug: "/products/ups",
          },
          {
            id: "2-9",
            name: "Solar Systems",
            slug: "/products/solar-systems",
          },
          {
            id: "2-10",
            name: "Heat Pump",
            slug: "/products/heat-pump",
          },
        ],
      },
      {
        id: 3,
        hasSubmenu: true,
        name: "Projects",
        slug: "/projects",
      },
      {
        id: 4,
        hasSubmenu: false,
        name: "News",
        slug: "/news",
      },
      {
        id: 5,
        hasSubmenu: false,
        name: "Blogs",
        slug: "/blogs",
      },
      {
        id: 6,
        hasSubmenu: false,
        name: "Career",
        slug: "/career",
      },
      {
        id: 7,
        hasSubmenu: false,
        name: "Hykonnect",
        slug: "/hykonnect",
      },
      {
        id: 8,
        hasSubmenu: false,
        name: "FAQ",
        slug: "/faq",
      },
      {
        id: 9,
        hasSubmenu: true,
        name: "Customer Care",
        slug: "/customer-care",
        submenu: [
          {
            id: "9-1",
            name: "Warranty Registration",
            slug: "/customer-care/warranty-registration",
          },
          {
            id: "9-2",
            name: "Register Complaints",
            slug: "/customer-care/register-complaints",
          },
          {
            id: "9-3",
            name: "Privacy Policy",
            slug: "/customer-care/privacy-policy",
          },
          {
            id: "9-4",
            name: "Terms & Conditions",
            slug: "/customer-care/terms-conditions",
          },
          {
            id: "9-5",
            name: "Return Policy",
            slug: "/customer-care/return-policy",
          },
          {
            id: "9-6",
            name: "Shipping Policy",
            slug: "/customer-care/shipping-policy",
          },
          {
            id: "9-7",
            name: "Investor Relations",
            slug: "/customer-care/investor-relations",
          },
        ],
      },
    ],
    footerData: {
      id: "uuid-primary-key",
      name: "Hykon",
      tagline: "Powering the Nation",
      slug: "/",
      logoUrl: "/images/brand-logo.svg",
      logoWhiteUrl: "/images/brand-logo-white.svg",
      description:
        "Hykon India Has Successfully Evolved Its Expertise From Power Electronics Into A Leader In Sustainable Energy.",
      websiteUrl: "https://hykon.in/",
      phone: ["+91 123 456 7890"],
      email: ["info@company.com"],
      locationMapLink: "https://goo.gl/maps/example",
      quickLinks: {
        title: "Quick Links",
        items: [
          {
            id: 1,
            label: "Warranty Registration",
            slug: "/customer-care/warranty-registration",
          },
          {
            id: 2,
            label: "Register Complaints",
            slug: "/customer-care/register-complaints",
          },
          {
            id: 3,
            label: "Privacy Policy",
            slug: "/customer-care/privacy-policy",
          },
          {
            id: 4,
            label: "Terms & Conditions",
            slug: "/customer-care/terms-conditions",
          },
          {
            id: 5,
            label: "Return Policy",
            slug: "/customer-care/return-policy",
          },
          {
            id: 6,
            label: "Shipping Policy",
            slug: "/customer-care/shipping-policy",
          },
          {
            id: 7,
            label: "Investor Relations",
            slug: "/customer-care/investor-relations",
          },
          {
            id: 8,
            label: "Factory",
            slug: "/factory",
          },
          {
            id: 9,
            label: "Career",
            slug: "/career",
          },
          {
            id: 10,
            label: "Services",
            slug: "/services",
          },
          {
            id: 11,
            label: "Projects",
            slug: "/projects",
          },
          {
            id: 12,
            label: "News",
            slug: "/news",
          },
          {
            id: 13,
            label: "Contact",
            slug: "/contact",
          },
        ],
      },
      productCategories: {
        title: "Product Categories",
        items: [
          {
            id: "01",
            label: "Solar Water Heater",
            slug: "/products/solar-water-heater",
          },
          {
            id: "02",
            label: "SST",
            slug: "/products/sst",
          },
          {
            id: "03",
            label: "Inverter Battery",
            slug: "/products/inverter-battery",
          },
          {
            id: "04",
            label: "Lithium Battery",
            slug: "/products/lithium-battery",
          },
          {
            id: "05",
            label: "Electric Vehicle",
            slug: "/products/electric-vehicle",
          },
          {
            id: "06",
            label: "E-Generator",
            slug: "/products/e-generator",
          },
          {
            id: "07",
            label: "BESS",
            slug: "/products/bess",
          },
          {
            id: "08",
            label: "UPS",
            slug: "/products/ups",
          },
          {
            id: "09",
            label: "Solar Systems",
            slug: "/products/solar-systems",
          },
          {
            id: "10",
            label: "Heat Pump",
            slug: "/products/heat-pump",
          },
        ],
      },
      manufacturingLocations: {
        title: "Manufacturing Locations",
        items: [
          {
            id: 1,
            city: "Thrissur",
            email: "info@company.com",
          },
          {
            id: 2,
            city: "Coimbatore",
            email: "info@company.com",
          },
          {
            id: 3,
            city: "Kochi",
            email: "info@company.com",
          },
          {
            id: 4,
            city: "Pune",
            email: "info@company.com",
          },
        ],
      },
      contactInfo: {
        title: "Contact",
        phone: "+91 123 456 7890",
        email: "info@company.com",
      },
      copyright: "<p>© 2025 Hykon. All Rights Reserved.</p>",
      designedBy: "Designed & Developed by: Intersmart",
    },
    socialLinkData: [
      {
        id: 1,
        name: "facebook",
        link: "https://www.facebook.com/",
        icon: "/images/social-1.svg",
      },
      {
        id: 2,
        name: "youtube",
        link: "https://www.youtube.com/",
        icon: "/images/social-2.svg",
      },
      {
        id: 3,
        name: "instagram",
        link: "https://www.instagram.com/",
        icon: "/images/social-3.svg",
      },
      {
        id: 4,
        name: "linkedin",
        link: "https://www.linkedin.com/",
        icon: "/images/social-4.svg",
      },
      {
        id: 5,
        name: "twitter",
        link: "https://www.twitter.com/",
        icon: "/images/social-5.svg",
      },
    ],
    questionsSection: {
      media: {
        path: "/images/home-questions-1.png",
        alt: "home-questions-1",
      },
      title: "Have Any Questions?",
      description:
        "Get in touch with our team for product details, support, or expert assistance.",
      button: {
        label: "Get In Touch",
        link: "/contact",
      },
    },
    mobile_menu_data: {
      locations: [
        {
          id: "01",
          city: "Kochi",
        },
        {
          id: "02",
          city: "Pune",
        },
        {
          id: "03",
          city: "Thrissur",
        },
        {
          id: "04",
          city: "Coimbatore",
        },
      ],
      contact_info: {
        phone: "+91 123 456 7890",
        email: "info@company.com",
      },
    },
    seo_data: {
      siteName: "Hykon",
      siteUrl: "https://hykon.in/",
      defaultTitle: "Hykon - Powering the Nation",
      defaultDescription:
        "Hykon India Has Successfully Evolved Its Expertise From Power Electronics Into A Leader In Sustainable Energy.",
      defaultKeywords: [
        "solar energy",
        "lithium battery",
        "electric vehicle",
        "sustainable energy",
        "power electronics",
        "heat pump",
        "solar water heater",
        "inverter battery",
      ],
      ogImage: "/images/og-image.jpg",
      twitterHandle: "@hykon",
      locale: "en_IN",
      type: "website",
    },
  };

  return NextResponse.json(
    {
      success: true,
      message: "Global data fetched successfully",
      data: globalData,
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
