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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded border"
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full p-2 rounded border"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
        className="w-full p-2 rounded border"
      />
      <input type="file" id="image" accept="image/*" className="w-full" />

      <button
        type="submit"
        disabled={uploading}
        className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
      >
        {uploading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
}