import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Settings2, Trash2 } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import { NodeConfigModal } from './NodeConfigModal';
import { NodeType } from '../../types/workflow';

export const CustomNode = memo(({ data, id }: NodeProps) => {
  const [showConfig, setShowConfig] = useState(false);
  const { removeNode, updateNode } = useWorkflowStore();

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'input':
        return 'bg-green-100 border-green-500';
      case 'annotation':
        return 'bg-blue-100 border-blue-500';
      case 'review':
        return 'bg-yellow-100 border-yellow-500';
      case 'validation':
        return 'bg-purple-100 border-purple-500';
      case 'export':
        return 'bg-red-100 border-red-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  const handleConfigSave = (config: Record<string, any>) => {
    updateNode(id, {
      data: {
        ...data,
        config,
      },
    });
  };

  return (
    <>
      <div
        className={`px-4 py-2 rounded-lg shadow-md border-2 ${getNodeColor(
          data.type
        )}`}
      >
        <Handle type="target" position={Position.Top} className="w-3 h-3" />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{data.label}</h3>
            {data.description && (
              <p className="text-sm text-gray-600">{data.description}</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfig(true)}
              className="p-1 hover:bg-gray-200 rounded-full"
              title="Settings"
            >
              <Settings2 size={16} />
            </button>
            <button
              onClick={() => removeNode(id)}
              className="p-1 hover:bg-gray-200 rounded-full"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      </div>

      <NodeConfigModal
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
        nodeType={data.type as NodeType}
        initialConfig={data.config}
        onSave={handleConfigSave}
      />
    </>
  );
});

CustomNode.displayName = 'CustomNode';