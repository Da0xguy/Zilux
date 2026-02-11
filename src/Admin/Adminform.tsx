import React, { useState, type FormEvent } from "react";
import type { Product } from "../types/Index";

interface AdminFormProps {
  onAdd: (product: Product) => void;
}

export default function AdminForm({ onAdd }: AdminFormProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      name,
      color,
      price: parseFloat(price),
      image: image || "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop"
    });
    setName(""); setColor(""); setPrice(""); setImage("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-yellow-500/20 shadow-lg">
      <h2 className="text-3xl font-bold text-yellow-500 mb-6">Add New Product</h2>

      <input type="text" placeholder="Product Name" className="input" value={name} onChange={e => setName(e.target.value)} required />
      <input type="text" placeholder="Color" className="input" value={color} onChange={e => setColor(e.target.value)} required />
      <input type="number" placeholder="Price" className="input" value={price} onChange={e => setPrice(e.target.value)} required />
      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
      {image && <img src={image} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-yellow-500/30" />}
      <button type="submit" className="btn-primary w-full">Add Product</button>
    </form>
  );
}