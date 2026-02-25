import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/about`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch about data: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data.data || data, // Handle different API response structures if necessary
    });
  } catch (error) {
    console.error("API Error (About):", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch about data" },
      { status: 500 },
    );
  }
}
