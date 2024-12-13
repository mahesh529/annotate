import { create } from 'zustand';
import { login as apiLogin, register as apiRegister } from '../api/auth';

interface AuthState {
  user: any;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  
  login: async (credentials) => {
    const { token, user } = await apiLogin(credentials);
    localStorage.setItem('token', token);
    set({ token, user });
  },
  
  register: async (userData) => {
    const { token, user } = await apiRegister(userData);
    localStorage.setItem('token', token);
    set({ token, user });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));