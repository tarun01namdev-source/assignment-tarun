import React, { useState } from 'react';
import { IMetadataConfig, EMetadataComponent, EMetadataInputType, EMetadataSelectMode, IOption } from '../../types/interfaces';

interface MetadataConfigFormProps {
  configs: IMetadataConfig[];
  onChange: (configs: IMetadataConfig[]) => void;
}

const MetadataConfigForm: React.FC<MetadataConfigFormProps> = ({ configs, onChange }) => {
  const [newConfig, setNewConfig] = useState<Partial<IMetadataConfig>>({
    component: EMetadataComponent.INPUT,
    key: '',
    label: '',
    required: false,
    readOnly: false,
    type: EMetadataInputType.TEXT,
    mode: EMetadataSelectMode.OPTIONS,
    multiple: false,
    options: [],
    query: ''
  });

  const handleAddConfig = () => {
    if (!newConfig.key || !newConfig.label) {
      alert('Please fill in key and label');
      return;
    }

    const config: IMetadataConfig = {
      component: newConfig.component!,
      key: newConfig.key!,
      label: newConfig.label!,
      required: newConfig.required || false,
      readOnly: newConfig.readOnly || false,
      type: newConfig.type,
      mode: newConfig.mode,
      multiple: newConfig.multiple || false,
      options: newConfig.options || [],
      query: newConfig.query
    };

    onChange([...configs, config]);
    setNewConfig({
      component: EMetadataComponent.INPUT,
      key: '',
      label: '',
      required: false,
      readOnly: false,
      type: EMetadataInputType.TEXT,
      mode: EMetadataSelectMode.OPTIONS,
      multiple: false,
      options: [],
      query: ''
    });
  };

  const handleRemoveConfig = (index: number) => {
    const updatedConfigs = configs.filter((_, i) => i !== index);
    onChange(updatedConfigs);
  };

  const handleConfigChange = (index: number, field: string, value: any) => {
    const updatedConfigs = configs.map((config, i) => 
      i === index ? { ...config, [field]: value } : config
    );
    onChange(updatedConfigs);
  };

  const handleOptionChange = (configIndex: number, optionIndex: number, field: string, value: string) => {
    const updatedConfigs = configs.map((config, i) => {
      if (i === configIndex && config.options) {
        const updatedOptions = config.options.map((option, j) => 
          j === optionIndex ? { ...option, [field]: value } : option
        );
        return { ...config, options: updatedOptions };
      }
      return config;
    });
    onChange(updatedConfigs);
  };

  const addOption = (configIndex: number) => {
    const updatedConfigs = configs.map((config, i) => {
      if (i === configIndex) {
        const newOption: IOption = { label: '', value: '' };
        return { ...config, options: [...(config.options || []), newOption] };
      }
      return config;
    });
    onChange(updatedConfigs);
  };

  const removeOption = (configIndex: number, optionIndex: number) => {
    const updatedConfigs = configs.map((config, i) => {
      if (i === configIndex && config.options) {
        const updatedOptions = config.options.filter((_, j) => j !== optionIndex);
        return { ...config, options: updatedOptions };
      }
      return config;
    });
    onChange(updatedConfigs);
  };

  return (
    <div className="metadata-config-form">
      <h4>Metadata Configuration</h4>
      
      {/* Existing Configs */}
      {configs.map((config, index) => (
        <div key={index} className="config-item card" style={{ marginBottom: '15px', padding: '15px' }}>
          <div className="config-header">
            <h5>Field {index + 1}: {config.label}</h5>
            <button
              type="button"
              className="button"
              onClick={() => handleRemoveConfig(index)}
              style={{ backgroundColor: '#dc3545', fontSize: '12px', padding: '5px 10px' }}
            >
              Remove
            </button>
          </div>
          
          <div className="config-fields">
            <div className="form-group">
              <label>Component Type</label>
              <select
                className="select-field"
                value={config.component}
                onChange={(e) => handleConfigChange(index, 'component', e.target.value)}
              >
                <option value={EMetadataComponent.INPUT}>Input</option>
                <option value={EMetadataComponent.SELECT}>Select</option>
              </select>
            </div>

            <div className="form-group">
              <label>Key</label>
              <input
                type="text"
                className="input-field"
                value={config.key}
                onChange={(e) => handleConfigChange(index, 'key', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Label</label>
              <input
                type="text"
                className="input-field"
                value={config.label}
                onChange={(e) => handleConfigChange(index, 'label', e.target.value)}
              />
            </div>

            {config.component === EMetadataComponent.INPUT && (
              <div className="form-group">
                <label>Input Type</label>
                <select
                  className="select-field"
                  value={config.type || EMetadataInputType.TEXT}
                  onChange={(e) => handleConfigChange(index, 'type', e.target.value)}
                >
                  <option value={EMetadataInputType.TEXT}>Text</option>
                  <option value={EMetadataInputType.NUMBER}>Number</option>
                </select>
              </div>
            )}

            {config.component === EMetadataComponent.SELECT && (
              <>
                <div className="form-group">
                  <label>Select Mode</label>
                  <select
                    className="select-field"
                    value={config.mode || EMetadataSelectMode.OPTIONS}
                    onChange={(e) => handleConfigChange(index, 'mode', e.target.value)}
                  >
                    <option value={EMetadataSelectMode.OPTIONS}>Options</option>
                    <option value={EMetadataSelectMode.QUERY}>Query</option>
                  </select>
                </div>

                {config.mode === EMetadataSelectMode.QUERY && (
                  <div className="form-group">
                    <label>Query</label>
                    <input
                      type="text"
                      className="input-field"
                      value={config.query || ''}
                      onChange={(e) => handleConfigChange(index, 'query', e.target.value)}
                    />
                  </div>
                )}

                {config.mode === EMetadataSelectMode.OPTIONS && (
                  <div className="form-group">
                    <label>Options</label>
                    {config.options?.map((option, optionIndex) => (
                      <div key={optionIndex} className="option-item" style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                        <input
                          type="text"
                          placeholder="Label"
                          value={option.label}
                          onChange={(e) => handleOptionChange(index, optionIndex, 'label', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={option.value}
                          onChange={(e) => handleOptionChange(index, optionIndex, 'value', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(index, optionIndex)}
                          style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="button"
                      onClick={() => addOption(index)}
                      style={{ fontSize: '12px', padding: '5px 10px' }}
                    >
                      Add Option
                    </button>
                  </div>
                )}

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={config.multiple || false}
                      onChange={(e) => handleConfigChange(index, 'multiple', e.target.checked)}
                    />
                    Multiple Selection
                  </label>
                </div>
              </>
            )}

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={config.required || false}
                  onChange={(e) => handleConfigChange(index, 'required', e.target.checked)}
                />
                Required
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={config.readOnly || false}
                  onChange={(e) => handleConfigChange(index, 'readOnly', e.target.checked)}
                />
                Read Only
              </label>
            </div>
          </div>
        </div>
      ))}

      {/* Add New Config */}
      <div className="add-config-section card" style={{ padding: '15px' }}>
        <h5>Add New Metadata Field</h5>
        <div className="form-group">
          <label>Component Type</label>
          <select
            className="select-field"
            value={newConfig.component}
            onChange={(e) => setNewConfig({ ...newConfig, component: e.target.value as EMetadataComponent })}
          >
            <option value={EMetadataComponent.INPUT}>Input</option>
            <option value={EMetadataComponent.SELECT}>Select</option>
          </select>
        </div>

        <div className="form-group">
          <label>Key</label>
          <input
            type="text"
            className="input-field"
            value={newConfig.key}
            onChange={(e) => setNewConfig({ ...newConfig, key: e.target.value })}
            placeholder="Enter field key"
          />
        </div>

        <div className="form-group">
          <label>Label</label>
          <input
            type="text"
            className="input-field"
            value={newConfig.label}
            onChange={(e) => setNewConfig({ ...newConfig, label: e.target.value })}
            placeholder="Enter field label"
          />
        </div>

        <button
          type="button"
          className="button"
          onClick={handleAddConfig}
          style={{ marginTop: '10px' }}
        >
          Add Metadata Field
        </button>
      </div>
    </div>
  );
};

export default MetadataConfigForm;
