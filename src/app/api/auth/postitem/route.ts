import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const pricing = formData.get("pricing") as "free" | "paid";
    const price = formData.get("price") as string | null;
    const listing_type = formData.get("listing_type") as string || "sell";
    const fullName = formData.get("fullName") as string | null;
    const phone = formData.get("phone") as string | null;
    const email = formData.get("email") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !category || !pricing || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

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

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = imageFile.name.split(".").pop();
      const filename = `${uuidv4()}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
      imageUrl = `/uploads/${filename}`;
    }

    await db.execute(
      `INSERT INTO items
        (title, description, category_id, full_name, phone, email, price_type, price, image_url, listing_type, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'available')`,
      [title, description, category_id, fullName, phone, email, pricing, price || null, imageUrl, listing_type]
    );

    return NextResponse.json({ message: "Item posted successfully" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/auth/postitem error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
