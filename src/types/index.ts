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
}

export interface ContactFormValues {
  nome: string;
  email: string;
  telefone?: string;
  mensagem: string;
}
