'use server';  

import { getProjectsByIds } from "./projectInter";
import { getCategoryById } from "./categoryInter";

export type Summary = {
    title:string,
    catId:number
    counted:number,
    projects: string[],
    imageUrl?: string,
}

export async function generateSummary(categoryId:number): Promise<Summary|null> {
    const category = await getCategoryById(categoryId);
    if (!category) {
        return null;
    }
    
    if(!category.projects || category.projects.length === 0) {
        return {
            title: category.name,
            counted: 0,
            projects: [],
            imageUrl: category.icon ?? undefined,
            catId: category.id,
        };
    }
    
    const projects = await getProjectsByIds(category.projects);
    
    if(!projects || projects.length === 0) {
        return {
            title: category.name,
            counted: 0,
            projects: [],
            imageUrl: category.icon ?? undefined,
            catId: category.id,
        };
    }   
    const projectNames = projects.map(proj => proj.name);

    return {
        title: category.name,
        counted: projects.length,
        projects: projectNames,
        imageUrl: category.icon ?? undefined,
        catId: category.id,
    };

}