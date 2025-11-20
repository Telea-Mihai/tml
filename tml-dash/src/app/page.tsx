'use client';

import { useState, useEffect } from 'react';
import type { Category, Project, CategoryFormData, ProjectFormData } from '@/types';
import CategoryForm from '@/components/CategoryForm';
import ProjectForm from '@/components/ProjectForm';
import CategoryTable from '@/components/CategoryTable';
import ProjectTable from '@/components/ProjectTable';

type Tab = 'categories' | 'projects';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('categories');
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, projectsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/projects'),
      ]);
      const categoriesData = await categoriesRes.json();
      const projectsData = await projectsRes.json();
      setCategories(categoriesData);
      setProjects(projectsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (data: CategoryFormData) => {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      await fetchData();
      setShowCategoryForm(false);
    }
  };

  const handleUpdateCategory = async (data: CategoryFormData) => {
    if (!editingCategory) return;
    
    const response = await fetch(`/api/categories/${editingCategory.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      await fetchData();
      setEditingCategory(undefined);
      setShowCategoryForm(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      await fetchData();
    }
  };

  const handleCreateProject = async (data: ProjectFormData) => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      await fetchData();
      setShowProjectForm(false);
    }
  };

  const handleUpdateProject = async (data: ProjectFormData) => {
    if (!editingProject) return;
    
    const response = await fetch(`/api/projects/${editingProject.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      await fetchData();
      setEditingProject(undefined);
      setShowProjectForm(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      await fetchData();
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleCancelCategoryForm = () => {
    setShowCategoryForm(false);
    setEditingCategory(undefined);
  };

  const handleCancelProjectForm = () => {
    setShowProjectForm(false);
    setEditingProject(undefined);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white"><span className="text-green-500 terminal-glow">{'>'}</span> Dashboard</h1>
          <p className="mt-2 text-sm text-gray-400">Manage your categories and projects</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('categories')}
              className={`${
                activeTab === 'categories'
                  ? 'border-green-500 text-white terminal-glow'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <span className="text-green-500">{'>'}</span> Categories ({categories.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`${
                activeTab === 'projects'
                  ? 'border-green-500 text-white terminal-glow'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <span className="text-green-500">{'>'}</span> Projects ({projects.length})
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-green-500 terminal-glow">Loading<span className="cursor">_</span></p>
          </div>
        ) : (
          <>
            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                {!showCategoryForm && (
                  <button
                    onClick={() => setShowCategoryForm(true)}
                    className="px-4 py-2 bg-black text-green-500 border-2 border-dotted border-green-500 terminal-border hover:bg-green-500 hover:text-black transition-all"
                  >
                    {'>'} Add Category
                  </button>
                )}

                {showCategoryForm && (
                  <CategoryForm
                    category={editingCategory}
                    availableProjects={projects}
                    onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
                    onCancel={handleCancelCategoryForm}
                  />
                )}
                <CategoryTable
                  categories={categories}
                  projects={projects}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}     
                />
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {!showProjectForm ? (
                  <button
                    onClick={() => setShowProjectForm(true)}
                    className="px-4 py-2 bg-black text-green-500 border-2 border-dotted border-green-500 terminal-border hover:bg-green-500 hover:text-black transition-all"
                  >
                    {'>'} Add Project
                  </button>
                ) : ('')}

                {showProjectForm && (
                  <ProjectForm
                    project={editingProject}
                    onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
                    onCancel={handleCancelProjectForm}
                  />
                )}

                <ProjectTable
                  projects={projects}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              </div>
            )}
          </>
        )}$
      </div>
    </div>


  );
}
