import type { Beneficiario, DashboardResumo, Dentista, Doacao, Doador, Triagem, Voluntario } from '../types';

export const mockBeneficiarios: Beneficiario[] = [
  { id: 1, nome: 'Ana Souza', cpf: '123.456.789-00', idade: 12, telefone: '(11) 98888-1111', email: 'ana@email.com', status: 'AGUARDANDO_TRIAGEM' },
  { id: 2, nome: 'Bruno Lima', cpf: '987.654.321-00', idade: 16, telefone: '(11) 97777-2222', email: 'bruno@email.com', status: 'EM_ATENDIMENTO' },
];
export const mockDentistas: Dentista[] = [
  { id: 1, nome: 'Dra. Camila', cro: 'CRO-SP 12345', especialidade: 'Ortodontia', telefone: '(11) 96666-1111', email: 'camila@clinic.com', disponivel: true },
  { id: 2, nome: 'Dr. Renato', cro: 'CRO-SP 54321', especialidade: 'Clínico Geral', telefone: '(11) 95555-2222', email: 'renato@clinic.com', disponivel: false },
];
export const mockDoadores: Doador[] = [
  { id: 1, nome: 'João Pedro', cpfCnpj: '111.222.333-44', telefone: '(11) 94444-1111', email: 'joao@exemplo.com', tipo: 'PESSOA_FISICA' },
  { id: 2, nome: 'Empresa Sorriso', cpfCnpj: '12.345.678/0001-99', telefone: '(11) 93333-2222', email: 'contato@sorriso.com', tipo: 'PESSOA_JURIDICA' },
];
export const mockDoacoes: Doacao[] = [
  { id: 1, doadorId: 1, valor: 300, data: '2026-05-01', finalidade: 'Materiais odontológicos' },
  { id: 2, doadorId: 2, valor: 1200, data: '2026-05-10', finalidade: 'Campanha de triagem' },
];
export const mockVoluntarios: Voluntario[] = [
  { id: 1, nome: 'Fernanda Alves', areaAtuacao: 'Atendimento social', telefone: '(11) 92222-1111', email: 'fernanda@voluntario.com', ativo: true },
  { id: 2, nome: 'Lucas Rocha', areaAtuacao: 'Triagem inicial', telefone: '(11) 91111-2222', email: 'lucas@voluntario.com', ativo: true },
];
export const mockTriagens: Triagem[] = [
  { id: 1, beneficiarioId: 1, voluntarioId: 2, dataTriagem: '2026-05-12', prioridade: 'ALTA', observacao: 'Dor persistente', encaminhamento: 'Encaminhar para clínico geral' },
];

export const mockDashboardResumo: DashboardResumo = {
  totalBeneficiarios: mockBeneficiarios.length,
  totalDentistas: mockDentistas.length,
  totalVoluntarios: mockVoluntarios.length,
  totalDoadores: mockDoadores.length,
  totalDoacoes: mockDoacoes.length,
  totalTriagens: mockTriagens.length,
  beneficiariosEmAtendimento: mockBeneficiarios.filter((b) => b.status === 'EM_ATENDIMENTO').length,
  beneficiariosAguardandoTriagem: mockBeneficiarios.filter((b) => b.status === 'AGUARDANDO_TRIAGEM').length,
};
