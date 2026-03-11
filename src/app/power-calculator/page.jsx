import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import PowerCalculation from "@/components/blocks/power-calculator/power-calculation";

export const metadata = {
  title: "Power Calculator | HYKON",
  description: "",
};

const localData = {
  formSections: {
    title: "Power Calculator",
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
