'use client';

import { useState, FormEvent } from 'react';
import type { Project, ProjectFormData } from '@/types';
import styles from './Form.module.css';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: project?.name || '',
    description: project?.description || '',
    myRole: project?.myRole || '',
    techStack: project?.techStack || [],
    features: project?.features || [],
    linkGit: project?.linkGit || '',
    linkDemo: project?.linkDemo || '',
    status: project?.status || 'planning',
    images: project?.images || [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData({ ...formData, techStack: [...(formData.techStack || []), techInput.trim()] });
      setTechInput('');
    }
  };

  const removeTech = (index: number) => {
    const newTechStack = [...(formData.techStack || [])];
    newTechStack.splice(index, 1);
    setFormData({ ...formData, techStack: newTechStack });
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...(formData.features || []), featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData({ ...formData, images: [...(formData.images || []), imageInput.trim()] });
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black p-6 border-2 border-dotted border-green-500 terminal-border">
      <h3 className="text-xl font-semibold text-white">
        <span className="text-green-500 terminal-glow">{'>'}</span> {project ? 'Edit Project' : 'Add Project'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-black border-2 border-dotted border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
            Status *
          </label>
          <select
            id="status"
            required
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 bg-black border-2 border-dotted border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 bg-black border-2 border-dotted border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <label htmlFor="myRole" className="block text-sm font-medium text-gray-300 mb-1">
          My Role
        </label>
        <input
          type="text"
          id="myRole"
          value={formData.myRole}
          onChange={(e) => setFormData({ ...formData, myRole: e.target.value })}
          className="w-full px-3 py-2 bg-black border-2 border-dotted border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="e.g., Full Stack Developer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="linkGit" className="block text-sm font-medium text-gray-300 mb-1">
            GitHub Link
          </label>
          <input
            type="url"
            id="linkGit"
            value={formData.linkGit}
            onChange={(e) => setFormData({ ...formData, linkGit: e.target.value })}
            className="w-full px-3 py-2 bg-black border-2 border-dotted border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label htmlFor="linkDemo" className="block text-sm font-medium text-gray-300 mb-1">
            Demo Link
          </label>
          <input
            type="url"
            id="linkDemo"
            value={formData.linkDemo}
            onChange={(e) => setFormData({ ...formData, linkDemo: e.target.value })}
            className="w-full px-3 py-2 bg-black border-2 border-dotted border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Tech Stack
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
            className="flex-1 px-3 py-2 bg-black border-2 border-dotted border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Add technology..."
          />
          <button
            type="button"
            onClick={addTech}
            className="px-4 py-2 bg-black text-green-500 border-2 border-dotted border-green-500 terminal-border hover:bg-green-500 hover:text-black transition-all"
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.techStack?.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-900 border-2 border-dotted border-green-500 text-white text-sm flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTech(index)}
                className="text-green-500 hover:text-green-300 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Features
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            className="flex-1 px-3 py-2 bg-black border-2 border-dotted border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Add feature..."
          />
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 bg-black text-green-500 border-2 border-dotted border-green-500 terminal-border hover:bg-green-500 hover:text-black transition-all"
          >
            +
          </button>
        </div>
        <div className="space-y-1">
          {formData.features?.map((feature, index) => (
            <div
              key={index}
              className="px-3 py-2 bg-gray-900 border-2 border-dotted border-gray-700 text-white text-sm flex items-center justify-between"
            >
              <span>- {feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-green-500 hover:text-green-300 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Images
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
            className="flex-1 px-3 py-2 bg-black border-2 border-dotted border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Add image URL..."
          />
          <button
            type="button"
            onClick={addImage}
            className="px-4 py-2 bg-black text-green-500 border-2 border-dotted border-green-500 terminal-border hover:bg-green-500 hover:text-black transition-all"
          >
            +
          </button>
        </div>
        <div className="space-y-1">
          {formData.images?.map((image, index) => (
            <div
              key={index}
              className="px-3 py-2 bg-gray-900 border-2 border-dotted border-gray-700 text-white text-sm flex items-center justify-between"
            >
              <span className="truncate">{image}</span>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="text-green-500 hover:text-green-300 font-bold ml-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-500 text-black border-2 border-dotted border-green-500 hover:bg-green-400 disabled:bg-green-900 disabled:text-green-600 disabled:cursor-not-allowed terminal-glow"
        >
          {isSubmitting ? 'Saving...' : project ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-black text-green-500 border-2 border-dotted border-green-500 hover:bg-green-500 hover:text-black transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
