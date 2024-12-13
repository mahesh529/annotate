import { Request, Response } from 'express';
import Project from '../models/Project';
import Task from '../models/Task';
import User from '../models/User';

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error updating project' });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().populate('customer');
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching projects' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id).populate('customer');
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching project' });
  }
};

export const assignTask = async (req: Request, res: Response) => {
  try {
    const { projectId, nodeId, annotatorId, data } = req.body;
    const task = new Task({
      project: projectId,
      nodeId,
      assignedTo: annotatorId,
      data,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error assigning task' });
  }
};

export const getAnnotators = async (req: Request, res: Response) => {
  try {
    const annotators = await User.find({ role: 'annotator' });
    res.json(annotators);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching annotators' });
  }
};

export const updateAnnotatorStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const annotator = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(annotator);
  } catch (error) {
    res.status(400).json({ message: 'Error updating annotator status' });
  }
};