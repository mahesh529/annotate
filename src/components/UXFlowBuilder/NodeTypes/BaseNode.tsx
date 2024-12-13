import React, { useState } from 'react';
import { Settings2, Trash2 } from 'lucide-react';
import { useUXFlowStore } from '../../../store/uxFlowStore';
import { NodeConfigModal } from '../NodeConfigModal';

interface BaseNodeProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  type: string;
  id: string;
  className?: string;
  children?: React.ReactNode;
}

export function BaseNode({
  icon,
  title,
  description,
  type,
  id,
  className = '',
  children,
}: BaseNodeProps) {
  const [showConfig, setShowConfig] = useState(false);
  const { removeNode } = useUXFlowStore();

  return (
    <>
      <div className={`px-4 py-2 rounded-lg shadow-md border-2 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <h3 className="font-semibold">{title}</h3>
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
            </div>
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
        {children}
      </div>

      <NodeConfigModal
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
        nodeType={type}
        nodeId={id}
      />
    </>
  );
}