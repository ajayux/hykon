import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import { ProductListingSkeleton } from "@/components/blocks/products/product-listing";

const heroData = {
  title: null,
  media: {
    type: "image",
    mobilePath: "/images/products-hero-1.jpg",
    desktopPath: "/images/products-hero-1.jpg",
    alt: "Products",
  },
};

export default function ProductsLoading() {
  return (
    <>
      <InnerHero data={heroData} />
      <BreadcrumbInfo slug="Product Category/Solar Water Heater/ Jupiter Series" />
      <ProductListingSkeleton />
    </>
  );
}
