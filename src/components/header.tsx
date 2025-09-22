import Link from "next/link"
import { ShoppingCart } from "lucide-react"
 
export default function Header() {
  return (
<header className="bg-white shadow">
<div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Store Name / Logo */}
<Link href="/products" className="text-2xl font-bold text-gray-800">
          MyStore
</Link>
 
        {/* Navigation / Cart */}
<nav>
<ul className="flex space-x-6">
<li>
<Link href="/cart" className="relative flex items-center gap-2">
<ShoppingCart className="w-6 h-6" />
<span>Cart</span>
</Link>
</li>
</ul>
</nav>
</div>
</header>
  )
}