import Image from "next/image";
import AddToCartClient from "../AddToCartClient";
import { Product } from "../ProductListClient";
import apiClient from "../../../apiClient";

export default async function ProductPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  let product: Product | null = null;
  try {
    const res = await apiClient.get<{ product: Product }>(`/products/${slug}`);
    // console.log(product)
    product = res.data.product;
  } catch {
    return <div>Failed to load product.</div>;
  }

  if (!product) return <div>Product not found: {slug}</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <Image
        src={product.url ?? ""}
        alt={product.name}
        width={400}
        height={400}
      />
      <p>{product.description}</p>
      <AddToCartClient product={product} />
    </div>
  );
}
