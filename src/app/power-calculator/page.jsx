import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import PowerCalculation from "@/components/blocks/power-calculator/power-calculation";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  } = await getMetaData("power-calculator");
  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  };
}


export default async function PowerCalculatorPage() {
  let pageData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/power-calculator`, {
      revalidate: 60,
    });

    if (res.ok) {
      const response = await res.json();
      pageData = response.data;
    }
  } catch (error) {
    console.error("Error fetching about data:", error);
  }

  if (!pageData) {
    notFound();
  }

  const { formSections, appliances } = pageData;

  return (
    <div className="w-full bg-[#202020] pt-(--header-y-sm) lg:pt-(--header-y-lg) 2xl:pt-(--header-y-2xl) 3xl:pt-(--header-y-3xl)">
      <BreadcrumbInfo slug="Power Calculator" />
      <PowerCalculation data={formSections} appliances={appliances} />
    </div>
  );
}
