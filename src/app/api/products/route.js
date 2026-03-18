import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api/constants";

/**
 * GET /api/products
 * Query params:
 *   category - maps to product_slug on the external API
 *   page     - page number for pagination
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const product_slug = searchParams.get("product_slug");
  const page = searchParams.get("page") || "1";

  try {
    const url = new URL(`${API_BASE_URL}/products`);
    if (product_slug) url.searchParams.set("product_slug", product_slug);
    url.searchParams.set("page", page);

    const res = await fetch(url.toString(), { next: { revalidate: 60 } });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch products" },
        { status: res.status }
      );
    }

    const json = await res.json();

    return NextResponse.json(
      { success: true, data: json.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
