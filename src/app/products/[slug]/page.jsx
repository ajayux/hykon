import InnerHero from "@/components/common/inner-hero";
import BreadcrumbInfo from "@/components/common/breadcrumb-info";
import CategoriesDetail from "@/components/blocks/categories/categories-detail";
import ProductDetail from "@/components/blocks/products/product-detail";
import ProductSimilar from "@/components/blocks/products/product-similar";
import ProductQuestions from "@/components/blocks/products/product-questions";
import { notFound } from "next/navigation";
import { parseOtherMeta } from "@/lib/helper";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/variant/${slug}`);

    if (!res.ok) return { title: "Product Not Found" };
    
    const response = await res.json();
    const data = response.data;
    if (!data) return { title: "Product Not Found" };
    
    const { meta_title, meta_description, meta_keywords, other_meta_tags } = data.metaTags || {};
    console.log("res : ", meta_title)
    const { other } = parseOtherMeta(other_meta_tags || "");
    const ogImage = data.product?.media?.path || "";

    return {
      title: meta_title || "Product",
      description: meta_description || "",
      keywords: meta_keywords || "",
      openGraph: {
        title: meta_title || "Product",
        description: meta_description || "",
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: data.product?.media?.alt || "" }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: meta_title || data.product?.title || "Product",
        description: meta_description || "",
        images: ogImage ? [ogImage] : [],
      },
      other: { ...other },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${slug}`,
      },
    };
  } catch {
    return { title: "Product Not Founds" };
  }
}


export default async function productDetailPage({ params }) {
  let productsData = null;
  const { slug } = await params;

  console.log(slug);

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/variant/${slug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      productsData = response.data;
    }
  } catch (error) {
    console.error("Error fetching categories data:", error);
  }

  if (!productsData || productsData?.length === 0) {
    notFound();
  }

  const {
    defaultColor,
    backgroundColor,
    foregroundColor,
    themeColor,
    heroSection,
    productDetailSection,
    similarProductSection,
    faqSection,
  } = productsData;

  const themeProps =
    defaultColor === true
      ? {
          defaultColor,
          backgroundColor,
          foregroundColor,
          themeColor,
        }
      : null;

  const grandParentPage = {
    label: "Product Category",
    link: "category",
  };

  const parentPage = {
    label: productDetailSection?.categoryTitle,
    link: `category/${productDetailSection?.categorySlug}`,
  };

  const page = {
    label: productDetailSection?.productTitle,
    link: `products?product_slug=${productDetailSection?.productSlug}`,
  };

  return (
    <>
      <InnerHero data={heroSection} themeProps={themeProps} />
      <BreadcrumbInfo
        variant="product-detail"
        grandParentPage={grandParentPage}
        parentPage={parentPage}
        page={page}
        slug={productDetailSection?.title}
        themeProps={themeProps}
      />
      {productDetailSection && (
        <ProductDetail data={productDetailSection} themeProps={themeProps} />
      )}
      {similarProductSection?.productItems?.length > 0 && (
        <ProductSimilar data={similarProductSection} themeProps={themeProps} />
      )}
      {faqSection?.faqItems?.length > 0 && (
        <ProductQuestions data={faqSection} themeProps={themeProps} />
      )}
    </>
  );
}
