'use client';

import type { Category, Project } from '@/types';
import styles from './Table.module.css';

interface CategoryTableProps {
  categories: Category[];
  projects: Project[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export default function CategoryTable({ categories, projects, onEdit, onDelete }: CategoryTableProps) {
  const projectLookup = projects.reduce<Record<number, string>>((acc, project) => {
    acc[project.id] = project.name;
    return acc;
  }, {});

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>
              Icon
            </th>
            <th className={styles.tableHeader}>
              Name
            </th>
            <th className={styles.tableHeader}>
              Linked Projects
            </th>
            <th className={`${styles.tableHeader} ${styles.tableHeaderRight}`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.emptyState}>
                No categories yet. Create your first category above.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category.id} className={styles.tableRow}>
                <td className={`${styles.tableCell} ${styles.iconCell}`}>
                  {category.icon || '📁'}
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.cellPrimary}>{category.name}</div>
                </td>
                <td className={styles.tableCell}>
                  {(() => {
                    const linkedProjects = (category.projects || [])
                      .map((projectId) => projectLookup[projectId])
                      .filter((name): name is string => Boolean(name));

                    if (linkedProjects.length === 0) {
                      return <div className={styles.cellSecondary}>None linked</div>;
                    }

                    return (
                      <div>
                        <div className={styles.cellPrimary}>{linkedProjects.length} linked</div>
                        <div className={styles.cellSecondary}>{linkedProjects.join(', ')}</div>
                      </div>
                    );
                  })()}
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actionContainer}>
                    <button
                      onClick={() => onEdit(category)}
                      className={styles.actionButton}
                    >
                      [Edit]
                    </button>
                    <button
                      onClick={() => onDelete(category.id)}
                      className={styles.actionButton}
                    >
                      [Delete]
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
