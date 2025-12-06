import {Project} from "@/lib/projects"
import {Category} from "@/lib/categories"

export type CategoryFormData = Omit<Category, 'id'>;
export type ProjectFormData = Omit<Project, 'id'>;
