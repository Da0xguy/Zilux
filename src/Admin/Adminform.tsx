"use client";

import React, { useState } from "react";
import { useUploadThing } from "../utils/uploadthing";
import type { Product } from "../types/Index";


type AdminFormProps = {
  onAdd: (product: Product) => void;
};

export default function AdminForm({ onAdd }: AdminFormProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [uploading, setUploading] = useState(false);

  const { startUpload } = useUploadThing("productImage"); // matches your file router key

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !color || !price) {
      alert("Name, color, and price are required");
      return;
    }

    setUploading(true);

    try {
      // Start the upload (image must be selected in <input type="file" />)
      const files = (document.getElementById("image") as HTMLInputElement)?.files;

      if (!files || files.length === 0) {
        alert("Please select an image");
        setUploading(false);
        return;
      }

      const uploadedFiles = await startUpload([...files]);
      console.log("Uploaded files:", uploadedFiles);

      if (!uploadedFiles || uploadedFiles.length === 0) {
        alert("Image upload failed");
        setUploading(false);
        return;
      }

      const imageUrl = uploadedFiles[0].url;

      // Send product to backend
      onAdd({
        id: "", // backend will generate this
        title: name,
        color,
        price: Number(price),
        image: imageUrl,
      });

      // Reset form
      setName("");
      setColor("");
      setPrice("");
      (document.getElementById("image") as HTMLInputElement).value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-xl mx-auto space-y-6 bg-gradient-to-br py-32 from-gray-900 to-black p-8 rounded-3xl border border-white/10 shadow-2xl"
  >
    <h2 className="text-2xl font-bold text-yellow-500 mb-2">
      Add New Product
    </h2>

    {/* Product Name */}
    <div className="space-y-2">
      <label className="text-sm text-gray-400">Product Name</label>
      <input
        type="text"
        placeholder="e.g. Air Max Pro"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
      />
    </div>

    {/* Color */}
    <div className="space-y-2">
      <label className="text-sm text-gray-400">Color</label>
      <input
        type="text"
        placeholder="e.g. Black / White"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
      />
    </div>

    {/* Price */}
    <div className="space-y-2">
      <label className="text-sm text-gray-400">Price (₦)</label>
      <input
        type="number"
        placeholder="e.g. 45000"
        value={price}
        onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
      />
    </div>

    {/* Image Upload */}
    <div className="space-y-2">
      <label className="text-sm text-gray-400">Product Image</label>
      <input
        type="file"
        id="image"
        accept="image/*"
        className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 cursor-pointer text-gray-400"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={uploading}
      className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg disabled:opacity-60"
    >
      {uploading ? "Uploading..." : "Add Product"}
    </button>
  </form>
);
}