import React from 'react';
import { ITagCategory } from '../../types/interfaces';
import { formatDate } from '../../utils/helpers';

interface TagCategoryDetailsProps {
  category: ITagCategory;
  onClose: () => void;
}

const TagCategoryDetails: React.FC<TagCategoryDetailsProps> = ({ category, onClose }) => {
  return (
    <div className="tag-category-details card">
      <div className="details-header">
        <h3>{category.name}</h3>
        <button className="button" onClick={onClose} style={{ backgroundColor: '#6c757d' }}>
          Close
        </button>
      </div>

      <div className="details-content">
        <div className="detail-section">
          <h4>Basic Information</h4>
          <div className="detail-grid">
            <div className="detail-item">
              <label>ID:</label>
              <span>{category.id}</span>
            </div>
            <div className="detail-item">
              <label>Game ID:</label>
              <span>{category.gameId}</span>
            </div>
            <div className="detail-item">
              <label>Group:</label>
              <span>{category.group.label}</span>
            </div>
            <div className="detail-item">
              <label>Status:</label>
              <span className={`status-badge ${category.status.toLowerCase()}`}>
                {category.status}
              </span>
            </div>
            <div className="detail-item">
              <label>Precision Type:</label>
              <span>{category.precisionType}</span>
            </div>
            <div className="detail-item">
              <label>Parent Tag:</label>
              <span className={`badge ${category.isParentTag ? 'yes' : 'no'}`}>
                {category.isParentTag ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="detail-item">
              <label>Replay:</label>
              <span className={`badge ${category.isReplay ? 'yes' : 'no'}`}>
                {category.isReplay ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="detail-item">
              <label>Created:</label>
              <span>{formatDate(category.createdAt)}</span>
            </div>
            <div className="detail-item">
              <label>Last Updated:</label>
              <span>{formatDate(category.lastUpdatedAt)}</span>
            </div>
          </div>
        </div>

        {category.metadataConfig.length > 0 && (
          <div className="detail-section">
            <h4>Metadata Configuration ({category.metadataConfig.length} fields)</h4>
            <div className="metadata-list">
              {category.metadataConfig.map((config, index) => (
                <div key={index} className="metadata-item card" style={{ padding: '10px', marginBottom: '10px' }}>
                  <div className="metadata-header">
                    <strong>{config.label}</strong>
                    <span className="metadata-type">{config.component}</span>
                  </div>
                  <div className="metadata-details">
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
          <div className="detail-section">
            <h4>Sub Categories ({Object.keys(category.subCategories).length})</h4>
            <div className="subcategories-list">
              {Object.entries(category.subCategories).map(([key, subCategory]) => (
                <div key={key} className="subcategory-item card" style={{ padding: '10px', marginBottom: '10px' }}>
                  <div className="subcategory-header">
                    <strong>{subCategory.label}</strong>
                    <span className="subcategory-key">({key})</span>
                  </div>
                  {subCategory.config.length > 0 && (
                    <div className="subcategory-config">
                      <div>Config Fields: {subCategory.config.length}</div>
                      {subCategory.config.map((config, index) => (
                        <div key={index} className="config-item" style={{ marginLeft: '20px', fontSize: '14px' }}>
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
          <div className="detail-section">
            <h4>Name Structure</h4>
            <div className="name-structure">
              {category.nameStructure.map((item, index) => (
                <span key={index} className="structure-item">
                  {item}
                  {index < category.nameStructure.length - 1 && <span className="separator"> → </span>}
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
