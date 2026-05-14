import { mockBeneficiarios } from '../mocks/mockData';
import type { Beneficiario } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { apiDelete, apiGet, apiPost, apiPut, isApiEnabled } from './api';

const KEY = 'centraldobem_beneficiarios';
const read = () => loadFromStorage<Beneficiario[]>(KEY, mockBeneficiarios);
const write = (data: Beneficiario[]) => saveToStorage(KEY, data);
const nextId = (items: Beneficiario[]) => Math.max(0, ...items.map((i) => i.id ?? 0)) + 1;

export const beneficiarioService = {
  listar: async () => (isApiEnabled() ? apiGet<Beneficiario[]>('/beneficiarios') : read()),
  buscarPorId: async (id: number) => (isApiEnabled() ? apiGet<Beneficiario>(`/beneficiarios/${id}`) : read().find((i) => i.id === id) as Beneficiario),
  criar: async (payload: Beneficiario) => {
    if (isApiEnabled()) return apiPost<Beneficiario, Beneficiario>('/beneficiarios', payload);
    const items = read(); const created = { ...payload, id: nextId(items) }; write([...items, created]); return created;
  },
  atualizar: async (id: number, payload: Beneficiario) => {
    if (isApiEnabled()) return apiPut<Beneficiario, Beneficiario>(`/beneficiarios/${id}`, payload);
    const items = read(); const updated = { ...payload, id }; write(items.map((i) => (i.id === id ? updated : i))); return updated;
  },
  remover: async (id: number) => { if (isApiEnabled()) return apiDelete(`/beneficiarios/${id}`); write(read().filter((i) => i.id !== id)); },
};
