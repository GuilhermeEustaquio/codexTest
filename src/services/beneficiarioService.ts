import { apiDelete, apiGet, apiPost, apiPut, isApiEnabled } from './api';
import { mockBeneficiarios } from '../mocks/mockData';
import type { Beneficiario } from '../types';

let cache = [...mockBeneficiarios];
const nextId = () => Math.max(0, ...cache.map((i) => i.id ?? 0)) + 1;

export const beneficiarioService = {
  listar: async (): Promise<Beneficiario[]> => (isApiEnabled() ? apiGet('/beneficiarios') : [...cache]),
  buscarPorId: async (id: number): Promise<Beneficiario> => (isApiEnabled() ? apiGet(`/beneficiarios/${id}`) : cache.find((i) => i.id === id) as Beneficiario),
  criar: async (payload: Beneficiario): Promise<Beneficiario> => {
    if (isApiEnabled()) return apiPost('/beneficiarios', payload);
    const created = { ...payload, id: nextId() }; cache = [...cache, created]; return created;
  },
  atualizar: async (id: number, payload: Beneficiario): Promise<Beneficiario> => {
    if (isApiEnabled()) return apiPut(`/beneficiarios/${id}`, payload);
    const updated = { ...payload, id }; cache = cache.map((i) => (i.id === id ? updated : i)); return updated;
  },
  remover: async (id: number): Promise<void> => { if (isApiEnabled()) return apiDelete(`/beneficiarios/${id}`); cache = cache.filter((i) => i.id !== id); },
};
