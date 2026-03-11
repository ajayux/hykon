import VendorFormInfo from "@/components/blocks/vendor-registration/vendor-form-info";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";

export const metadata = {
  title: "Vendor Registration | HYKON",
  description: "",
};

const localData = {
  formSections: {
    title: "Vendor Registration",
  },
  metaTag: {
    id: 12,
    meta_title: "Vendor Registration",
    meta_description: null,
    meta_keywords: null,
    other_meta_tags: null,
  },
};

export default async function VendorRegistrationPage() {
  const pageData = localData;
  const { formSections } = pageData;

  return (
    <div className="w-full bg-[#202020] pt-(--header-y-sm) lg:pt-(--header-y-lg) 2xl:pt-(--header-y-2xl) 3xl:pt-(--header-y-3xl)">
      <BreadcrumbInfo slug="Vendor Registration" />
      <VendorFormInfo data={formSections} />
    </div>
  );
}
