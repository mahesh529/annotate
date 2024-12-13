import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  customer: mongoose.Types.ObjectId;
  workflow: {
    nodes: Array<{
      id: string;
      type: string;
      position: { x: number; y: number };
      data: any;
    }>;
    edges: Array<{
      id: string;
      source: string;
      target: string;
      data?: any;
    }>;
  };
  forms: Array<{
    nodeId: string;
    config: {
      fields: Array<{
        id: string;
        label: string;
        type: string;
        defaultValue: any;
        visible: boolean;
        options?: string[];
      }>;
      rules: Array<{
        sourceFieldId: string;
        event: string;
        action: string;
        targetFieldId: string;
        impact?: any;
      }>;
    };
  }>;
  status: 'active' | 'completed' | 'paused';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    workflow: {
      nodes: [
        {
          id: String,
          type: String,
          position: {
            x: Number,
            y: Number,
          },
          data: Schema.Types.Mixed,
        },
      ],
      edges: [
        {
          id: String,
          source: String,
          target: String,
          data: Schema.Types.Mixed,
        },
      ],
    },
    forms: [
      {
        nodeId: String,
        config: {
          fields: [
            {
              id: String,
              label: String,
              type: String,
              defaultValue: Schema.Types.Mixed,
              visible: Boolean,
              options: [String],
            },
          ],
          rules: [
            {
              sourceFieldId: String,
              event: String,
              action: String,
              targetFieldId: String,
              impact: Schema.Types.Mixed,
            },
          ],
        },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'completed', 'paused'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);