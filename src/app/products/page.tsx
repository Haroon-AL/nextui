import ProductListClient, { Product, Pagination } from "./ProductListClient";

interface ApiResponse {
  products: Product[];
  timestamp: string;
  message: string;
  pagination: Pagination;
}

export async function getProducts(page = 0): Promise<ApiResponse> {
  const res = await fetch(`http://localhost:8080/v1/products?page=${page}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function Products2Page() {
  const data = await getProducts(0);
  return (
    <main>
      <h1>Products</h1>
      <ProductListClient
        initialProducts={data.products}
        initialPagination={data.pagination}
      />
    </main>
  );
}
