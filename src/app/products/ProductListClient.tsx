"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import AddToCartClient from "./AddToCartClient";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  images?: string[];
  sku: string;
}

export default function ProductListClient({
  products,
}: Readonly<{
  products: Product[];
}>) {
  const router = useRouter();

  const Redirect = async (product: Product) => {
    try {
      const response = await fetch(`/api/products/${product.sku}`);

      if (!response.ok) throw new Error("Failed to fetch product");

      router.push(`/products/${product.sku}`);
    } catch (error) {
      console.error(error);
    }
  };

  const [categories] = useState<string[]>([
    "all",
    "apparel",
    "stationery",
    "art",
    "bags",
    "accessories",
    "drinkware",
    "electronics",
    "home",
    "toys",
    "shoes",
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded p-2"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
        {filtered.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <div className="relative w-full h-48 mb-3">
              <Image
                onClick={() => Redirect(product)}
                src={product.images?.[0] ?? "/product.jpg"}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-base font-medium mb-1">{product.name}</h2>
            <h3 className="text-sm text-gray-500 capitalize mb-1">
              {product.category}
            </h3>
            <p className="text-lg font-bold mb-2">
              ${product.price.toFixed(2)}
            </p>
            <AddToCartClient product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
