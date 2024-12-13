import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import {
  FileInput,
  PenTool,
  CheckCircle2,
  ShieldCheck,
  FileOutput,
} from 'lucide-react';

const nodeTypes = [
  {
    type: 'input',
    label: 'Input',
    icon: FileInput,
    description: 'Data input stage',
  },
  {
    type: 'annotation',
    label: 'Annotation',
    icon: PenTool,
    description: 'Annotation tasks',
  },
  {
    type: 'review',
    label: 'Review',
    icon: CheckCircle2,
    description: 'Expert review',
  },
  {
    type: 'validation',
    label: 'Validation',
    icon: ShieldCheck,
    description: 'Quality validation',
  },
  {
    type: 'export',
    label: 'Export',
    icon: FileOutput,
    description: 'Export results',
  },
];

export function NodePalette() {
  const addNode = useWorkflowStore((state) => state.addNode);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Workflow Stages</h2>
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