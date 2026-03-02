import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "upcoming";
  const page = searchParams.get("page") || 1;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    let apiUrl = `${baseUrl}/api/news?category=${category}&page=${page}`;

    if (category && category !== "upcoming") {
      apiUrl = `${baseUrl}/api/get-news-by-category?categorySlug=${category}&page=${page}`;
    }

    const res = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch news data" },
      { status: 500 },
    );
  }
}
