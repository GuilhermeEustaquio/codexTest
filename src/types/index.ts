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

// ── Address fields shared by all main entities ──────────────────────────────
export interface Endereco {
  cep: string;        // 8 raw digits (DB: char(8))
  logradouro: string;
  bairro: string;
  uf: string;         // 2-letter state code (DB: char(2))
  localidade: string;
  numero?: string;
  complemento?: string;
}

// ── Entities aligned with Oracle DB schema ───────────────────────────────────

export interface Beneficiario extends Endereco {
  id?: number;
  nome: string;
  cpf: string;       // 11 raw digits (DB: char(11))
  dtNasc: string;    // ISO date YYYY-MM-DD (DB: date)
  email: string;
  telefone: string;  // raw digits (DB: varchar2(15))
}

export interface Dentista extends Endereco {
  id?: number;
  cro: string;
  nome: string;
  cpf: string;
  dtNasc: string;
  email: string;
  telefone: string;
}

export interface Voluntario extends Endereco {
  id?: number;
  cro: string;
  nome: string;
  cpf: string;
  dtNasc: string;
  email: string;
  telefone: string;
  dataCadastro: string;
}

export interface Doador extends Endereco {
  id?: number;
  nome: string;
  /** CPF (11 digits) or CNPJ (14 digits) — DB column is "DOCUMANTO" (backend typo) */
  documanto: string;
  dtNasc: string;
  email: string;
  telefone: string;
}

export interface Doacao {
  id?: number;
  valor: number;
  descricao?: string;
  idDoador: number;
}

export interface Triagem {
  id?: number;
  dataInicio: string;
  dataFim?: string;
  /** varchar2(10): ALTO | MEDIO | BAIXO */
  resultado: 'ALTO' | 'MEDIO' | 'BAIXO';
  idBeneficiario: number;
  idVoluntario: number;
}

export interface DashboardResumo {
  totalBeneficiarios: number;
  totalDentistas: number;
  totalVoluntarios: number;
  totalDoadores: number;
  totalDoacoes: number;
  totalTriagens: number;
  triagensEmAndamento: number;   // triagens without dataFim
}

export type BeneficiarioFormValues = Omit<Beneficiario, 'id'>;
export type DentistaFormValues    = Omit<Dentista, 'id'>;
export type DoadorFormValues      = Omit<Doador, 'id'>;
export type DoacaoFormValues      = Omit<Doacao, 'id'>;
export type VoluntarioFormValues  = Omit<Voluntario, 'id'>;
export type TriagemFormValues     = Omit<Triagem, 'id'>;
