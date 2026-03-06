import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "annual-report";
  const page = parseInt(searchParams.get("page") || "1");

  const allReports = [
    {
      title: "Annual Report 2023-2024",
      file: "https://beta.hykon.dev14.intersmarthosting.in/storage/64/dummy-(2).pdf",
      category: "annual-report",
    },
    {
      title: "Annual Report 2022-2023",
      file: "https://beta.hykon.dev14.intersmarthosting.in/storage/64/dummy-(2).pdf",
      category: "annual-report",
    },
    {
      title: "CSR Report 2024-2025",
      file: "https://beta.hykon.dev14.intersmarthosting.in/storage/66/dummy-(2).pdf",
      category: "csr-report",
    },
    {
      title: "CSR Report 2023-2024",
      file: "https://beta.hykon.dev14.intersmarthosting.in/storage/66/dummy-(2).pdf",
      category: "csr-report",
    },
  ];

  const filteredItems = allReports.filter((item) => item.category === category);

  const data = {
    heroSection: {
      title: "Innvestor Relations",
      media: {
        type: "image",
        mobilePath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/312/banner-mobile.webp",
        desktopPath:
          "https://beta.hykon.dev14.intersmarthosting.in/storage/311/banner.webp",
        alt: "Innvestor Relations",
      },
    },
    reportsSection: {
      title: category === "annual-report" ? "Annual Reports" : "CSR Reports",
      filters: [
        {
          id: 1,
          title: "Annual Report",
          slug: "annual-report",
        },
        {
          id: 2,
          title: "CSR Report",
          slug: "csr-report",
        },
      ],
      items: filteredItems,
      pagination: {
        current_page: page,
        last_page: 1,
        per_page: 12,
        total: filteredItems.length,
        has_more: false,
      },
    },
    metaTag: {
      id: 9,
      meta_title: "Innvestor Relations",
      meta_description: null,
      meta_keywords: null,
      other_meta_tags: null,
    },
  };

  return NextResponse.json(
    {
      success: true,
      message: "Reports data fetched successfully",
      data: data,
    },
    { status: 200 },
  );
}
