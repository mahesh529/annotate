import { create } from 'zustand';
import { UXFlow, UXFlowNode, UXFlowEdge } from '../types/ux-flow';

interface UXFlowState {
  flows: UXFlow[];
  currentFlow: UXFlow | null;
  addFlow: (flow: UXFlow) => void;
  setCurrentFlow: (flow: UXFlow) => void;
  addNode: (node: UXFlowNode) => void;
  updateNode: (id: string, updates: Partial<UXFlowNode>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: UXFlowEdge) => void;
  updateEdge: (id: string, updates: Partial<UXFlowEdge>) => void;
  removeEdge: (id: string) => void;
}

export const useUXFlowStore = create<UXFlowState>((set) => ({
  flows: [],
  currentFlow: null,
  addFlow: (flow) => set((state) => ({ flows: [...state.flows, flow] })),
  setCurrentFlow: (flow) => set({ currentFlow: flow }),
  addNode: (node) =>
    set((state) => ({
      currentFlow: state.currentFlow
        ? {
            ...state.currentFlow,
            nodes: [...state.currentFlow.nodes, node],
          }
        : null,
    })),
  updateNode: (id, updates) =>
    set((state) => ({
      currentFlow: state.currentFlow
        ? {
            ...state.currentFlow,
            nodes: state.currentFlow.nodes.map((node) =>
              node.id === id ? { ...node, ...updates } : node
            ),
          }
        : null,
    })),
  removeNode: (id) =>
    set((state) => ({
      currentFlow: state.currentFlow
        ? {
            ...state.currentFlow,
            nodes: state.currentFlow.nodes.filter((node) => node.id !== id),
            edges: state.currentFlow.edges.filter(
              (edge) => edge.source !== id && edge.target !== id
            ),
          }
        : null,
    })),
  addEdge: (edge) =>
    set((state) => ({
      currentFlow: state.currentFlow
        ? {
            ...state.currentFlow,
            edges: [...state.currentFlow.edges, edge],
          }
        : null,
    })),
  updateEdge: (id, updates) =>
    set((state) => ({
      currentFlow: state.currentFlow
        ? {
            ...state.currentFlow,
            edges: state.currentFlow.edges.map((edge) =>
              edge.id === id ? { ...edge, ...updates } : edge
            ),
          }
        : null,
    })),
  removeEdge: (id) =>
    set((state) => ({
      currentFlow: state.currentFlow
        ? {
            ...state.currentFlow,
            edges: state.currentFlow.edges.filter((edge) => edge.id !== id),
          }
        : null,
    })),
}));