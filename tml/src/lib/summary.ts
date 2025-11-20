'use server';  

import { getProjectsByIds } from "./projectInter";
import { getCategoryById } from "./categoryInter";

export type Summary = {
    title:string,
    counted:number,
    projects: string[],
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
        };
    }
    
    const projects = await getProjectsByIds(category.projects);
    
    if(!projects || projects.length === 0) {
        return {
            title: category.name,
            counted: 0,
            projects: [],
        };
    }   
    const projectNames = projects.map(proj => proj.name);

    return {
        title: category.name,
        counted: projects.length,
        projects: projectNames,
    };

}