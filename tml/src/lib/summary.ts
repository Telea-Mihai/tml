'use server';

import {Category, getCategoryById} from '@/lib/categoryInter';
import {Project, getProjectsByIds} from '@/lib/projectInter';

export type Summary = {
    catId: number;
    catName: string;
    nrProjects: number;
    projects: String[] | null;
}

export async function getSummary(catId: number): Promise<Summary | null> {
    const category: Category | null =  await getCategoryById(catId);
    if (!category) {
        return null;
    }

    const projects: Project[] | null = await getProjectsByIds(category.projects || []);
    const projectNames: String[] | null = projects ? projects.map(proj => proj.name) : null;
    const summary: Summary = {
        catId: category.id,
        catName: category.name,
        nrProjects: projectNames ? projectNames.length : 0,
        projects: projectNames
    };
    return summary;
}