import Landing from "@/components/landing/hero-section";

const data = {
  heroSection: {
    media: {
      type: "image",
      mobilePath: "/images/landing-bnr-1.webp",
      desktopPath: "/images/landing-bnr-1.webp",
      alt: "banner",
    },
  
},
}

export default async function LandingPage() {
  let landingData = null;
  try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/api/landing`, {
        next: { revalidate: 60 },
      });
  
      if (res.ok) {
        const response = await res.json();
        landingData = response.data;
      }
    } catch (error) {
      console.error("Error fetching landing data:", error);
    }
    if (!landingData) {
      notFound();
    }

  const { heroSection } =landingData;

  return(
    <>
        <Landing data={heroSection} />
    </>
); 
}