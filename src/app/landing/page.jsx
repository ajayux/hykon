import Landing from "@/components/landing/hero-section";

const localData = {
  heroSection: {
    title: null,
    media: {
      type: "image",
      mobilePath: "/images/landing-bnr-1.webp",
      desktopPath: "/images/landing-bnr-1.webp",
      alt: "banner",
    },
  },

  productSection: {
    filters: {
      title: "Category",
      categoryItems: [
        {
          id: 1,
          name: "Pressurised Turbo Series",
          slug: "pressurised-turbo-series",
        },
        {
          id: 2,
          name: "Jupiter Series",
          slug: "jupiter-series",
        },
        {
          id: 3,
          name: "Industrial Solar Thermal System",
          slug: "industrial-solar-thermal-system",
        },
        {
          id: 4,
          name: "Pluto Series",
          slug: "pluto-series",
        },
        {
          id: 5,
          name: "Moon Series",
          slug: "moon-series",
        },
        {
          id: 6,
          name: "Institutional Jumbo Series",
          slug: "institutional-jumbo-series",
        },
      ],
    },
    productInfo: {
      title: "Jupiter Series",
      slug: "jupiter-series",
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
      ],
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 8,
        total: 8,
        has_more: false,
      },
    },
  },
};

export default async function LandingPage() {
  // let landingData = null;
  // try {
  //     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  //     const res = await fetch(`${baseUrl}/api/landing`, {
  //       next: { revalidate: 60 },
  //     });

  //     if (res.ok) {
  //       const response = await res.json();
  //       landingData = response.data;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching landing data:", error);
  //   }
  //   if (!landingData) {
  //     notFound();
  //   }
  const landingData = localData;

  const { heroSection } = landingData;

  return (
    <>
      <Landing data={heroSection} />
    </>
  );
}
