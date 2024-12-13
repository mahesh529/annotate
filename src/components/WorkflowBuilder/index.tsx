import React from 'react';
import { WorkflowCanvas } from './WorkflowCanvas';
import { NodePalette } from './NodePalette';
import { WorkflowToolbar } from './WorkflowToolbar';

export function WorkflowBuilder() {
  return (
    <div className="h-screen flex flex-col">
      <WorkflowToolbar />
      <div className="flex-1 flex">
        <div className="w-64 border-r">
          <NodePalette />
        </div>
        <div className="flex-1">
          <WorkflowCanvas />
        </div>
      </div>
    </div>
  );
}