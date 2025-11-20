'use client';

import type { Project } from '@/types';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

export default function ProjectTable({ projects, onEdit, onDelete }: ProjectTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-gray-900 text-green-400 border-2 border-dotted border-green-500';
      case 'in-progress':
        return 'bg-gray-900 text-green-300 border-2 border-dotted border-green-600';
      case 'planning':
        return 'bg-gray-900 text-gray-300 border-2 border-dotted border-gray-600';
      case 'on-hold':
        return 'bg-gray-900 text-gray-500 border-2 border-dotted border-gray-700';
      default:
        return 'bg-gray-900 text-gray-400 border-2 border-dotted border-gray-600';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-black border-2 border-dotted border-gray-800">
        <thead className="bg-black border-b-2 border-dotted border-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Tech Stack
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Links
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {projects.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                No projects yet. Create your first project above.
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-900 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{project.name}</div>
                  {project.myRole && (
                    <div className="text-xs text-gray-400">{project.myRole}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300 max-w-xs truncate">
                    {project.description || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {project.techStack?.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-900 border-2 border-dotted border-gray-700 text-white text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.techStack && project.techStack.length > 3 && (
                      <span className="px-2 py-1 text-gray-400 text-xs">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    {project.linkGit && (
                      <a
                        href={project.linkGit}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-300 terminal-glow"
                        title="GitHub"
                      >
                        [GitHub]
                      </a>
                    )}
                    {project.linkDemo && (
                      <a
                        href={project.linkDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-300 terminal-glow"
                        title="Demo"
                      >
                        [Demo]
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(project)}
                    className="text-green-500 hover:text-green-300 mr-4 terminal-glow"
                  >
                    [Edit]
                  </button>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="text-green-500 hover:text-green-300 terminal-glow"
                  >
                    [Delete]
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
