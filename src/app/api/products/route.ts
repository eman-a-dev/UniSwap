import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

// Required for accessing URL params in Edge or Node.js runtime
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    let query = "SELECT * FROM items";
    let params: any[] = [];

    if (category) {
      query += " WHERE category_id = ?";
      params.push(category);
    }

    const [rows]: any = await db.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
