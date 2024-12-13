import express from 'express';
import { auth, isAdmin } from '../middleware/auth';
import {
  createProject,
  updateProject,
  getProjects,
  getProjectById,
  assignTask,
  getAnnotators,
  updateAnnotatorStatus,
} from '../controllers/admin';

const router = express.Router();

// Project management
router.post('/projects', auth, isAdmin, createProject);
router.put('/projects/:id', auth, isAdmin, updateProject);
router.get('/projects', auth, isAdmin, getProjects);
router.get('/projects/:id', auth, isAdmin, getProjectById);

// Task management
router.post('/tasks/assign', auth, isAdmin, assignTask);

// Annotator management
router.get('/annotators', auth, isAdmin, getAnnotators);
router.put('/annotators/:id/status', auth, isAdmin, updateAnnotatorStatus);

export default router;