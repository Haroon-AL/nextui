"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import AddToCartClient from "./AddToCartClient";

export interface Price {
  value: number;
  currency: string;
}
export interface ProductE {
  id: number;
  price: Price;
  description: string;
  brand: string;
  name: string;
  url?: string;
  created_at?: Date;
  last_updated_at?: Date;
}

export interface Product extends ProductE {
  sku: string;
}

export interface Pagination {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_products: number;
  has_next: boolean;
  has_previous: boolean;
}

export default function ProductListClient({
  initialProducts,
  initialPagination,
}: Readonly<{
  initialProducts: Product[];
  initialPagination: Pagination;
}>) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const Redirect = (product: Product) => {
    router.push(`/products/${product.sku}`);
  };

  const brand = [
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
  ];

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.brand === selectedCategory);
    }
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerCaseQuery) ||
          (p.description || "").toLowerCase().includes(lowerCaseQuery) ||
          p.brand.toLowerCase().includes(lowerCaseQuery)
      );
    }

    return result;
  }, [products, selectedCategory, searchQuery]);

  async function fetchPage(page: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:8080/v1/products?pageNo=${page}`,
        { cache: "no-store" }
      );
      const data: { products: Product[]; pagination: Pagination } =
        await res.json();
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function goNext() {
    console.log("goNext clicked", pagination);
    const next = pagination.current_page + 1;
    if (!pagination.has_next || next >= pagination.total_pages) {
      console.log("no next");
      return;
    }
    fetchPage(next);
  }

  function goPrev() {
    const prev = pagination.current_page - 1;
    if (!pagination.has_previous || prev < 0) return;
    fetchPage(prev);
  }
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div>
          <label htmlFor="search" className="mr-2 font-semibold">
            Search:
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded p-2 w-64"
          />
        </div>

        <div>
          <label htmlFor="category-filter" className="mr-2 font-semibold">
            Filter by category:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded p-2"
          >
            {brand.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="text-center py-6">Loading products...</div>}
      {error && <div className="text-center text-red-600 py-6">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
        {filtered.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <div className="relative w-full h-48 mb-3">
              <Image
                onClick={() => Redirect(product)}
                src={product.url ?? "/product.jpg"}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-base font-medium mb-1">{product.name}</h2>
            <h3 className="text-sm text-gray-500 capitalize mb-1">
              {product.brand}
            </h3>
            <p className="text-lg font-bold mb-2">
              ${product.price.value.toFixed(2)}
            </p>
            <AddToCartClient product={product} />
          </div>
        ))}
      </div>
      <div className="mb-4 flex items-center justify-between m-2">
        <div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goPrev();
            }}
            disabled={!pagination.has_previous || loading}
            className="px-3 py-2 border rounded mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goNext();
            }}
            disabled={!pagination.has_next || loading}
            className="px-3 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Page {pagination.current_page + 1} of {pagination.total_pages} •{" "}
          {pagination.total_products} products
        </div>
      </div>
    </>
  );
}
