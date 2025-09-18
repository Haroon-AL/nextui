import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'src/data/products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const products = JSON.parse(fileContents);

    const response = {
      products,
      timestamp: new Date().toISOString(),
      message: 'Data loaded dynamically at request time'
    };

    return NextResponse.json(response);
  }
