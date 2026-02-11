import { NextResponse } from "next/server";
import connectDB from "../../lib/connectDB";
import { Product as ProductModel } from "../../model/Product"; // your Mongoose model

export async function GET() {
  await connectDB();

  const products = await ProductModel.find();

  const formatted = products.map((p) => ({
    id: p._id.toString(),       // Mongo ObjectId → string
    title: p.title,
    description: p.description || "",
    price: p.price,
    imageUrl: p.imageUrl,
  }));

  return NextResponse.json(formatted);
}