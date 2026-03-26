import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import WarrantyFormInfo from "@/components/blocks/warranty-complaints/warranty-form-info";

import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("warranty");
  return { title, description, keywords, twitter, openGraph, alternates, other };
}

const localData = {
  formSections: {
    title: "Warranty",
    filters: [
      {
        id: 1,
        title: "Warranty",
        slug: "warranty",
      },
      {
        id: 2,
        title: "Complaints",
        slug: "complaint",
      },
    ],
  },
  metaTag: {
    id: 12,
    meta_title: "Warranty",
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

export default async function WarrantyComplaintsPage() {
  const pageData = localData;
  const { formSections } = pageData;

  return (
    <div className="w-full bg-[#202020] pt-(--header-y-sm) lg:pt-(--header-y-lg) 2xl:pt-(--header-y-2xl) 3xl:pt-(--header-y-3xl)">
      <BreadcrumbInfo slug="Warranty & Complaints" />
      <WarrantyFormInfo data={formSections} />
    </div>
  );
}
