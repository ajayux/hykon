import { NextResponse } from "next/server";

/**
 * GET /api/home
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";
  const homeData = {
    hero_section: {
      main_image: {
        type: "video",
        mobile_path: "/images/home-hero-1.mp4",
        desktop_path: "/images/home-hero-1.mp4",
        alt: "Modern Smart Building",
      },
      contact_info: {
        title: "For Assistance Contact",
        phone: "+91 8907 414 081",
      },
    },

    categories_section: [
      {
        id: 1,
        icon_path: "/images/product-cat-1.svg",
        name: "Solar Water Heater",
        slug: "/solar-water-heater",
      },
      {
        id: 2,
        icon_path: "/images/product-cat-2.svg",
        name: "SST",
        slug: "/sst",
      },
      {
        id: 3,
        icon_path: "/images/product-cat-3.svg",
        name: "Inverter Battery",
        slug: "security",
      },
      {
        id: 4,
        icon_path: "/images/product-cat-4.svg",
        name: "Lithium Battery",
        slug: "/climate",
      },
      {
        id: 5,
        icon_path: "/images/product-cat-5.svg",
        name: "Electric Vehicle",
        slug: "/electric-vehicle",
      },
      {
        id: 6,
        icon_path: "/images/product-cat-6.svg",
        name: "E-Generator",
        slug: "/e-generator",
      },
      {
        id: 7,
        icon_path: "/images/product-cat-7.svg",
        name: "BESS",
        slug: "/bess",
      },
      {
        id: 8,
        icon_path: "/images/product-cat-8.svg",
        name: "UPS",
        slug: "/ups",
      },
      {
        id: 9,
        icon_path: "/images/product-cat-9.svg",
        name: "Solar Systems",
        slug: "/solar-systems",
      },
      {
        id: 10,
        icon_path: "/images/product-cat-10.svg",
        name: "Heat Pump",
        slug: "/heat-pump",
      },
    ],

    about_section: {
      sub_title: "Welcome to",
      title: "India's Leader in Power Electronics & Green Energy",
      description:
        "For over three decades since 1991, Hykon India has successfully evolved its expertise from power electronics into a leader in sustainable energy. Our core focus now includes complete solar energy solutions and cutting-edge Lithium-ion battery manufacturing. As a top-ranked Indian manufacturer, we ensure reliable, high-quality power for consumers and industries across the nation.",
      button: {
        label: "Read More",
        link: "/about",
      },
      chairman: {
        title: "Christo George",
        description: "Chairman & Managing Director, Hykon India Ltd",
        media: {
          type: "image",
          alt: "HYKON Graphic",
          path: "/images/home-about-1.jpg",
        },
      },
      achievement: {
        title: "Achievements",
        items: [
          {
            id: 1,
            media: {
              type: "image",
              path: "/images/achievements-1.png",
              alt: "achievements-1",
            },
          },
          {
            id: 2,
            media: {
              type: "image",
              path: "/images/achievements-2.png",
              alt: "achievements-2",
            },
          },
          {
            id: 3,
            media: {
              type: "image",
              path: "/images/achievements-3.png",
              alt: "achievements-3",
            },
          },
          {
            id: 4,
            media: {
              type: "image",
              path: "/images/achievements-4.png",
              alt: "achievements-4",
            },
          },
        ],
      },
      statistics: [
        {
          number: "1991",
          suffix: null,
          label: "Start Up",
        },
        {
          number: "450",
          suffix: "+",
          label: "Employees",
        },
        {
          number: "5",
          suffix: "+",
          label: "Companies",
        },
        {
          number: "100",
          suffix: "+",
          label: "Crore Turnover",
        },
      ],
    },

    business_section: {
      sub_title: "Business Units",
      title: "Manufacturing Excellence in India",
      button: {
        label: "View Details",
        link: "/services",
      },
      items: [
        {
          id: 1,
          title: "EV and Lithium Battery Factory",
          slug: "/ev-and-lithium-battery-factory",
          media: {
            path: "/images/address-loc-1.jpg",
            alt: "address-loc-1",
          },
          button: {
            label: "View Details",
            link: "/ev-and-lithium-battery-factory",
          },
        },
        {
          id: 2,
          title: "EV and Lithium Battery Factory",
          slug: "/ev-and-lithium-battery-factory",
          media: {
            path: "/images/address-loc-1.jpg",
            alt: "address-loc-1",
          },
          button: {
            label: "View Details",
            link: "/ev-and-lithium-battery-factory",
          },
        },
        {
          id: 3,
          title: "EV and Lithium Battery Factory",
          slug: "/ev-and-lithium-battery-factory",
          media: {
            path: "/images/address-loc-1.jpg",
            alt: "address-loc-1",
          },
          button: {
            label: "View Details",
            link: "/ev-and-lithium-battery-factory",
          },
        },
        {
          id: 4,
          title: "EV and Lithium Battery Factory",
          slug: "/ev-and-lithium-battery-factory",
          media: {
            path: "/images/address-loc-1.jpg",
            alt: "address-loc-1",
          },
          button: {
            label: "View Details",
            link: "/ev-and-lithium-battery-factory",
          },
        },
      ],
    },

    products_section: {
      title: "Categories",
      corporate_items: {
        title: "Corporate",
        items: [
          {
            id: 1,
            title: "Solar Light",
            description:
              "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-1.png",
                  alt: "pro-1",
                },
                title: "Flash torch light",
                slug: "flash-torch-light",
                description:
                  "Hykon Solar flash torch light is a torch that can be charged using solar power",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-2.png",
                  alt: "pro-2",
                },
                title: "Wallite series",
                slug: "wallite-series",
                description:
                  "Hykon wallite series solar light is meant for lighting walls in pathway or stairs.",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-3.png",
                  alt: "pro-3",
                },
                title: "Aurora series",
                slug: "aurora-series",
                description:
                  "Hykon Aurora series is of solar lantern lights that can lit up your....",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-4.png",
                  alt: "pro-4",
                },
                title: "Billite series",
                slug: "billite-series",
                description:
                  "Hykon Billite series solar light is solar hoarding light with inbuilt lithium...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-5.png",
                  alt: "pro-5",
                },
                title: "Solo R series",
                slug: "solo-r-series",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-6.png",
                  alt: "pro-6",
                },
                title: "Solo R series",
                slug: "solo-r-series-2",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
            ],
          },
          {
            id: 2,
            title: "Solar power packs",
            description:
              "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-1.png",
                  alt: "pro-1",
                },
                title: "Flash torch light",
                slug: "flash-torch-light",
                description:
                  "Hykon Solar flash torch light is a torch that can be charged using solar power",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-2.png",
                  alt: "pro-2",
                },
                title: "Wallite series",
                slug: "wallite-series",
                description:
                  "Hykon wallite series solar light is meant for lighting walls in pathway or stairs.",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-3.png",
                  alt: "pro-3",
                },
                title: "Aurora series",
                slug: "aurora-series",
                description:
                  "Hykon Aurora series is of solar lantern lights that can lit up your....",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-4.png",
                  alt: "pro-4",
                },
                title: "Billite series",
                slug: "billite-series",
                description:
                  "Hykon Billite series solar light is solar hoarding light with inbuilt lithium...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-5.png",
                  alt: "pro-5",
                },
                title: "Solo R series",
                slug: "solo-r-series",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-6.png",
                  alt: "pro-6",
                },
                title: "Solo R series",
                slug: "solo-r-series-2",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
            ],
          },
          {
            id: 3,
            title: "Lithium Battery",
            description:
              "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-1.png",
                  alt: "pro-1",
                },
                title: "Flash torch light",
                slug: "flash-torch-light",
                description:
                  "Hykon Solar flash torch light is a torch that can be charged using solar power",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-2.png",
                  alt: "pro-2",
                },
                title: "Wallite series",
                slug: "wallite-series",
                description:
                  "Hykon wallite series solar light is meant for lighting walls in pathway or stairs.",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-3.png",
                  alt: "pro-3",
                },
                title: "Aurora series",
                slug: "aurora-series",
                description:
                  "Hykon Aurora series is of solar lantern lights that can lit up your....",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-4.png",
                  alt: "pro-4",
                },
                title: "Billite series",
                slug: "billite-series",
                description:
                  "Hykon Billite series solar light is solar hoarding light with inbuilt lithium...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-5.png",
                  alt: "pro-5",
                },
                title: "Solo R series",
                slug: "solo-r-series",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-6.png",
                  alt: "pro-6",
                },
                title: "Solo R series",
                slug: "solo-r-series-2",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
            ],
          },
          {
            id: 4,
            title: "Electric Vehicle",
            description:
              "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-1.png",
                  alt: "pro-1",
                },
                title: "Flash torch light",
                slug: "flash-torch-light",
                description:
                  "Hykon Solar flash torch light is a torch that can be charged using solar power",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-2.png",
                  alt: "pro-2",
                },
                title: "Wallite series",
                slug: "wallite-series",
                description:
                  "Hykon wallite series solar light is meant for lighting walls in pathway or stairs.",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-3.png",
                  alt: "pro-3",
                },
                title: "Aurora series",
                slug: "aurora-series",
                description:
                  "Hykon Aurora series is of solar lantern lights that can lit up your....",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-4.png",
                  alt: "pro-4",
                },
                title: "Billite series",
                slug: "billite-series",
                description:
                  "Hykon Billite series solar light is solar hoarding light with inbuilt lithium...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-5.png",
                  alt: "pro-5",
                },
                title: "Solo R series",
                slug: "solo-r-series",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-6.png",
                  alt: "pro-6",
                },
                title: "Solo R series",
                slug: "solo-r-series-2",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
            ],
          },
          {
            id: 5,
            title: "Heat Pump",
            description:
              "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-1.png",
                  alt: "pro-1",
                },
                title: "Flash torch light",
                slug: "flash-torch-light",
                description:
                  "Hykon Solar flash torch light is a torch that can be charged using solar power",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-2.png",
                  alt: "pro-2",
                },
                title: "Wallite series",
                slug: "wallite-series",
                description:
                  "Hykon wallite series solar light is meant for lighting walls in pathway or stairs.",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-3.png",
                  alt: "pro-3",
                },
                title: "Aurora series",
                slug: "aurora-series",
                description:
                  "Hykon Aurora series is of solar lantern lights that can lit up your....",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-4.png",
                  alt: "pro-4",
                },
                title: "Billite series",
                slug: "billite-series",
                description:
                  "Hykon Billite series solar light is solar hoarding light with inbuilt lithium...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-5.png",
                  alt: "pro-5",
                },
                title: "Solo R series",
                slug: "solo-r-series",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-6.png",
                  alt: "pro-6",
                },
                title: "Solo R series",
                slug: "solo-r-series-2",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
            ],
          },
          {
            id: 6,
            title: "E-Generator",
            description:
              "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-1.png",
                  alt: "pro-1",
                },
                title: "Flash torch light",
                slug: "flash-torch-light",
                description:
                  "Hykon Solar flash torch light is a torch that can be charged using solar power",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-2.png",
                  alt: "pro-2",
                },
                title: "Wallite series",
                slug: "wallite-series",
                description:
                  "Hykon wallite series solar light is meant for lighting walls in pathway or stairs.",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-3.png",
                  alt: "pro-3",
                },
                title: "Aurora series",
                slug: "aurora-series",
                description:
                  "Hykon Aurora series is of solar lantern lights that can lit up your....",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-4.png",
                  alt: "pro-4",
                },
                title: "Billite series",
                slug: "billite-series",
                description:
                  "Hykon Billite series solar light is solar hoarding light with inbuilt lithium...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-5.png",
                  alt: "pro-5",
                },
                title: "Solo R series",
                slug: "solo-r-series",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-6.png",
                  alt: "pro-6",
                },
                title: "Solo R series",
                slug: "solo-r-series-2",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
            ],
          },
          {
            id: 7,
            title: "BESS",
            description:
              "HykonIndia is a brand synonymous with high-quality electrical products, We brought in a range of solar-powered lighting solutions. HykonIndia provides the Best Solar light to provide the best lighting for various purposes.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-1.png",
                  alt: "pro-1",
                },
                title: "Flash torch light",
                description:
                  "Hykon Solar flash torch light is a torch that can be charged using solar power",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-2.png",
                  alt: "pro-2",
                },
                title: "Wallite series",
                description:
                  "Hykon wallite series solar light is meant for lighting walls in pathway or stairs.",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-3.png",
                  alt: "pro-3",
                },
                title: "Aurora series",
                description:
                  "Hykon Aurora series is of solar lantern lights that can lit up your....",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-4.png",
                  alt: "pro-4",
                },
                title: "Billite series",
                description:
                  "Hykon Billite series solar light is solar hoarding light with inbuilt lithium...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-5.png",
                  alt: "pro-5",
                },
                title: "Solo R series",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-6.png",
                  alt: "pro-6",
                },
                title: "Solo R series",
                description:
                  "Hykon Solo R series is a solar street light which includes higher....",
              },
            ],
          },
        ],
      },
      domestic_items: {
        title: "Domestic",
        items: [
          {
            id: 1,
            title: "UPS & Inverters",
            description:
              "Hykon UPS is the best solution for power issues ensuring high-quality power for critical loads. Hykon provides Online UPS & Live Interactive Inverter India with a variety of products. A UPS can provide protection against power issues so that you don't have to worry about power outages. Expensive appliances need protection from power surges, spikes or dips, irregularities, and fluctuations in power which may have an adverse effect on your appliance.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-domestic-1.png",
                  alt: "pro-1",
                },
                title: "Halo Home UPS",
                description:
                  "Hykon Halo Inverter, with its inbuilt Lithium Ferro-Phosphate...",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-domestic-2.png",
                  alt: "pro-2",
                },
                title: "Power Inverter",
                description:
                  "Hykon power inverter is an advanced DSP based intelligent control ...",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-domestic-3.png",
                  alt: "pro-3",
                },
                title: "Online UPS",
                description:
                  "Hykon Online UPS supplies power irrespective of whether the mains...",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-domestic-4.png",
                  alt: "pro-4",
                },
                title: "Inline UPS",
                description:
                  "Green Inline UPS with advanced battery charging technology ensures...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-domestic-5.png",
                  alt: "pro-5",
                },
                title: "Line Interactive UPS",
                description:
                  "The line-interactive UPS from Hykon comes with a multi-tap variable...",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-domestic-6.png",
                  alt: "pro-6",
                },
                title: "Tubular Battery",
                description:
                  "Hykon Bedtype Batteries for inverter and UPS applications & Hykon Tall...",
              },
            ],
          },
          {
            id: 2,
            title: "E-Power Tools",
            description:
              "Hykon UPS is the best solution for power issues ensuring high-quality power for critical loads. Hykon provides Online UPS & Live Interactive Inverter India with a variety of products. A UPS can provide protection against power issues so that you don't have to worry about power outages. Expensive appliances need protection from power surges, spikes or dips, irregularities, and fluctuations in power which may have an adverse effect on your appliance.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-domestic-1.png",
                  alt: "pro-1",
                },
                title: "Halo Home UPS",
                description:
                  "Hykon Halo Inverter, with its inbuilt Lithium Ferro-Phosphate...",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-domestic-2.png",
                  alt: "pro-2",
                },
                title: "Power Inverter",
                description:
                  "Hykon power inverter is an advanced DSP based intelligent control ...",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-domestic-3.png",
                  alt: "pro-3",
                },
                title: "Online UPS",
                description:
                  "Hykon Online UPS supplies power irrespective of whether the mains...",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-domestic-4.png",
                  alt: "pro-4",
                },
                title: "Inline UPS",
                description:
                  "Green Inline UPS with advanced battery charging technology ensures...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-domestic-5.png",
                  alt: "pro-5",
                },
                title: "Line Interactive UPS",
                description:
                  "The line-interactive UPS from Hykon comes with a multi-tap variable...",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-domestic-6.png",
                  alt: "pro-6",
                },
                title: "Tubular Battery",
                description:
                  "Hykon Bedtype Batteries for inverter and UPS applications & Hykon Tall...",
              },
            ],
          },
          {
            id: 3,
            title: "Solar Water Heater",
            description:
              "Hykon UPS is the best solution for power issues ensuring high-quality power for critical loads. Hykon provides Online UPS & Live Interactive Inverter India with a variety of products. A UPS can provide protection against power issues so that you don't have to worry about power outages. Expensive appliances need protection from power surges, spikes or dips, irregularities, and fluctuations in power which may have an adverse effect on your appliance.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-domestic-1.png",
                  alt: "pro-1",
                },
                title: "Halo Home UPS",
                description:
                  "Hykon Halo Inverter, with its inbuilt Lithium Ferro-Phosphate...",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-domestic-2.png",
                  alt: "pro-2",
                },
                title: "Power Inverter",
                description:
                  "Hykon power inverter is an advanced DSP based intelligent control ...",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-domestic-3.png",
                  alt: "pro-3",
                },
                title: "Online UPS",
                description:
                  "Hykon Online UPS supplies power irrespective of whether the mains...",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-domestic-4.png",
                  alt: "pro-4",
                },
                title: "Inline UPS",
                description:
                  "Green Inline UPS with advanced battery charging technology ensures...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-domestic-5.png",
                  alt: "pro-5",
                },
                title: "Line Interactive UPS",
                description:
                  "The line-interactive UPS from Hykon comes with a multi-tap variable...",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-domestic-6.png",
                  alt: "pro-6",
                },
                title: "Tubular Battery",
                description:
                  "Hykon Bedtype Batteries for inverter and UPS applications & Hykon Tall...",
              },
            ],
          },
          {
            id: 4,
            title: "Solar Hybrid Inverter",
            description:
              "Hykon UPS is the best solution for power issues ensuring high-quality power for critical loads. Hykon provides Online UPS & Live Interactive Inverter India with a variety of products. A UPS can provide protection against power issues so that you don't have to worry about power outages. Expensive appliances need protection from power surges, spikes or dips, irregularities, and fluctuations in power which may have an adverse effect on your appliance.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-domestic-1.png",
                  alt: "pro-1",
                },
                title: "Halo Home UPS",
                description:
                  "Hykon Halo Inverter, with its inbuilt Lithium Ferro-Phosphate...",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-domestic-2.png",
                  alt: "pro-2",
                },
                title: "Power Inverter",
                description:
                  "Hykon power inverter is an advanced DSP based intelligent control ...",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-domestic-3.png",
                  alt: "pro-3",
                },
                title: "Online UPS",
                description:
                  "Hykon Online UPS supplies power irrespective of whether the mains...",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-domestic-4.png",
                  alt: "pro-4",
                },
                title: "Inline UPS",
                description:
                  "Green Inline UPS with advanced battery charging technology ensures...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-domestic-5.png",
                  alt: "pro-5",
                },
                title: "Line Interactive UPS",
                description:
                  "The line-interactive UPS from Hykon comes with a multi-tap variable...",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-domestic-6.png",
                  alt: "pro-6",
                },
                title: "Tubular Battery",
                description:
                  "Hykon Bedtype Batteries for inverter and UPS applications & Hykon Tall...",
              },
            ],
          },
          {
            id: 5,
            title: "Stainless steel water tank",
            description:
              "Hykon UPS is the best solution for power issues ensuring high-quality power for critical loads. Hykon provides Online UPS & Live Interactive Inverter India with a variety of products. A UPS can provide protection against power issues so that you don't have to worry about power outages. Expensive appliances need protection from power surges, spikes or dips, irregularities, and fluctuations in power which may have an adverse effect on your appliance.",
            products: [
              {
                id: 1,
                media: {
                  path: "/images/pro-domestic-1.png",
                  alt: "pro-1",
                },
                title: "Halo Home UPS",
                description:
                  "Hykon Halo Inverter, with its inbuilt Lithium Ferro-Phosphate...",
              },
              {
                id: 2,
                media: {
                  path: "/images/pro-domestic-2.png",
                  alt: "pro-2",
                },
                title: "Power Inverter",
                description:
                  "Hykon power inverter is an advanced DSP based intelligent control ...",
              },
              {
                id: 3,
                media: {
                  path: "/images/pro-domestic-3.png",
                  alt: "pro-3",
                },
                title: "Online UPS",
                description:
                  "Hykon Online UPS supplies power irrespective of whether the mains...",
              },
              {
                id: 4,
                media: {
                  path: "/images/pro-domestic-4.png",
                  alt: "pro-4",
                },
                title: "Inline UPS",
                description:
                  "Green Inline UPS with advanced battery charging technology ensures...",
              },
              {
                id: 5,
                media: {
                  path: "/images/pro-domestic-5.png",
                  alt: "pro-5",
                },
                title: "Line Interactive UPS",
                description:
                  "The line-interactive UPS from Hykon comes with a multi-tap variable...",
              },
              {
                id: 6,
                media: {
                  path: "/images/pro-domestic-6.png",
                  alt: "pro-6",
                },
                title: "Tubular Battery",
                description:
                  "Hykon Bedtype Batteries for inverter and UPS applications & Hykon Tall...",
              },
            ],
          },
        ],
      },
    },

    power_section: {
      media: {
        path: "/images/home-calculate-bg.png",
        alt: "home-calculate-bg",
      },
      title: "Find the Right Power Solution for Your Needs",
      description:
        "Calculate your exact power requirement in seconds and choose the perfect Hykon product with confidence.",
      button: {
        label: "Calculate My Power",
        link: "/services",
      },
    },

    vendor_section: {
      title: "Vendor Login",
      description: "Streamlined Access for All Vendor Operations",
      button: {
        label: "Become a Vendor",
        link: "/vendor-login",
      },
    },

    news_section: {
      title: "News",
      description:
        "Expert perspectives on sustainable energy, industry trends, and technical innovations",
      filterItems: ["Upcoming", "Featured", "Archives"],
      button: {
        label: "View All",
        link: "/news",
      },
      items: [
        {
          id: 1,
          media: {
            path: "/images/news-1.jpg",
            alt: "news-1",
          },
          slug: "/news/news-1",
          date: "2025-08-15",
          title: "Two E-Autos Gifted on Gandhi Jayanti!",
          description:
            "On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha",
        },
        {
          id: 2,
          media: {
            path: "/images/news-2.jpg",
            alt: "news-2",
          },
          slug: "/news/news-1",
          date: "2025-08-15",
          title: "Empowering a Greener Tomorrow!",
          description:
            "On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha",
        },
        {
          id: 3,
          media: {
            path: "/images/news-3.jpg",
            alt: "news-3",
          },
          slug: "/news/news-1",
          date: "2025-08-15",
          title: "Solar Division to Partner with State Government ..",
          description:
            "On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric ",
        },
        {
          id: 4,
          media: {
            path: "/images/news-1.jpg",
            alt: "news-1",
          },
          slug: "/news/news-1",
          date: "2025-08-15",
          title: "Two E-Autos Gifted on Gandhi Jayanti!",
          description:
            "On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha",
        },
        {
          id: 5,
          media: {
            path: "/images/news-2.jpg",
            alt: "news-2",
          },
          slug: "/news/news-1",
          date: "2025-08-15",
          title: "Empowering a Greener Tomorrow!",
          description:
            "On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric auto-rickshaws to the Gandhi Smaraka Grama Seva Kendram located in S L Puram, Alappuzha",
        },
        {
          id: 6,
          media: {
            path: "/images/news-3.jpg",
            alt: "news-3",
          },
          slug: "/news/news-1",
          date: "2025-08-15",
          title: "Solar Division to Partner with State Government ..",
          description:
            "On the auspicious occasion of Gandhi Jayanti, Hykon India Ltd. proudly donated 2 brand new electric ",
        },
      ],
    },

    promotions_section: [
      {
        id: 1,
        media: {
          type: "image",
          path: "/images/home-promotions-1.jpg",
          alt: "home-promotions-1",
        },
      },
    ],

    blogs_section: {
      title: "Blogs",
      button: {
        label: "View All",
        link: "/blogs",
      },
      items: [
        {
          id: 1,
          media: {
            path: "/images/blog-1.jpg",
            alt: "blog-1",
          },
          slug: "/blog/blog-1",
          title:
            "Still Using a Tubular Battery? Make the Switch to Lithium for Better Efficiency....",
        },
        {
          id: 2,
          media: {
            path: "/images/blog-2.jpg",
            alt: "blog-2",
          },
          slug: "/blog/blog-1",
          title:
            "EV vs Home Energy Storage: Different Applications of Lithium Technology",
        },
        {
          id: 3,
          media: {
            path: "/images/blog-3.jpg",
            alt: "blog-3",
          },
          slug: "/blog/blog-1",
          title:
            "Heat Pump vs Geyser: Which one saves you more in the long run?",
        },
        {
          id: 4,
          media: {
            path: "/images/blog-4.jpg",
            alt: "blog-4",
          },
          slug: "/blog/blog-1",
          title: "Two E-Autos Gifted on Gandhi Jayanti!",
        },
        {
          id: 5,
          media: {
            path: "/images/blog-5.jpg",
            alt: "blog-5",
          },
          slug: "/blog/blog-1",
          title: "Empowering a Greener Tomorrow!",
        },
      ],
    },

    questions_section: {
      media: {
        path: "/images/home-questions-1.jpg",
        alt: "home-questions-1",
      },
      title: "Have any questions?",
      description:
        "Get in touch with our team for product details, support, or expert assistance.",
      button: {
        label: "Get In Touch",
        link: "/contact",
      },
    },
  };

  return NextResponse.json(
    {
      success: true,
      message: "Home data fetched successfully",
      data: homeData,
    },
    { status: 200 },
  );
}
