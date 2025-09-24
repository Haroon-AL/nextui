import Image from "next/image";
import AddToCartClient from '../AddToCartClient'

import { Product } from "../ProductListClient";

export default async function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const { slug } = params;

  let product: Product | null = null;
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/${encodeURIComponent(slug)}`
    );
    if (res.status === 404) {
      return (
        <div className="container mx-auto p-8">Product not found: {slug}</div>
      );
    }
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const json = await res.json();
    product = json.product as Product;
  } catch (err) {
    console.error("Failed to load product from API:", err);
    return <div className="container mx-auto p-8">Failed to load product.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="space-y-4">
            {product.images && product.images.length > 0 ? (
              product.images.map((src, i) => (
                <div
                  key={i}
                  className="w-full h-64 relative bg-gray-100 rounded overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center">
                No image
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">Category: {product.category}</p>
          <p className="text-3xl font-semibold mt-4">
            ${product.price.toFixed(2)}
          </p>

          <div className="mt-6">
            <AddToCartClient product={product} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
