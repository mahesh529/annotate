import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
});

export const login = (credentials: { email: string; password: string }) =>
  api.post('/auth/login', credentials).then(res => res.data);

export const register = (userData: any) =>
  api.post('/auth/register', userData).then(res => res.data);