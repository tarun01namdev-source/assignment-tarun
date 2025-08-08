import React from 'react';
import { ITagCategory } from '../../types/interfaces';
import { formatDate } from '../../utils/helpers';
import styles from './TagCategoryDetails.module.scss';

interface TagCategoryDetailsProps {
  category: ITagCategory;
  onClose: () => void;
}

const TagCategoryDetails: React.FC<TagCategoryDetailsProps> = ({ category, onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button 
            className={styles.backButton}
            onClick={onClose}
            aria-label="Go back"
          >
            ← Back
          </button>
          <h3>{category.name}</h3>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h4>Basic Information</h4>
          <div className={styles.grid}>
            <div className={styles.item}>
              <label>ID:</label>
              <span>{category.id}</span>
            </div>
            <div className={styles.item}>
              <label>Game ID:</label>
              <span>{category.gameId}</span>
            </div>
            <div className={styles.item}>
              <label>Group:</label>
              <span>{category.group.label}</span>
            </div>
            <div className={styles.item}>
              <label>Status:</label>
              <span className={`${styles.statusBadge} ${styles[category.status.toLowerCase()]}`}>
                {category.status}
              </span>
            </div>
            <div className={styles.item}>
              <label>Precision Type:</label>
              <span>{category.precisionType}</span>
            </div>
            <div className={styles.item}>
              <label>Parent Tag:</label>
              <span className={`${styles.badge} ${category.isParentTag ? styles.yes : styles.no}`}>
                {category.isParentTag ? 'Yes' : 'No'}
              </span>
            </div>
            <div className={styles.item}>
              <label>Replay:</label>
              <span className={`${styles.badge} ${category.isReplay ? styles.yes : styles.no}`}>
                {category.isReplay ? 'Yes' : 'No'}
              </span>
            </div>
            <div className={styles.item}>
              <label>Created:</label>
              <span>{formatDate(category.createdAt)}</span>
            </div>
            <div className={styles.item}>
              <label>Last Updated:</label>
              <span>{formatDate(category.lastUpdatedAt)}</span>
            </div>
          </div>
        </div>

        {category.metadataConfig.length > 0 && (
          <div className={styles.section}>
            <h4>Metadata Configuration ({category.metadataConfig.length} fields)</h4>
            <div className={styles.metadataList}>
              {category.metadataConfig.map((config, index) => (
                <div key={index} className={styles.metadataItem}>
                  <div className={styles.metadataHeader}>
                    <strong>{config.label}</strong>
                    <span className={styles.metadataType}>{config.component}</span>
                  </div>
                  <div className={styles.metadataDetails}>
                    <div>Key: {config.key}</div>
                    <div>Required: {config.required ? 'Yes' : 'No'}</div>
                    <div>Read Only: {config.readOnly ? 'Yes' : 'No'}</div>
                    {config.type && <div>Type: {config.type}</div>}
                    {config.mode && <div>Mode: {config.mode}</div>}
                    {config.multiple && <div>Multiple: Yes</div>}
                    {config.query && <div>Query: {config.query}</div>}
                    {config.options && config.options.length > 0 && (
                      <div>
                        Options: {config.options.map(opt => `${opt.label}(${opt.value})`).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(category.subCategories).length > 0 && (
          <div className={styles.section}>
            <h4>Sub Categories ({Object.keys(category.subCategories).length})</h4>
            <div className={styles.subcategoriesList}>
              {Object.entries(category.subCategories).map(([key, subCategory]) => (
                <div key={key} className={styles.subcategoryItem}>
                  <div className={styles.subcategoryHeader}>
                    <strong>{subCategory.label}</strong>
                    <span className={styles.subcategoryKey}>({key})</span>
                  </div>
                  {subCategory.config.length > 0 && (
                    <div className={styles.subcategoryConfig}>
                      <div>Config Fields: {subCategory.config.length}</div>
                      {subCategory.config.map((config, index) => (
                        <div key={index} className={styles.configItem}>
                          • {config.label} ({config.key}) - {config.component}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {category.nameStructure.length > 0 && (
          <div className={styles.section}>
            <h4>Name Structure</h4>
            <div className={styles.nameStructure}>
              {category.nameStructure.map((item, index) => (
                <span key={index} className={styles.structureItem}>
                  {item}
                  {index < category.nameStructure.length - 1 && <span className={styles.separator}> → </span>}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagCategoryDetails;
