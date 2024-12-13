import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAssignedTasks = () =>
  api.get('/annotator/tasks').then(res => res.data);

export const getTaskById = (id: string) =>
  api.get(`/annotator/tasks/${id}`).then(res => res.data);

export const updateTaskAnnotations = ({ taskId, annotations }: any) =>
  api.put(`/annotator/tasks/${taskId}/annotations`, { annotations }).then(res => res.data);

export const submitTask = (taskId: string) =>
  api.put(`/annotator/tasks/${taskId}/submit`).then(res => res.data);