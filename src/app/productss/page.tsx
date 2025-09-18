interface Product {
  id: number;
  name: string;
  price: number;
}

interface ApiResponse {
  products: Product[];
  timestamp: string;
  message: string;
}

async function getProducts(): Promise<ApiResponse> {
  const response = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export default async function ProductssPage() {
  const data = await getProducts();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">me Products (SSR Demo)</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>generated at {data.timestamp}</div>
        {data.products.map((product: Product) => (
          <div key={product.id} className="border p-4 rounded-lg" >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button onClick={()=> alert("added")}>Add to Cart</button>
          </div>
        ))}
      </div>
    </main>
  );
}