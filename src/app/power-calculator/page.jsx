import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import PowerCalculation from "@/components/blocks/power-calculator/power-calculation";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } =
    await getMetaData("power-calculator");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

const localData = {
  formSections: {
    title: "Power Calculator",
    calculatorTitle: "Your approximate power need is",
    calculatorDescription:
      "to find out the best products that match your needs",
    calculatorNote:
      "<p>*The consumption data derived are based on approximate calculations. Please contact our customer care for more details.</p>",
  },
  metaTag: {
    id: 12,
    meta_title: "Power Calculator",
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

export default async function PowerCalculatorPage() {
  const pageData = localData;
  const { formSections } = pageData;

  return (
    <div className="w-full bg-[#202020] pt-(--header-y-sm) lg:pt-(--header-y-lg) 2xl:pt-(--header-y-2xl) 3xl:pt-(--header-y-3xl)">
      <BreadcrumbInfo slug="Power Calculator" />
      <PowerCalculation data={formSections} />
    </div>
  );
}
