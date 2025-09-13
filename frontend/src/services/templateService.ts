import api from './api';
import { Template } from '../types';

export const templateService = {
  async getAll(): Promise<Template[]> {
    const response = await api.get('/templates');
    return response.data;
  },

  async getById(id: string): Promise<Template> {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  },

  async create(template: any): Promise<Template> {
    const response = await api.post('/templates', template);
    return response.data;
  },

  async update(id: string, template: any): Promise<Template> {
    const response = await api.patch(`/templates/${id}`, template);
    return response.data;
  },

  async duplicate(id: string): Promise<Template> {
    const response = await api.post(`/templates/${id}/duplicate`);
    return response.data;
  },

  async archive(id: string): Promise<Template> {
    const response = await api.patch(`/templates/${id}/archive`);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/templates/${id}`);
  },
};