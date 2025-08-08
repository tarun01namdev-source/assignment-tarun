import React, { useState, useEffect } from 'react';
import { ITagCategory, IMetadataConfig, EPrecisionType, ETagCategoryStatus } from '../../types/interfaces';
import MetadataConfigForm from '../Metadata/MetadataConfigForm';
import styles from './TagCategoryForm.module.scss';

interface TagCategoryFormProps {
  category?: ITagCategory | null;
  onSave: (category: ITagCategory) => void;
  onCancel: () => void;
}

const TagCategoryForm: React.FC<TagCategoryFormProps> = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<ITagCategory>>({
    name: '',
    gameId: '',
    group: { label: '', value: '' },
    precisionType: EPrecisionType.LONG,
    status: ETagCategoryStatus.ACTIVE,
    metadataConfig: [],
    subCategories: {},
    isParentTag: false,
    isReplay: false,
    nameStructure: []
  });

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleMetadataConfigChange = (configs: IMetadataConfig[]) => {
    setFormData(prev => ({
      ...prev,
      metadataConfig: configs
    }));
  };

  const validateForm = (): string[] => {
    const newErrors: string[] = [];

    if (!formData.name?.trim()) {
      newErrors.push('Name is required');
    }

    if (!formData.gameId?.trim()) {
      newErrors.push('Game ID is required');
    }

    if (!formData.group?.label?.trim()) {
      newErrors.push('Group label is required');
    }

    if (formData.metadataConfig && formData.metadataConfig.length > 0) {
      formData.metadataConfig.forEach((config, index) => {
        if (!config.key?.trim()) {
          newErrors.push(`Metadata config ${index + 1}: Key is required`);
        }
        if (!config.label?.trim()) {
          newErrors.push(`Metadata config ${index + 1}: Label is required`);
        }
      });
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const categoryData: ITagCategory = {
      id: category?.id || '',
      createdAt: category?.createdAt || Date.now(),
      lastUpdatedAt: Date.now(),
      deleted: false,
      name: formData.name!,
      gameId: formData.gameId!,
      group: formData.group!,
      precisionType: formData.precisionType!,
      status: formData.status!,
      metadataConfig: formData.metadataConfig!,
      subCategories: formData.subCategories!,
      isParentTag: formData.isParentTag!,
      isReplay: formData.isReplay!,
      nameStructure: formData.nameStructure!
    };

    onSave(categoryData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formHeader}>
        <h3>{category ? 'Edit Tag Category' : 'Add New Tag Category'}</h3>
      </div>
      
      {errors.length > 0 && (
        <div className={styles.error}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
            Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            className={styles.inputField}
            value={formData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="gameId">
            Game ID <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="gameId"
            className={styles.inputField}
            value={formData.gameId || ''}
            onChange={(e) => handleInputChange('gameId', e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="groupLabel">
            Group Label
          </label>
          <input
            type="text"
            id="groupLabel"
            className={styles.inputField}
            value={formData.group?.label || ''}
            onChange={(e) => handleInputChange('group', { ...formData.group, label: e.target.value, value: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="precisionType">
            Precision Type
          </label>
          <select
            id="precisionType"
            className={styles.selectField}
            value={formData.precisionType || EPrecisionType.LONG}
            onChange={(e) => handleInputChange('precisionType', e.target.value)}
          >
            <option value={EPrecisionType.LONG}>Long</option>
            <option value={EPrecisionType.SHORT}>Short</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className={styles.selectField}
            value={formData.status || ETagCategoryStatus.ACTIVE}
            onChange={(e) => handleInputChange('status', e.target.value)}
          >
            <option value={ETagCategoryStatus.ACTIVE}>Active</option>
            <option value={ETagCategoryStatus.INACTIVE}>Inactive</option>
          </select>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="isParentTag"
            checked={formData.isParentTag || false}
            onChange={(e) => handleInputChange('isParentTag', e.target.checked)}
          />
          <label htmlFor="isParentTag">Is Parent Tag</label>
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="isReplay"
            checked={formData.isReplay || false}
            onChange={(e) => handleInputChange('isReplay', e.target.checked)}
          />
          <label htmlFor="isReplay">Is Replay</label>
        </div>
      </div>

      <div className={styles.metadataSection}>
        <h4>Metadata Configuration</h4>
        <MetadataConfigForm
          configs={formData.metadataConfig || []}
          onChange={handleMetadataConfigChange}
        />
      </div>

      <div className={styles.formActions}>
        <button type="button" className={`${styles.button} ${styles.secondaryButton}`} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={`${styles.button} ${styles.primaryButton}`}>
          {category ? 'Update' : 'Create'} Tag Category
        </button>
      </div>
    </form>
  );
};

export default TagCategoryForm;
