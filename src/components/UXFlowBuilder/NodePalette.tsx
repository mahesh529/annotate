import React from 'react';
import {
  Monitor,
  MousePointer,
  GitFork,
  Globe,
  Bell,
  Maximize2,
  FormInput,
} from 'lucide-react';

const nodeTypes = [
  {
    type: 'screen',
    label: 'Screen',
    icon: Monitor,
    description: 'Main application screen',
  },
  {
    type: 'action',
    label: 'Action',
    icon: MousePointer,
    description: 'User interaction',
  },
  {
    type: 'decision',
    label: 'Decision',
    icon: GitFork,
    description: 'Conditional flow',
  },
  {
    type: 'api',
    label: 'API Call',
    icon: Globe,
    description: 'External service integration',
  },
  {
    type: 'notification',
    label: 'Notification',
    icon: Bell,
    description: 'User feedback',
  },
  {
    type: 'modal',
    label: 'Modal',
    icon: Maximize2,
    description: 'Popup dialog',
  },
  {
    type: 'form',
    label: 'Form',
    icon: FormInput,
    description: 'Data collection',
  },
];

export function NodePalette() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">UX Components</h2>
      <div className="space-y-2">
        {nodeTypes.map(({ type, label, icon: Icon, description }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-move"
          >
            <Icon className="mr-2" size={20} />
            <div>
              <p className="font-medium">{label}</p>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}