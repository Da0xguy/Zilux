"use client";

import { useState } from "react";
import ProductCard from "./Productcard";
import OrderPreview from "./OrderPreview";
import type { Product } from "../types/Index";

interface ProductGridProps {
  products: Product[];
  slice?: number; // optional preview
}

export default function ProductGrid({ products, slice }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const displayed = slice ? products.slice(0, slice) : products;

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayed.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOrder={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Order Preview Modal */}
      <OrderPreview
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}