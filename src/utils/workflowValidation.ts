import { Edge, Node } from 'reactflow';
import { NodeType } from '../types/workflow';

export function validateWorkflow(nodes: Node[], edges: Edge[]): string[] {
  const errors: string[] = [];

  // Check for input nodes
  const inputNodes = nodes.filter((node) => node.data.type === 'input');
  if (inputNodes.length === 0) {
    errors.push('Workflow must have at least one input node');
  }

  // Check for export nodes
  const exportNodes = nodes.filter((node) => node.data.type === 'export');
  if (exportNodes.length === 0) {
    errors.push('Workflow must have at least one export node');
  }

  // Check for disconnected nodes
  const connectedNodeIds = new Set<string>();
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  nodes.forEach((node) => {
    if (!connectedNodeIds.has(node.id)) {
      errors.push(`Node "${node.data.label}" is disconnected`);
    }
  });

  // Check for cycles
  if (hasCycle(nodes, edges)) {
    errors.push('Workflow contains cycles, which are not allowed');
  }

  return errors;
}

function hasCycle(nodes: Node[], edges: Edge[]): boolean {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function dfs(nodeId: string): boolean {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
    for (const edge of outgoingEdges) {
      if (!visited.has(edge.target)) {
        if (dfs(edge.target)) return true;
      } else if (recursionStack.has(edge.target)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) return true;
    }
  }

  return false;
}