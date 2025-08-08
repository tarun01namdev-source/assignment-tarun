import React from 'react';
import { ITagCategory } from '../../types/interfaces';
import styles from './TagCategoryCard.module.scss';

interface TagCategoryCardProps {
  category: ITagCategory;
  onEdit: (category: ITagCategory) => void;
  onDelete: (id: string) => void;
  onView: (category: ITagCategory) => void;
}

const TagCategoryCard: React.FC<TagCategoryCardProps> = ({ 
  category, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      onDelete(category.id);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{category.name}</h3>
          <span className={`${styles.status} ${styles[category.status.toLowerCase()]}`}>
            {category.status}
          </span>
        </div>
        <div className={styles.metadataCount}>
          {category.metadataConfig.length} metadata field(s)
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>Game ID:</label>
            <span>{category.gameId}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Group:</label>
            <span>{category.group.label}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Precision Type:</label>
            <span>{category.precisionType}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Parent Tag:</label>
            <span className={`${styles.badge} ${category.isParentTag ? styles.yes : styles.no}`}>
              {category.isParentTag ? 'Yes' : 'No'}
            </span>
          </div>
          <div className={styles.infoItem}>
            <label>Replay:</label>
            <span className={`${styles.badge} ${category.isReplay ? styles.yes : styles.no}`}>
              {category.isReplay ? 'Yes' : 'No'}
            </span>
          </div>
          <div className={styles.infoItem}>
            <label>Sub Categories:</label>
            <span>{Object.keys(category.subCategories).length}</span>
          </div>
        </div>

        {category.metadataConfig.length > 0 && (
          <div className={styles.metadataPreview}>
            <h4>Metadata Fields:</h4>
            <div className={styles.metadataList}>
              {category.metadataConfig.slice(0, 3).map((config, index) => (
                <span key={index} className={styles.metadataItem}>
                  {config.label}
                </span>
              ))}
              {category.metadataConfig.length > 3 && (
                <span className={styles.moreItems}>
                  +{category.metadataConfig.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.cardActions}>
        <button 
          className={`${styles.button} ${styles.viewButton}`}
          onClick={() => onView(category)}
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
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TagCategoryCard;
