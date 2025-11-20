export interface Category {
  id: number;
  name: string;
  projects?: number[];
  icon?: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  myRole?: string;
  techStack?: string[];
  features?: string[];
  linkGit?: string;
  linkDemo?: string;
  status: string;
  images?: string[];
}

export type CategoryFormData = Omit<Category, 'id'>;
export type ProjectFormData = Omit<Project, 'id'>;
