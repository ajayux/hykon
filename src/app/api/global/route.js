import { NextResponse } from "next/server";

/**
 * GET /api/global
 */
export async function GET(request) {
  const globalData = {
    headerData: {
      name: "Hykon",
      slug: "/",
      logoUrl: "/images/brand-logo.svg",
      logoWhiteUrl: "/images/brand-logo-white.svg",
    },
    mobileMenuData: {
      locations: [
        {
          id: 1,
          city: "Kochi",
          slug: "/kochi",
        },
        {
          id: 2,
          city: "Pune",
          slug: "/pune",
        },
        {
          id: 3,
          city: "Thrissur",
          slug: "/thrissur",
        },
        {
          id: 4,
          city: "Coimbatore",
          slug: "/coimbatore",
        },
      ],
      phoneNumber: "+91 123 456 7890",
      email: "info@company.com",
    },
    navigationData: [
      {
        id: 1,
        hasSubmenu: false,
        name: "About",
        slug: "/about-us",
      },
      {
        id: 2,
        hasSubmenu: true,
        name: "Products",
        slug: "/category",
        submenu: [
          {
            id: "2-1",
            name: "Solar Water Heater",
            slug: "/category/solar-water-heater",
          },
          {
            id: "2-2",
            name: "SST",
            slug: "/category/sst",
          },
          {
            id: "2-3",
            name: "Inverter Battery",
            slug: "/category/inverter-battery",
          },
          {
            id: "2-4",
            name: "Lithium Battery",
            slug: "/category/lithium-battery",
          },
          {
            id: "2-5",
            name: "Electric Vehicle",
            slug: "/category/electric-vehicle",
          },
          {
            id: "2-6",
            name: "E-Generator",
            slug: "/category/e-generator",
          },
          {
            id: "2-7",
            name: "BESS",
            slug: "/category/bess",
          },
          {
            id: "2-8",
            name: "UPS",
            slug: "/category/ups",
          },
          {
            id: "2-9",
            name: "Solar Systems",
            slug: "/category/solar-systems",
          },
          {
            id: "2-10",
            name: "Heat Pump",
            slug: "/category/heat-pump",
          },
        ],
      },
      {
        id: 3,
        hasSubmenu: true,
        name: "Contact",
        slug: "/contact-us",
      },
      {
        id: 4,
        hasSubmenu: false,
        name: "News",
        slug: "/news-events",
      },
      {
        id: 5,
        hasSubmenu: false,
        name: "Blogs",
        slug: "/blog",
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
          {
            id: "9-8",
            name: "Categories",
            slug: "/category",
          },
        ],
      },
    ],
    footerData: {
      name: "Hykon",
      slug: "/",
      logoUrl: "/images/brand-logo.svg",
      description:
        "Hykon India Has Successfully Evolved Its Expertise From Power Electronics Into A Leader In Sustainable Energy.",
      quickLinks: {
        title: "Quick Links",
        items: [
          {
            id: 0,
            label: "About",
            slug: "/about-us",
          },
          {
            id: 1,
            label: "FAQ",
            slug: "/faq",
          },
          {
            id: 2,
            label: "Customer Care",
            slug: "/customer-care",
          },
          {
            id: 1,
            label: "Warranty Registration",
            slug: "/warranty",
          },
          {
            id: 3,
            label: "Hykonnect",
            slug: "/hykonnect",
          },
          {
            id: 4,
            label: "Terms & Conditions",
            slug: "/terms-and-conditions",
          },
          {
            id: 7,
            label: "Investor Relations",
            slug: "/investor-relations",
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
            id: 12,
            label: "News",
            slug: "/news-events",
          },
          {
            id: 13,
            label: "Contact",
            slug: "/contact-us",
          },
          {
            id: 14,
            label: "Power Calculator",
            slug: "/power-calculator",
          },
        ],
      },
      productCategories: {
        title: "Product Categories",
        items: [
          {
            id: 1,
            label: "Solar Light",
            slug: "/category/solar-light",
          },
          {
            id: 2,
            label: "Solar Water Heater",
            slug: "/category/solar-water-heater",
          },
          {
            id: 3,
            label: "Lithium Battery",
            slug: "/category/lithium-battery",
          },
          {
            id: 12,
            label: "Heat Pump",
            slug: "/category/heat-pumpheat-pump",
          },
          {
            id: 15,
            label: "UPS & Inverters",
            slug: "/category/ups-inverters",
          },
          {
            id: 17,
            label: "Stainless steel water tank",
            slug: "/category/stainless-steel-water-tank",
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
        link: "/contact-us",
      },
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
