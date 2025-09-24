import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '@/app/products/ProductListClient';
 
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const filePath = path.join(process.cwd(), 'src/data/products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const products: Product[] = JSON.parse(fileContents) as Product[];
 
    const product = products.find((p) => p.sku === slug);
    if (!product) {
      return NextResponse.json(
        { error: `Product with sku ${slug} not found` },
        { status: 404 }
      );
    }
 
    return NextResponse.json({
      product,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error reading product by Sku:', err);
    return NextResponse.json(
      { error: 'Failed to load product' },
      { status: 500 }
    );
  }
}
 