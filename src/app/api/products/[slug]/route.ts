import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { sku: string } }) {
  const sku = params.sku;
  const product = await request.json(); 
  return NextResponse.json({ success: true, receivedSku: sku, receivedProduct: product });
}