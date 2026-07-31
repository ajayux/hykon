import { notFound } from "next/navigation";
import LandingClient from "../../../components/blocks/landing/LandingClient";

export default async function LandingPage({ params }) {
  const { slug } = await params;

  let landingData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/landing-page/${slug}`, {
      next: { revalidate: 0 },
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



  return <LandingClient data={landingData} slug={slug} />;
}
