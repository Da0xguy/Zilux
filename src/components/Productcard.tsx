import type { Product } from "../types/Index";

interface ProductCardProps {
  product: Product;
  onOrder?: () => void;
}

export default function ProductCard({ product, onOrder }: ProductCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">
      <div className="relative h-64 overflow-hidden bg-gray-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
          ₦{product.price.toFixed(2)}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-yellow-500 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-400 mb-4">Color: {product.color}</p>

        {onOrder && (
          <button
            onClick={onOrder}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all"
          >
            Order Now
          </button>
        )}
      </div>
    </div>
  );
}