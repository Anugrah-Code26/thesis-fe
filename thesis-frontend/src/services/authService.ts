import api from './api';
import { AuthResponse, LoginDTO, RegisterDTO, User } from '../types';

export const login = async (credentials: LoginDTO): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const register = async (userData: RegisterDTO): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data;
};