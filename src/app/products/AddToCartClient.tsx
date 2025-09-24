"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

type cartProduct = {
  id: number;
  name: string;
  price: number;
  sku: string;
  images?: string[];
};

export default function AddToCartClient({
  product,
}: Readonly<{ product: cartProduct }>) {
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { add } = useCartStore();

  function addToCart() {
    add(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
      },
      qty
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 500);
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center rounded">
        <button
          className="px-3 py-2 hover:bg-gray-100"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <div className="px-4 py-2 min-w-12 text-center">{qty}</div>
        <button
          className="px-3 py-2 hover:bg-gray-100"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div
        className={`inline-block ${
          isAdded ? "transition-all duration-200" : ""
        }`}
      >
        <button
          onClick={addToCart}
          className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-2 rounded font-medium px-2"
        >
          {isAdded ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
