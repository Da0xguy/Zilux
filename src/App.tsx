"use client";

import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProductGrid from "./components/Productgrid";
import AdminForm from "./Admin/Adminform";
import type { Product } from "./types/Index";
import Footer from "./components/Footer";

export default function HomePageApp() {
  const [currentPage, setCurrentPage] = useState<"home" | "products" | "admin">("home");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch products from backend when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle placing an order
  const handleOrderNow = (product: Product) => {
    alert(
      `Order placed for ${product.title}!\nColor: ${product.color}\nPrice: $${product.price.toFixed(2)}`
    );
  };

  // 🔹 Add product to MongoDB
  const handleAddProduct = async (product: Product) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to add product");

      const newProduct = await res.json(); // backend returns { status, product }
      setProducts((prev) => [newProduct.product, ...prev]);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // 🔹 Delete product from MongoDB
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "home" && (
        <Hero products={products} onOrder={handleOrderNow} onExplore={() => setCurrentPage("products")} />
      )}

      {currentPage === "products" && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
          <div className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Our Collection
              </span>
            </h1>

            {loading ? (
              <p className="text-center text-gray-400">Loading products...</p>
            ) : (
              <ProductGrid products={products} />
            )}
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
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-yellow-500">{product.title}</h3>
                      <p className="text-gray-400">{product.color}</p>
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