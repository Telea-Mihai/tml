"use server"

import { db } from "@/db/db";
import { eq } from "drizzle-orm";

import { project } from "@/db/schema/project";
import { ProjectFormData } from "@/types";

export type Project = typeof project.$inferSelect;

export async function getAllProjects(): Promise<Project[]> {
  return await db.select().from(project);
}

export async function getProjectById(id: number): Promise<Project | null> {
    const result = await db.select().from(project).where(eq(project.id, id));
    return result.length > 0 ? result[0] : null;
}

export async function updateProject(id: number, data: Partial<ProjectFormData>): Promise<Project | null> {
    const [updatedProject] = await db.update(project)
        .set({
            name: data.name,
            description: data.description || null,
            myRole: data.myRole || null,
            linkGit: data.linkGit || null,
            linkDemo: data.linkDemo || null,
            techStack: data.techStack || [],
            features: data.features || [],
            images: data.images || [],
            status: data.status,

        })
        .where(eq(project.id, id))
        .returning();
    return updatedProject || null;
}

export async function deleteProject(id: number) {
    await db.delete(project).where(eq(project.id, id));
}

export async function createProject(data: Omit<ProjectFormData, 'id'>): Promise<Project> {
    const [newProject] = await db.insert(project).values({
            name: data.name,
            description: data.description || null,
            myRole: data.myRole || null,
            linkGit: data.linkGit || null,
            linkDemo: data.linkDemo || null,
            techStack: data.techStack || [],
            features: data.features || [],
            images: data.images || [],
            status: data.status,
        }).returning();
    return newProject;
}