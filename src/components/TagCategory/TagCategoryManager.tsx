import React, { useState, useEffect } from 'react';
import { ITagCategory, EPrecisionType, ETagCategoryStatus, EMetadataComponent, EMetadataInputType, EMetadataSelectMode } from '../../types/interfaces';
import TagCategoryForm from './TagCategoryForm';
import TagCategoryList from './TagCategoryList';
import sampleData from '../../data/sampleData.json';

const TagCategoryManager: React.FC = () => {
  const [tagCategories, setTagCategories] = useState<ITagCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ITagCategory | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load sample data on component mount and convert to proper types
    const convertSampleData = (data: any): ITagCategory => {
      return {
        id: data.id,
        gameId: data.gameId,
        group: data.group,
        name: data.name,
        precisionType: data.precisionType as EPrecisionType,
        status: data.status as ETagCategoryStatus,
        metadataConfig: data.metadataConfig.map((config: any) => ({
          ...config,
          component: config.component as EMetadataComponent,
          type: config.type as EMetadataInputType,
          mode: config.mode as EMetadataSelectMode
        })),
        subCategories: data.subCategories,
        isParentTag: data.isParentTag,
        isReplay: data.isReplay,
        nameStructure: data.nameStructure,
        createdAt: data.createdAt,
        lastUpdatedAt: data.lastUpdatedAt || data.createdAt || Date.now(),
        deleted: data.deleted || false
      };
    };

    const sampleCategory = convertSampleData(sampleData);
    setTagCategories([sampleCategory]);
  }, []);

  const handleAddCategory = (category: ITagCategory) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      createdAt: Date.now(),
      lastUpdatedAt: Date.now(),
      deleted: false
    };
    setTagCategories([...tagCategories, newCategory]);
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const handleEditCategory = (category: ITagCategory) => {
    const updatedCategories = tagCategories.map(cat => 
      cat.id === category.id ? { ...category, lastUpdatedAt: Date.now() } : cat
    );
    setTagCategories(updatedCategories);
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    const updatedCategories = tagCategories.map(cat => 
      cat.id === id ? { ...cat, deleted: true } : cat
    );
    setTagCategories(updatedCategories);
  };

  const handleEditClick = (category: ITagCategory) => {
    setSelectedCategory(category);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const activeCategories = tagCategories.filter(cat => !cat.deleted);

  return (
    <div className="tag-category-manager">
      <div className="card">
        <h2>Tag Category Management</h2>
        <button 
          className="button" 
          onClick={() => setIsEditing(true)}
          style={{ marginBottom: '20px' }}
        >
          Add New Tag Category
        </button>
      </div>

      {isEditing && (
        <div className="card">
          <TagCategoryForm
            category={selectedCategory}
            onSave={selectedCategory ? handleEditCategory : handleAddCategory}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      <div className="card">
        <TagCategoryList
          categories={activeCategories}
          onEdit={handleEditClick}
          onDelete={handleDeleteCategory}
        />
      </div>
    </div>
  );
};

export default TagCategoryManager;
