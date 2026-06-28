import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const listing_type = searchParams.get("listing_type");
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");
  const q = searchParams.get("q");

  try {
    let query = "SELECT * FROM items WHERE 1=1";
    const params: any[] = [];

    if (category) {
      query += " AND category_id = ?";
      params.push(category);
    }

    if (listing_type) {
      query += " AND listing_type = ?";
      params.push(listing_type);
    }

    if (min_price) {
      query += " AND price >= ?";
      params.push(Number(min_price));
    }

    if (max_price) {
      query += " AND price <= ?";
      params.push(Number(max_price));
    }

    if (q) {
      query += " AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ?)";
      params.push(`%${q.toLowerCase()}%`, `%${q.toLowerCase()}%`);
    }

    query += " ORDER BY created_at DESC";

    const [rows]: any = await db.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
