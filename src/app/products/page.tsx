import { products } from "@/data/products"

export default function ProductsPage(){
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </main>
  );
}