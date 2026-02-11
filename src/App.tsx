"use client";

import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProductGrid from "./components/Productgrid";
import AdminForm from "./Admin/Adminform";
import type { Product } from "./types/Index";
import Footer from "./components/Footer";

export default function HomePageApp() {
  const [currentPage, setCurrentPage] = useState<"home" | "products" | "admin">(
    "home"
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const defaultProducts: Product[] = [
      {
        id: "1",
        name: "Premium Gold Runner",
        color: "Gold/White",
        price: 189.99,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      },
      {
        id: "2",
        name: "Urban Ash Elite",
        color: "Ash Grey",
        price: 159.99,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      },
      {
        id: "3",
        name: "Luxe Gold Sport",
        color: "Metallic Gold",
        price: 219.99,
        image:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
      }
    ];

    setProducts(defaultProducts);
  }, []);

  const handleOrderNow = (product: Product) => {
    alert(
      `Order placed for ${product.name}!\nColor: ${product.color}\nPrice: $${product.price.toFixed(
        2
      )}`
    );
  };

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
    alert("Product added successfully!");
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "home" && (
        <Hero
          products={products}
          onOrder={handleOrderNow}
          onExplore={() => setCurrentPage("products")}
        />
      )}

      {currentPage === "products" && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Our Collection
              </span>
            </h1>

            <ProductGrid products={products} onOrder={handleOrderNow} />
          </div>
        </div>
      )}

      {currentPage === "admin" && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <AdminForm onAdd={handleAddProduct} />

            <div>
              <h2 className="text-3xl font-bold text-yellow-500 mb-6">
                Current Products ({products.length})
              </h2>

              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-yellow-500/20 flex items-center space-x-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-yellow-500">
                        {product.name}
                      </h3>
                      <p className="text-gray-400">
                        Color: {product.color}
                      </p>
                    </div>

                    <div className="text-2xl font-bold text-yellow-500">
                      ${product.price.toFixed(2)}
                    </div>

                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-3 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}