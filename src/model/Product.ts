import mongoose, { Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  color: string;
  price: number;
  image: string;
}

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);