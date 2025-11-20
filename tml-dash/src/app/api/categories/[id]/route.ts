import { NextResponse } from 'next/server';
import type { CategoryFormData } from '@/types';
import { db } from '@/db/db';
import { category } from '@/db/schema/category';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await db.select().from(category).where(eq(category.id, parseInt(id)));
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: CategoryFormData = await request.json();
    
    const [updatedCategory] = await db.update(category)
      .set({
        name: body.name,
        projects: body.projects || [],
        icon: body.icon || null,
      })
      .where(eq(category.id, parseInt(id)))
      .returning();
    
    if (!updatedCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await db.delete(category)
      .where(eq(category.id, parseInt(id)))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
