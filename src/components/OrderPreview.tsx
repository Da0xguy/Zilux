"use client";

import { X } from "lucide-react";
import { useState } from "react";
import type { Product } from "../types/Index";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function OrderPreview({ product, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState("");
  const [address, setAddress] = useState("");

  if (!product) return null;

  const handleCheckout = async () => {
    const message = `\n🥿 *New Shoe Order – ZILUX*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n👟 Shoe Size: ${size}\n📍 Address: ${address}\n\n📦 *Product*\n• Name: ${product.name}\n• Price: ${product.price}\n• Image: ${product.imageUrl}\n`;

    const whatsappNumber = "234XXXXXXXXXX"; // your business number

    try {
      const res = await fetch("http://localhost:4000/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: whatsappNumber, message, imageUrl: product.imageUrl }),
      });

      if (res.ok) {
        alert("Order sent via WhatsApp!");
        onClose();
        return;
      }
      throw new Error("Server error");
    } catch (err) {
      // fallback to opening WhatsApp web if server unavailable
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex justify-center items-end md:items-center">
      <div className="w-full md:max-w-2xl bg-gradient-to-br from-gray-900 to-black rounded-t-3xl md:rounded-3xl p-6 shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-yellow-500">Order Preview</h3>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Product Preview */}
        <div className="flex gap-4 mb-6">
          <img
            src={product.imageUrl}
            className="w-28 h-28 rounded-xl object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-white">{product.name}</p>
            <p className="text-yellow-400">{product.price}</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid gap-4">
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
          />
          <input
            placeholder="Shoe Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input min-h-[80px]"
          />

          <button
            onClick={handleCheckout}
            className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold text-lg"
          >
            Checkout via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}