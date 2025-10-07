import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "src/data/products.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const products = JSON.parse(fileContents);

  const product = products.find((p: any) => p.sku === slug);
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ product });
}
