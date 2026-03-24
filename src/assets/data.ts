import type { NavItem, SolutionItem, TeamMember } from '../types';

export const navItems: NavItem[] = [
  { label: 'Home', path: '/home' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contato', path: '/contato' },
  { label: 'Integrantes', path: '/integrantes' },
  { label: 'Solução', path: '/solucao' },
];

export const teamMembers: TeamMember[] = [
  {
    nome: 'Guilherme Pinto Eustáquio',
    rm: '566784',
    turma: '1TDSPS',
    foto: '/imagem/eustaquio.PNG',
    github: 'https://github.com/GuilhermeEustaquio',
    linkedin: 'https://www.linkedin.com/in/guilhermeeustaquio/',
  },
  {
    nome: 'Caio Cantini Couto',
    rm: '563452',
    turma: '1TDSPS',
    foto: '/imagem/caioperfil.jpeg',
    github: 'https://github.com/caioccouto',
    linkedin: 'https://www.linkedin.com/in/caio-couto-44b849326/',
  },
  {
    nome: 'Matheus Tavares da Silva',
    rm: '566844',
    turma: '1TDSPS',
    foto: '/imagem/euperfil.jpg',
    github: 'https://github.com/manovares',
    linkedin: 'https://www.linkedin.com/in/manovares/',
  },
];

export const solutions: SolutionItem[] = [
  {
    id: 'hub-comunicacao',
    titulo: 'Hub Integrado de Comunicação',
    descricao:
      'Centraliza e-mails, mensagens e histórico de atendimento para eliminar ruídos e retrabalho.',
    imagem: '/imagem/dentistas-voluntarios.png',
    objetivo:
      'Garantir visão 360º de cada caso para voluntários, coordenação e beneficiários.',
  },
  {
    id: 'painel-inteligente',
    titulo: 'Painel de Inteligência Operacional',
    descricao:
      'Mostra métricas em tempo real para apoiar decisões estratégicas e prever demanda.',
    imagem: '/imagem/jovens-atendidos.png',
    objetivo:
      'Transformar dados em ações rápidas e com impacto social mensurável.',
  },
  {
    id: 'jornada-humanizada',
    titulo: 'Jornada de Atendimento Humanizada',
    descricao:
      'Fluxos digitais com triagem, acompanhamento e alertas para acelerar o suporte.',
    imagem: '/imagem/mulheres-atendidas.png',
    objetivo:
      'Oferecer acolhimento contínuo do primeiro contato até a conclusão do tratamento.',
  },
];
