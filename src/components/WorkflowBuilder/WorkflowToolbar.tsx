import React, { useState } from 'react';
import { Save, Plus, Download, Upload, Edit } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import { WorkflowSelector } from './WorkflowSelector';

export function WorkflowToolbar() {
  const { addWorkflow, currentWorkflow, setCurrentWorkflow } = useWorkflowStore();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');

  const createNewWorkflow = () => {
    const newWorkflow = {
      id: `workflow-${Date.now()}`,
      name: 'New Workflow',
      nodes: [],
      edges: [],
    };
    addWorkflow(newWorkflow);
    setCurrentWorkflow(newWorkflow);
  };

  const saveWorkflow = () => {
    if (currentWorkflow) {
      localStorage.setItem(
        `workflow-${currentWorkflow.id}`,
        JSON.stringify(currentWorkflow)
      );
    }
  };

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentWorkflow && newName) {
      setCurrentWorkflow({ ...currentWorkflow, name: newName });
      setIsRenaming(false);
      setNewName('');
    }
  };

  return (
    <div className="p-4 border-b flex items-center justify-between bg-white">
      <div className="flex items-center space-x-4">
        <button
          onClick={createNewWorkflow}
          className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={18} className="mr-1" />
          New Workflow
        </button>
        <WorkflowSelector />
        {currentWorkflow && !isRenaming && (
          <button
            onClick={() => {
              setNewName(currentWorkflow.name);
              setIsRenaming(true);
            }}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <Edit size={18} className="mr-1" />
          </button>
        )}
        {isRenaming && (
          <form onSubmit={handleRename} className="flex items-center">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-2 py-1 border rounded-md"
              autoFocus
            />
            <button
              type="submit"
              className="ml-2 px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
          </form>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={saveWorkflow}
          className="flex items-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          disabled={!currentWorkflow}
        >
          <Save size={18} className="mr-1" />
          Save
        </button>
        {/* Export and Import buttons remain the same */}
      </div>
    </div>
  );
}