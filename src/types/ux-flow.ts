import { Edge } from 'reactflow';

export type FlowNodeType = 
  | 'screen' 
  | 'action' 
  | 'decision' 
  | 'api' 
  | 'notification'
  | 'modal'
  | 'form';

export interface UXFlowNode {
  id: string;
  type: FlowNodeType;
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    config?: UXNodeConfig;
  };
}

export interface UXNodeConfig {
  // Screen Configuration
  layout?: 'default' | 'fullwidth' | 'centered';
  components?: Array<{
    type: string;
    props: Record<string, any>;
  }>;
  
  // Action Configuration
  actionType?: 'navigation' | 'submit' | 'api' | 'custom';
  handler?: string;
  
  // Decision Configuration
  conditions?: Array<{
    field: string;
    operator: 'equals' | 'contains' | 'greater' | 'less';
    value: any;
  }>;
  
  // API Configuration
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  
  // Notification Configuration
  notificationType?: 'success' | 'error' | 'warning' | 'info';
  message?: string;
  duration?: number;
  
  // Modal Configuration
  modalSize?: 'sm' | 'md' | 'lg' | 'xl';
  modalTitle?: string;
  
  // Form Configuration
  fields?: Array<{
    name: string;
    label: string;
    type: string;
    validation?: Record<string, any>;
  }>;
}

export interface UXFlowEdge extends Edge {
  data?: {
    condition?: string;
    animation?: 'none' | 'dash' | 'dots';
    style?: 'solid' | 'dashed' | 'dotted';
  };
}

export interface UXFlow {
  id: string;
  name: string;
  nodes: UXFlowNode[];
  edges: UXFlowEdge[];
  metadata?: {
    description?: string;
    version?: string;
    lastModified?: string;
    author?: string;
  };
}