'use client';

import { useState, useEffect, FormEvent } from 'react';
import type { Category, CategoryFormData, Project } from '@/types';
import styles from './Form.module.css';

interface CategoryFormProps {
  category?: Category;
  availableProjects: Project[];
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel: () => void;
}

export default function CategoryForm({ category, availableProjects, onSubmit, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: category?.name || '',
    projects: category?.projects || [],
    icon: category?.icon || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      name: category?.name || '',
      projects: category?.projects || [],
      icon: category?.icon || '',
    });
  }, [category]);

  const handleProjectToggle = (projectId: number) => {
    setFormData((prev) => {
      const currentProjects = prev.projects || [];
      const projectAlreadyAdded = currentProjects.includes(projectId);
      const updatedProjects = projectAlreadyAdded
        ? currentProjects.filter((id) => id !== projectId)
        : [...currentProjects, projectId];

      return { ...prev, projects: updatedProjects };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.formTitle}>
        <span className={styles.promptSymbol}>{'>'}</span> {category ? 'Edit Category' : 'Add Category'}
      </h3>
      
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="icon" className={styles.label}>
          Icon (path to image)
        </label>
        <input
          type="text"
          id="icon"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className={styles.input}
          placeholder="/globe.svg"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Linked Projects
        </label>
        {availableProjects.length === 0 ? (
          <p className={styles.helperText}>No projects available yet. Create a project to link it here.</p>
        ) : (
          <div className={styles.checkboxList}>
            {availableProjects.map((project) => (
              <label key={project.id} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={formData.projects?.includes(project.id) || false}
                  onChange={() => handleProjectToggle(project.id)}
                  className={styles.checkbox}
                />
                <span>{project.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.primaryButton}
        >
          {isSubmitting ? 'Saving...' : category ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={styles.secondaryButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
