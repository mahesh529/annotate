import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  project: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  nodeId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  data: any;
  annotations: Array<{
    fieldId: string;
    value: any;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    nodeId: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'rejected'],
      default: 'pending',
    },
    data: Schema.Types.Mixed,
    annotations: [
      {
        fieldId: String,
        value: Schema.Types.Mixed,
        timestamp: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);