export interface NavItem {
  label: string;
  path: string;
}

export interface TeamMember {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
}

export interface SolutionItem {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  objetivo: string;
  tag: string;
  publicoAlvo: string;
  funcionalidades: string[];
  beneficios: string[];
  tecnologias: string[];
}

export interface ContactFormValues {
  nome: string;
  email: string;
  telefone?: string;
  mensagem: string;
}

export interface Beneficiario {
  id?: number;
  nome: string;
  cpf: string;
  idade: number;
  telefone: string;
  email: string;
  status: 'AGUARDANDO_TRIAGEM' | 'EM_ATENDIMENTO' | 'FINALIZADO';
}

export interface Dentista {
  id?: number;
  nome: string;
  cro: string;
  especialidade: string;
  telefone: string;
  email: string;
  disponivel: boolean;
}

export interface Doador {
  id?: number;
  nome: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  tipo: 'PESSOA_FISICA' | 'PESSOA_JURIDICA';
}

export interface Doacao {
  id?: number;
  doadorId: number;
  valor: number;
  data: string;
  finalidade: string;
}

export interface Voluntario {
  id?: number;
  nome: string;
  areaAtuacao: string;
  telefone: string;
  email: string;
  ativo: boolean;
}

export interface Triagem {
  id?: number;
  beneficiarioId: number;
  voluntarioId: number;
  dataTriagem: string;
  prioridade: 'BAIXA' | 'MEDIA' | 'ALTA';
  observacao: string;
  encaminhamento: string;
}

export interface DashboardResumo {
  totalBeneficiarios: number;
  totalDentistas: number;
  totalVoluntarios: number;
  totalDoadores: number;
  totalDoacoes: number;
  totalTriagens: number;
  beneficiariosEmAtendimento: number;
  beneficiariosAguardandoTriagem: number;
}
