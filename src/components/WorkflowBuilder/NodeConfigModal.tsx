import React, { useState } from 'react';
import { X } from 'lucide-react';
import { NodeType } from '../../types/workflow';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nodeType: NodeType;
  initialConfig?: Record<string, any>;
  onSave: (config: Record<string, any>) => void;
}

const configFields: Record<NodeType, Array<{ key: string; label: string; type: string }>> = {
  input: [
    { key: 'dataSource', label: 'Data Source', type: 'text' },
    { key: 'format', label: 'Data Format', type: 'select', options: ['JSON', 'CSV', 'XML'] },
    { key: 'batchSize', label: 'Batch Size', type: 'number' },
  ],
  annotation: [
    { key: 'instructions', label: 'Instructions', type: 'textarea' },
    { key: 'timeLimit', label: 'Time Limit (minutes)', type: 'number' },
    { key: 'requiredFields', label: 'Required Fields', type: 'text' },
  ],
  review: [
    { key: 'minReviewers', label: 'Minimum Reviewers', type: 'number' },
    { key: 'consensusThreshold', label: 'Consensus Threshold (%)', type: 'number' },
  ],
  validation: [
    { key: 'validationRules', label: 'Validation Rules', type: 'textarea' },
    { key: 'autoReject', label: 'Auto-reject Invalid', type: 'checkbox' },
  ],
  export: [
    { key: 'exportFormat', label: 'Export Format', type: 'select', options: ['JSON', 'CSV', 'XML'] },
    { key: 'destination', label: 'Export Destination', type: 'text' },
  ],
};

export function NodeConfigModal({ isOpen, onClose, nodeType, initialConfig = {}, onSave }: Props) {
  const [config, setConfig] = useState<Record<string, any>>(initialConfig);

  if (!isOpen) return null;

  const fields = configFields[nodeType] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Configure {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ key, label, type, options }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              {type === 'textarea' ? (
                <textarea
                  value={config[key] || ''}
                  onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              ) : type === 'select' ? (
                <select
                  value={config[key] || ''}
                  onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  {options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : type === 'checkbox' ? (
                <input
                  type="checkbox"
                  checked={config[key] || false}
                  onChange={(e) => setConfig({ ...config, [key]: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              ) : (
                <input
                  type={type}
                  value={config[key] || ''}
                  onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
}