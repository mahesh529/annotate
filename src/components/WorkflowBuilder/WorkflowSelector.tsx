import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';

export function WorkflowSelector() {
  const { workflows, currentWorkflow, setCurrentWorkflow } = useWorkflowStore();

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700">Current Workflow:</label>
      <select
        value={currentWorkflow?.id || ''}
        onChange={(e) => {
          const selected = workflows.find((w) => w.id === e.target.value);
          if (selected) setCurrentWorkflow(selected);
        }}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select a workflow...</option>
        {workflows.map((workflow) => (
          <option key={workflow.id} value={workflow.id}>
            {workflow.name}
          </option>
        ))}
      </select>
    </div>
  );
}