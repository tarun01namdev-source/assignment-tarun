import React, { useState, useEffect } from 'react';
import { ITagCategory, IMetadataConfig, EPrecisionType, ETagCategoryStatus } from '../../types/interfaces';
import MetadataConfigForm from '../Metadata/MetadataConfigForm';

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
  };

  const handleMetadataConfigChange = (configs: IMetadataConfig[]) => {
    setFormData(prev => ({
      ...prev,
      metadataConfig: configs
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.gameId) {
      alert('Please fill in all required fields');
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
    <form onSubmit={handleSubmit} className="tag-category-form">
      <h3>{category ? 'Edit Tag Category' : 'Add New Tag Category'}</h3>
      
      <div className="form-group">
        <label htmlFor="name">Name <span className="required">*</span></label>
        <input
          type="text"
          id="name"
          className="input-field"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="gameId">Game ID <span className="required">*</span></label>
        <input
          type="text"
          id="gameId"
          className="input-field"
          value={formData.gameId || ''}
          onChange={(e) => handleInputChange('gameId', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="groupLabel">Group Label</label>
        <input
          type="text"
          id="groupLabel"
          className="input-field"
          value={formData.group?.label || ''}
          onChange={(e) => handleInputChange('group', { ...formData.group, label: e.target.value, value: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="precisionType">Precision Type</label>
        <select
          id="precisionType"
          className="select-field"
          value={formData.precisionType || EPrecisionType.LONG}
          onChange={(e) => handleInputChange('precisionType', e.target.value)}
        >
          <option value={EPrecisionType.LONG}>Long</option>
          <option value={EPrecisionType.SHORT}>Short</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          className="select-field"
          value={formData.status || ETagCategoryStatus.ACTIVE}
          onChange={(e) => handleInputChange('status', e.target.value)}
        >
          <option value={ETagCategoryStatus.ACTIVE}>Active</option>
          <option value={ETagCategoryStatus.INACTIVE}>Inactive</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.isParentTag || false}
            onChange={(e) => handleInputChange('isParentTag', e.target.checked)}
          />
          Is Parent Tag
        </label>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.isReplay || false}
            onChange={(e) => handleInputChange('isReplay', e.target.checked)}
          />
          Is Replay
        </label>
      </div>

      <div className="form-group">
        <label>Metadata Configuration</label>
        <MetadataConfigForm
          configs={formData.metadataConfig || []}
          onChange={handleMetadataConfigChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="button">
          {category ? 'Update' : 'Create'} Tag Category
        </button>
        <button type="button" className="button" onClick={onCancel} style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TagCategoryForm;
