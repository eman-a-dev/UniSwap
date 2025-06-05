import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const pricing = formData.get("pricing") as "free" | "paid";
    const price = formData.get("price") as string | null;
    const fullName = formData.get("fullName") as string | null;
    const phone = formData.get("phone") as string | null;
    const email = formData.get("email") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !category || !pricing || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Category mapping (matching your form options)
    const categoryMap: Record<string, number> = {
      books: 1,
      gadgets: 2,
      academic: 3,
      design: 4,
    };

    const category_id = categoryMap[category.toLowerCase()];

    if (!category_id) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Handle image (just path for now, saving file is TODO)
    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      imageUrl = `/uploads/${imageFile.name}`;
      // TODO: Save image buffer to disk or cloud storage
    }

    // Insert into database
    const [result] = await db.execute(
      `INSERT INTO items
      (title, description, category_id, full_name, phone, email, price_type, price, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, category_id, fullName, phone, email, pricing, price, imageUrl]
    );

    return NextResponse.json({ message: "Item posted successfully" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/auth/postitem error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
