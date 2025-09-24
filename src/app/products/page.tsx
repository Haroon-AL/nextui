import ProductListClient from "./ProductListClient";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  sku: string;
}

interface ApiResponse {
  products: Product[];
  timestamp: string;
  message: string;
}

async function getProducts(): Promise<ApiResponse> {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export default async function Products2Page() {
  const data = await getProducts();

  return (
    <main className="p-8 max-w-8xl sm:px-6 lg:px-12">
      <h1 className="text-3xl font-bold mb-6"> Products</h1>
      {/* <div> Generated at:{data.timestamp}</div> */}
      <ProductListClient products={data.products} />
    </main>
  );
}
