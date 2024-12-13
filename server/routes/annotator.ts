import express from 'express';
import { auth } from '../middleware/auth';
import {
  getAssignedTasks,
  getTaskById,
  updateTaskAnnotations,
  submitTask,
} from '../controllers/annotator';

const router = express.Router();

router.get('/tasks', auth, getAssignedTasks);
router.get('/tasks/:id', auth, getTaskById);
router.put('/tasks/:id/annotations', auth, updateTaskAnnotations);
router.put('/tasks/:id/submit', auth, submitTask);

export default router;