import { ITagCategory, IMetadataConfig, IOption } from '../types/interfaces';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const validateTagCategory = (category: Partial<ITagCategory>): string[] => {
  const errors: string[] = [];

  if (!category.name?.trim()) {
    errors.push('Name is required');
  }

  if (!category.gameId?.trim()) {
    errors.push('Game ID is required');
  }

  if (!category.group?.label?.trim()) {
    errors.push('Group label is required');
  }

  if (category.metadataConfig && category.metadataConfig.length > 0) {
    category.metadataConfig.forEach((config, index) => {
      if (!config.key?.trim()) {
        errors.push(`Metadata config ${index + 1}: Key is required`);
      }
      if (!config.label?.trim()) {
        errors.push(`Metadata config ${index + 1}: Label is required`);
      }
    });
  }

  return errors;
};

export const createDefaultMetadataConfig = (): IMetadataConfig => {
  return {
    component: 'input' as any,
    key: '',
    label: '',
    required: false,
    readOnly: false,
    type: 'text' as any
  };
};

export const createDefaultOption = (): IOption => {
  return {
    label: '',
    value: ''
  };
};

export const cloneTagCategory = (category: ITagCategory): ITagCategory => {
  return {
    ...category,
    id: generateId(),
    createdAt: Date.now(),
    lastUpdatedAt: Date.now(),
    name: `${category.name} (Copy)`
  };
};
