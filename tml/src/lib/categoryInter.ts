'use server'

import {db} from '@/db/db';
import { category } from '@/db/schema/category';
import {eq} from 'drizzle-orm';

export type Category = typeof category.$inferSelect;

export async function getAllCategories(): Promise<Category[]> {
    return await db.select().from(category);
}

export async function getCategoryById(id: number): Promise<Category | null> {
    const result = await db.select().from(category).where(eq(category.id, id));
    return result.length > 0 ? result[0] : null;
}
