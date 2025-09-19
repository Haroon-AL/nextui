"use client"; // add client code in ssr
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

import Image from 'next/image';
import { useMemo, useState } from 'react';
export function IMG() {
    return (
    <Image
              src="/product.jpg"
              alt="Product image"
              width={180}
              height={180}
              priority
            />
    )
  }
export default function ProductListClient({products}:Readonly<{products: Product[]}>){

    const handleEvent = (p:Product) => {
    alert(`Button clicked! ${p.name}`);
  }

    const [categories] = useState<string[]>([
    "all",
    "apparel",
    "stationery",
    "art",
    "bags",
    "accessories",
    "drink-ware",
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

    return(
    <div className="py-4 content-around gap-1">
      <h1>
      <div>
        <label htmlFor="filter" className='align-middle p-1 '>Filter by</label>
      
        <select className="align-text-top p-3 border-solid border-2 rounded-2xl" onChange={(e)=>setSelectedCategory(e.target.value)}>
              {categories.map((category) => (
                      <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
              )
            )
          }
          </select>
        </div>
        </h1>
        
    <div className="grid grid-cols-3 gap-4">
        
        {filtered.map((product: Product) => (
          <div key={product.id} className="border p-4 rounded-lg  bg-emerald-70" >
              {IMG()}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <h3 className="text-sm text-gray-500 capitalize">{product.category}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button
            onClick={()=>handleEvent(product)}
            className="bg-sky-450 mt-4 px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-600 cursor-pointer
            ">Add to Cart</button>
          </div>
        ))}
      </div>
      </div>
    );

}