import React, { useState, useEffect } from 'react';
import { ITagCategory, EPrecisionType, ETagCategoryStatus, EMetadataComponent, EMetadataInputType, EMetadataSelectMode } from '../../types/interfaces';
import TagCategoryForm from './TagCategoryForm';
import TagCategoryList from './TagCategoryList';
import TagCategoryDetails from './TagCategoryDetails';
import sampleData from '../../data/sampleData.json';
import styles from './TagCategoryManager.module.scss';

type ViewType = 'home' | 'categories' | 'details' | 'form';

interface TagCategoryManagerProps {
  onNavigate?: (view: ViewType) => void;
  currentView?: ViewType;
}

const TagCategoryManager: React.FC<TagCategoryManagerProps> = ({ onNavigate, currentView }) => {
  const [tagCategories, setTagCategories] = useState<ITagCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ITagCategory | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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
    setShowDetails(false);
  };

  const handleViewClick = (category: ITagCategory) => {
    setSelectedCategory(category);
    setShowDetails(true);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedCategory(null);
  };

  const handleBackToHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const activeCategories = tagCategories.filter(cat => !cat.deleted);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button 
            className={styles.backButton}
            onClick={handleBackToHome}
            aria-label="Back to home"
          >
            ← Back to Home
          </button>
          <h2>Tag Category Management</h2>
        </div>
        <button 
          className={styles.addButton}
          onClick={() => setIsEditing(true)}
        >
          + Add New Tag Category
        </button>
      </div>

      {isEditing && (
        <div className={styles.formContainer}>
          <TagCategoryForm
            category={selectedCategory}
            onSave={selectedCategory ? handleEditCategory : handleAddCategory}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {showDetails && selectedCategory && (
        <div className={styles.detailsContainer}>
          <TagCategoryDetails
            category={selectedCategory}
            onClose={handleCloseDetails}
          />
        </div>
      )}

      {!isEditing && !showDetails && (
        <div className={styles.listContainer}>
          <TagCategoryList
            categories={activeCategories}
            onEdit={handleEditClick}
            onDelete={handleDeleteCategory}
            onView={handleViewClick}
          />
        </div>
      )}
    </div>
  );
};

export default TagCategoryManager;
