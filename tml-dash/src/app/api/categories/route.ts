import { NextResponse } from 'next/server';
import type { CategoryFormData } from '@/types';
import { db } from '@/db/db';
import { category } from '@/db/schema/category';

export async function GET() {
  try {
    const categories = await db.select().from(category);
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: CategoryFormData = await request.json();
    
    const [newCategory] = await db.insert(category).values({
      name: body.name,
      projects: body.projects || [],
      icon: body.icon || null,
    }).returning();
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
