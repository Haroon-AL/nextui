import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '@/app/products/ProductListClient';

export async function GET(request: Request,
  { params }: { params: { product: Product } }) {

  console.log(params,request)
  return NextResponse.json("{}");
}
