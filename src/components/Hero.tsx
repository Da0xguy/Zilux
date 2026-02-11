import { ShoppingBag, Package } from "lucide-react";
import ProductGrid from "./Productgrid";
import type { Product } from "../types/Index";
import HeroImage from "../assets/hero.jpg";

interface HeroProps {
  products: Product[];
  onOrder: (product: Product) => void;
  onExplore: () => void; // 👈 ADD THIS
}

export default function Hero({ products, onOrder, onExplore }: HeroProps) {
  return (
    <section className="bg-gradient-to-br py-6 from-gray-900 via-gray-800 to-black">
      {/* ================= HERO ================= */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Mobile background image */}
        <div
          className="absolute inset-0 md:hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroImage})` }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  ZILUX
                </span>
              </h1>

              <p className="text-xl md:text-3xl text-gray-300 mb-3">
                Handmade Footwear
              </p>

              <p className="text-base md:text-xl text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Experience luxury in every step with our exclusive collection of
                artisan-crafted shoes
              </p>
            </div>

            {/* Desktop Image */}
            <div className="hidden md:flex justify-center">
              <img
                src={HeroImage}
                alt="ZILUX Footwear"
                className="w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <div className="py-24 px-6">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-10 rounded-2xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="text-black" size={36} />
            </div>
            <h3 className="text-3xl font-bold text-yellow-500 mb-4">
              Premium Quality
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Each pair is meticulously handcrafted using the finest materials,
              ensuring unparalleled comfort and timeless elegance.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-10 rounded-2xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mb-6">
              <Package className="text-black" size={36} />
            </div>
            <h3 className="text-3xl font-bold text-yellow-500 mb-4">
              Artisan Crafted
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our master craftsmen bring decades of expertise to create footwear
              that's not just worn, but treasured.
            </p>
          </div>
        </div>

        {/* ================= FEATURED PRODUCTS ================= */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Featured Collection
            </span>
          </h2>
          <p className="text-center text-gray-400 text-lg mb-12">
            Discover our handpicked selection
          </p>

          <ProductGrid products={products} onOrder={onOrder} slice={3} />
          <div className="mt-16 flex justify-center">
            <button
              onClick={onExplore}
              className="px-10 py-4 text-lg font-semibold rounded-full
                        bg-gradient-to-r from-yellow-500 to-yellow-600
                        text-black shadow-xl hover:shadow-yellow-500/40
                        hover:scale-105 transition-all"
            >
              Explore Full Collection →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}