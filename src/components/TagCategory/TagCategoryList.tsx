import React from 'react';
import { ITagCategory } from '../../types/interfaces';

interface TagCategoryListProps {
  categories: ITagCategory[];
  onEdit: (category: ITagCategory) => void;
  onDelete: (id: string) => void;
}

const TagCategoryList: React.FC<TagCategoryListProps> = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0) {
    return (
      <div className="no-categories">
        <p>No tag categories found. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="tag-category-list">
      <h3>Tag Categories ({categories.length})</h3>
      <div className="table-container">
        <table className="category-table">
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
                    <div className="metadata-count">
                      {category.metadataConfig.length} metadata field(s)
                    </div>
                  )}
                </td>
                <td>{category.gameId}</td>
                <td>{category.group.label}</td>
                <td>
                  <span className={`status-badge ${category.status.toLowerCase()}`}>
                    {category.status}
                  </span>
                </td>
                <td>{category.precisionType}</td>
                <td>
                  <span className={`badge ${category.isParentTag ? 'yes' : 'no'}`}>
                    {category.isParentTag ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${category.isReplay ? 'yes' : 'no'}`}>
                    {category.isReplay ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="button"
                      onClick={() => onEdit(category)}
                      style={{ fontSize: '12px', padding: '5px 10px', marginRight: '5px' }}
                    >
                      Edit
                    </button>
                    <button
                      className="button"
                      onClick={() => onDelete(category.id)}
                      style={{ 
                        fontSize: '12px', 
                        padding: '5px 10px', 
                        backgroundColor: '#dc3545' 
                      }}
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
    </div>
  );
};

export default TagCategoryList;
