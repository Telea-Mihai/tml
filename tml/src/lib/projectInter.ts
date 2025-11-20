'use server'

import {db} from '@/db/db';
import { project } from '@/db/schema/project';
import { eq } from 'drizzle-orm';
import { ButtonHTMLAttributes } from 'react';

export type Project = typeof project.$inferSelect;

export async function getProjectById(id: number) : Promise<Project | null> {
    const result = await db.select().from(project).where(eq(project.id, id));
    return result.length > 0 ? result[0] : null;
}

export async function getProjectsByIds(ids: number[]): Promise<Project[] | null> {
    let projects: Project[] = [];
    for (let id of ids) {
        const project = await getProjectById(id);
        if (project) {
            projects.push(project);
        }
    }
    return projects.length > 0 ? projects : null;
}            