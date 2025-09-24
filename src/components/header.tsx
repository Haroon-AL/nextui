"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MyStore
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
