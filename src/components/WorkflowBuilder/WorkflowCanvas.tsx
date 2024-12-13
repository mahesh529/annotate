import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Edge,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore } from '../../store/workflowStore';
import { CustomNode } from './CustomNode';
import { NodeType } from '../../types/workflow';

const nodeTypes = {
  customNode: CustomNode,
};

function WorkflowCanvasInner() {
  const { currentWorkflow, addEdge: addWorkflowEdge, addNode } = useWorkflowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();

  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge: Edge = {
        id: `e${connection.source}-${connection.target}`,
        source: connection.source!,
        target: connection.target!,
      };
      addWorkflowEdge(newEdge);
    },
    [addWorkflowEdge]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'string' && reactFlowBounds) {
        const position = project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const newNode = {
          id: `${type}-${Date.now()}`,
          type: 'customNode',
          position,
          data: {
            label: type.charAt(0).toUpperCase() + type.slice(1),
            type: type as NodeType,
            description: `${type.charAt(0).toUpperCase() + type.slice(1)} stage`,
          },
        };

        addNode(newNode);
      }
    },
    [project, addNode]
  );

  if (!currentWorkflow) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No workflow selected</p>
      </div>
    );
  }

  return (
    <div ref={reactFlowWrapper} className="h-full w-full">
      <ReactFlow
        nodes={currentWorkflow.nodes}
        edges={currentWorkflow.edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner />
    </ReactFlowProvider>
  );
}