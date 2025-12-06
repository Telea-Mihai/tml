"use server"

import {db} from '@/db/db';
import {eq} from 'drizzle-orm';
import {category} from '@/db/schema/category';
import { CategoryFormData } from '@/types';

export type Category = typeof category.$inferSelect;

export async function getAllCategories(): Promise<Category[]> {
  return await db.select().from(category);
}

export async function getCategoryById(id: number): Promise<Category | null> {
    const result = await db.select().from(category).where(eq(category.id, id));
    return result.length > 0 ? result[0] : null;
}
export async function updateCategory(id: number, data: Partial<CategoryFormData>): Promise<Category | null> {
    const [updatedCategory] = await db.update(category)
        .set({
            name: data.name,
            projects: data.projects || [],
            icon: data.icon || null,
            color: data.color || null,
        })
        .where(eq(category.id, id))
        .returning();
    return updatedCategory || null;
}

export async function deleteCategory(id: number) {
    await db.delete(category).where(eq(category.id, id));
}

export async function createCategory(data: Omit<CategoryFormData, 'id'>): Promise<Category> {
    const [newCategory] = await db.insert(category).values({
        name: data.name,
        projects: data.projects || [],
        icon: data.icon || null,
        color: data.color || null,
    }).returning();
    return newCategory;
}