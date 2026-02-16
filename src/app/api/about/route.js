import { NextResponse } from "next/server";

/**
 * GET /api/about
 */
export async function GET(request) {
  const aboutData = {
    hero_section: {
      media: {
        type: "image",
        path: "/images/about-hero.jpg",
        alt: "Solar Panel Field",
      },
      title: "About Us",
    },

    intro_section: {
      media: {
        path: "/images/about-intro.jpg",
        alt: "Hykon Products",
      },
      title: "Powering a Safer, Smarter Tomorrow",
      description:
        "<p>Hykon delivers reliable energy solutions built on innovation, quality, and decades of expertise.</p><p>For over three decades, Hykon has been a trusted name in power electronics and renewable energy. From inverters and solar systems to lithium batteries and EV solutions, we design products that empower homes, businesses, and industries with uninterrupted, sustainable power.</p>",
      stats: [
        {
          id: 1,
          value: "1991",
          suffix: "",
          label: "Start Up",
        },
        {
          id: 2,
          value: "450",
          suffix: "+",
          label: "Projects",
        },
      ],
    },

    mission_vision_values_section: {
      items: [
        {
          id: 1,
          icon: "/images/icon-mission.svg",
          title: "Mission",
          description:
            "To deliver cutting-edge, eco-friendly energy solutions that enhance quality of life while reducing environmental impact.",
        },
        {
          id: 2,
          icon: "/images/icon-vision.svg",
          title: "Vision",
          description:
            "To be a global leader in renewable energy, driving the transition to a sustainable future through innovation and excellence.",
        },
        {
          id: 3,
          icon: "/images/icon-values.svg",
          title: "Values",
          description:
            "Innovation, Sustainability, Customer-Centricity, Integrity, and Excellence in everything we do.",
        },
      ],
    },

    chairman_section: {
      media: {
        path: "/images/chairman.jpg",
        alt: "Chairman",
      },
      quote:
        "At Hykon, we don't just build products—we build a sustainable future. Our commitment to innovation and quality ensures that every solution we deliver makes a meaningful impact on the environment and the lives of our customers.",
      name: "GEORGE M.A",
      designation: "Chairman & Managing Director",
    },

    milestones_section: {
      title: "Milestones",
      items: [
        {
          id: 1,
          year: "1990",
          title: "Company Founded",
          description:
            "Started with a vision to revolutionize energy solutions",
        },
        {
          id: 2,
          year: "2010",
          title: "Expansion Phase",
          description: "Expanded operations across India",
        },
        {
          id: 3,
          year: "2020",
          title: "Innovation Milestone",
          description: "Launched advanced lithium battery technology",
        },
        {
          id: 4,
          year: "Today",
          title: "2500",
          subtitle: "Employees",
          description: "Growing team driving innovation forward",
        },
      ],
    },

    why_hykon_section: {
      title: "Why Hykon",
      description:
        "Choose Hykon for unmatched quality, innovation, and commitment to sustainability in every product we deliver.",
      items: [
        {
          id: 1,
          icon: "/images/icon-quality.svg",
          title: "Quality Assurance",
          description:
            "Every product undergoes rigorous testing to ensure superior performance and longevity.",
        },
        {
          id: 2,
          icon: "/images/icon-innovation.svg",
          title: "Cutting-Edge Innovation",
          description:
            "We leverage the latest technology to deliver state-of-the-art energy solutions.",
        },
        {
          id: 3,
          icon: "/images/icon-support.svg",
          title: "24/7 Customer Support",
          description:
            "Our dedicated team is always ready to assist you with any queries or concerns.",
        },
        {
          id: 4,
          icon: "/images/icon-warranty.svg",
          title: "Comprehensive Warranty",
          description:
            "We stand behind our products with industry-leading warranty coverage.",
        },
        {
          id: 5,
          icon: "/images/icon-eco.svg",
          title: "Eco-Friendly Solutions",
          description:
            "All our products are designed with environmental sustainability in mind.",
        },
        {
          id: 6,
          icon: "/images/icon-certified.svg",
          title: "Certified Excellence",
          description:
            "Our products meet international quality and safety standards.",
        },
      ],
    },

    manufacturing_section: {
      media: {
        path: "/images/manufacturing.jpg",
        alt: "Manufacturing Facility",
      },
      title: "Manufacturing & R&D",
      description:
        "Our state-of-the-art manufacturing facilities and dedicated R&D centers are equipped with cutting-edge technology and staffed by industry experts. We continuously invest in research and development to stay ahead of market trends and deliver innovative solutions that meet evolving customer needs.",
      features: [
        {
          id: 1,
          icon: "/images/icon-factory.svg",
          label: "4 Manufacturing Units",
        },
        {
          id: 2,
          icon: "/images/icon-rd.svg",
          label: "Advanced R&D Centers",
        },
        {
          id: 3,
          icon: "/images/icon-capacity.svg",
          label: "High Production Capacity",
        },
      ],
    },

    awards_section: {
      title: "Awards & Recognitions",
      description:
        "Our commitment to excellence has been recognized through numerous prestigious awards and certifications.",
      items: [
        {
          id: 1,
          media: {
            path: "/images/award-1.png",
            alt: "Award 1",
          },
          title: "Excellence Award 2023",
        },
        {
          id: 2,
          media: {
            path: "/images/award-2.png",
            alt: "Award 2",
          },
          title: "Innovation Award 2022",
        },
        {
          id: 3,
          media: {
            path: "/images/award-3.png",
            alt: "Award 3",
          },
          title: "Quality Excellence 2021",
        },
        {
          id: 4,
          media: {
            path: "/images/award-4.png",
            alt: "Award 4",
          },
          title: "Sustainability Award 2020",
        },
      ],
    },

    certifications_section: {
      title: "Certifications",
      description:
        "We maintain the highest standards through internationally recognized certifications.",
      items: [
        {
          id: 1,
          name: "ISO 9001:2015",
          description: "Quality Management System",
        },
        {
          id: 2,
          name: "ISO 14001:2015",
          description: "Environmental Management",
        },
        {
          id: 3,
          name: "OHSAS 18001",
          description: "Occupational Health & Safety",
        },
        {
          id: 4,
          name: "CE Certification",
          description: "European Conformity",
        },
      ],
    },

    presence_section: {
      media: {
        path: "/images/india-map.png",
        alt: "India Map",
      },
      title: "Presence Across India",
      description:
        "With manufacturing facilities and service centers strategically located across India, we ensure prompt delivery and support to our customers nationwide.",
      locations: [
        {
          id: 1,
          city: "Thrissur",
          state: "Kerala",
        },
        {
          id: 2,
          city: "Coimbatore",
          state: "Tamil Nadu",
        },
        {
          id: 3,
          city: "Kochi",
          state: "Kerala",
        },
        {
          id: 4,
          city: "Pune",
          state: "Maharashtra",
        },
      ],
    },
  };

  return NextResponse.json(
    {
      success: true,
      message: "About data fetched successfully",
      data: aboutData,
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
