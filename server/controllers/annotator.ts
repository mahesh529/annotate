import { Request, Response } from 'express';
import Task from '../models/Task';

interface AuthRequest extends Request {
  user?: any;
}

export const getAssignedTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .populate('project')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tasks' });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    }).populate('project');
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching task' });
  }
};

export const updateTaskAnnotations = async (req: AuthRequest, res: Response) => {
  try {
    const { annotations } = req.body;
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        assignedTo: req.user._id,
      },
      {
        $push: {
          annotations: {
            $each: annotations.map((a: any) => ({
              ...a,
              timestamp: new Date(),
            })),
          },
        },
      },
      { new: true }
    );
    
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error updating annotations' });
  }
};

export const submitTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        assignedTo: req.user._id,
      },
      { status: 'completed' },
      { new: true }
    );
    
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting task' });
  }
};