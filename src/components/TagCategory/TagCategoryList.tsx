import React, { useState } from 'react';
import { ITagCategory } from '../../types/interfaces';
import TagCategoryDetails from './TagCategoryDetails';
import TagCategoryCard from './TagCategoryCard';
import styles from './TagCategoryList.module.scss';

interface TagCategoryListProps {
  categories: ITagCategory[];
  onEdit: (category: ITagCategory) => void;
  onDelete: (id: string) => void;
  onView: (category: ITagCategory) => void;
}

const TagCategoryList: React.FC<TagCategoryListProps> = ({ categories, onEdit, onDelete, onView }) => {
  const [selectedCategory, setSelectedCategory] = useState<ITagCategory | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  if (categories.length === 0) {
    return (
      <div className={styles.noCategories}>
        <p>No tag categories found. Create your first one!</p>
      </div>
    );
  }

  const handleViewDetails = (category: ITagCategory) => {
    setSelectedCategory(category);
    onView(category);
  };

  const handleCloseDetails = () => {
    setSelectedCategory(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Tag Categories ({categories.length})</h3>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleButton} ${viewMode === 'cards' ? styles.active : ''}`}
            onClick={() => setViewMode('cards')}
          >
            Cards
          </button>
          <button
            className={`${styles.toggleButton} ${viewMode === 'table' ? styles.active : ''}`}
            onClick={() => setViewMode('table')}
          >
            Table
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className={styles.cardGrid}>
          {categories.map((category) => (
            <TagCategoryCard
              key={category.id}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Game ID</th>
                <th>Group</th>
                <th>Status</th>
                <th>Precision Type</th>
                <th>Parent Tag</th>
                <th>Replay</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <strong>{category.name}</strong>
                    {category.metadataConfig.length > 0 && (
                      <div className={styles.metadataCount}>
                        {category.metadataConfig.length} metadata field(s)
                      </div>
                    )}
                  </td>
                  <td>{category.gameId}</td>
                  <td>{category.group.label}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[category.status.toLowerCase()]}`}>
                      {category.status}
                    </span>
                  </td>
                  <td>{category.precisionType}</td>
                  <td>
                    <span className={`${styles.badge} ${category.isParentTag ? styles.yes : styles.no}`}>
                      {category.isParentTag ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${category.isReplay ? styles.yes : styles.no}`}>
                      {category.isReplay ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        className={`${styles.button} ${styles.viewButton}`}
                        onClick={() => handleViewDetails(category)}
                      >
                        View
                      </button>
                      <button
                        className={`${styles.button} ${styles.editButton}`}
                        onClick={() => onEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.button} ${styles.deleteButton}`}
                        onClick={() => onDelete(category.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedCategory && (
        <TagCategoryDetails
          category={selectedCategory}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default TagCategoryList;
