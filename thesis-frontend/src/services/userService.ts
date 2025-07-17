import api from './api';
import { User, UserRole, UserDTO, ListParams } from '../types';

export const getUsers = async (params?: ListParams): Promise<User[]> => {
  return api.get('/users', { params });
};

export const getUserById = async (id: string): Promise<User> => {
  return api.get(`/users/${id}`);
};

export const getUsersByRole = async (role: UserRole): Promise<User[]> => {
  return api.get('/users', { params: { role } });
};

export const createUser = async (userData: UserDTO): Promise<User> => {
  return api.post('/users', userData);
};

export const updateUser = async (id: string, userData: Partial<UserDTO>): Promise<User> => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = async (id: string): Promise<void> => {
  return api.delete(`/users/${id}`);
};