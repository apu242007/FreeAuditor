import { apiClient } from './api';
import { Formulario, RespuestaFormulario } from '../types';

export const formService = {
  async getForms(): Promise<Formulario[]> {
    const response = await apiClient.get('/formularios');
    return response.data;
  },

  async getForm(id: string): Promise<Formulario> {
    const response = await apiClient.get(`/formularios/${id}`);
    return response.data;
  },

  async createForm(form: Omit<Formulario, 'id' | 'fechaCreacion' | 'fechaActualizacion'>): Promise<Formulario> {
    const response = await apiClient.post('/formularios', form);
    return response.data;
  },

  async updateForm(id: string, form: Partial<Formulario>): Promise<Formulario> {
    const response = await apiClient.put(`/formularios/${id}`, form);
    return response.data;
  },

  async deleteForm(id: string): Promise<void> {
    await apiClient.delete(`/formularios/${id}`);
  },

  async submitResponse(formId: string, respuesta: Omit<RespuestaFormulario, 'id' | 'fechaEnvio'>): Promise<RespuestaFormulario> {
    const response = await apiClient.post(`/formularios/${formId}/respuestas`, respuesta);
    return response.data;
  },

  async getFormResponses(formId: string): Promise<RespuestaFormulario[]> {
    const response = await apiClient.get(`/formularios/${formId}/respuestas`);
    return response.data;
  },
};