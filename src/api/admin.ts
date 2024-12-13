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

export const getProjects = () => 
  api.get('/admin/projects').then(res => res.data);

export const getProjectById = (id: string) =>
  api.get(`/admin/projects/${id}`).then(res => res.data);

export const createProject = (data: any) =>
  api.post('/admin/projects', data).then(res => res.data);

export const updateProject = ({ id, ...data }: any) =>
  api.put(`/admin/projects/${id}`, data).then(res => res.data);

export const getAnnotators = () =>
  api.get('/admin/annotators').then(res => res.data);

export const updateAnnotatorStatus = (id: string, status: string) =>
  api.put(`/admin/annotators/${id}/status`, { status }).then(res => res.data);

export const assignTask = (data: any) =>
  api.post('/admin/tasks/assign', data).then(res => res.data);