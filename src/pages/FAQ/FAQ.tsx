import { useState } from 'react';
import { Accordion } from '../../components/Accordion/Accordion';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';

const perguntas = [
  {
    pergunta: 'Qual problema o CRM Inteligente resolve dentro da Turma do Bem?',
    resposta:
      'O sistema foi desenvolvido para solucionar três desafios críticos enfrentados hoje: comunicação fragmentada, perda de informações importantes e falta de métricas confiáveis para tomada de decisão. Ele centraliza toda a operação em uma única plataforma, conectando dados, pessoas e processos de forma organizada e acessível.',
    foto: '/imagem/euperfil.jpg',
    nome: 'Foto de Matheus Tavares',
  },
  {
    pergunta: 'Como o CRM organiza a comunicação entre equipe, dentistas e pacientes?',
    resposta:
      'Toda a comunicação será centralizada em um Hub Integrado de Mensagens, onde e-mails, mensagens de WhatsApp e registros de ligações são automaticamente vinculados ao caso, paciente ou projeto correspondente. O sistema classifica as demandas por tipo e urgência, eliminando perda de contexto e reduzindo retrabalho entre áreas.',
    foto: '/imagem/eustaquio.PNG',
    nome: 'Foto de Guilherme Eustáquio',
  },
  {
    pergunta: 'O CRM oferece inteligência para apoiar decisões estratégicas?',
    resposta:
      'Vai muito além de um banco de dados. O CRM reúne inteligência com base de conhecimento para consultas a protocolos internos, histórico automático de casos e dashboards analíticos em tempo real. Com dados consolidados em um único painel, o time consegue priorizar demandas, acompanhar metas e antecipar oportunidades de impacto.',
    foto: '/imagem/caioperfil.jpeg',
    nome: 'Foto de Caio Couto',
  },
];

export function FAQ() {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <SectionHeader
        centered
        title="FAQ Central do Bem"
        description="Conheça os detalhes do CRM Inteligente desenvolvido para a Turma do Bem. Reunimos as perguntas mais frequentes e explicamos como a solução transforma a rotina de atendimento e gestão."
      />

      <section className="space-y-4">
        <Accordion
          items={perguntas.map((item) => ({
            id: item.pergunta,
            title: item.pergunta,
            leading: <img className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100" src="/imagem/semfoto.png" alt="Ícone de pergunta" />,
            content: (
              <div className="flex items-start gap-3">
                <img className="h-12 w-12 rounded-full object-cover ring-2 ring-teal-100" src={item.foto} alt={item.nome} />
                <p>{item.resposta}</p>
              </div>
            ),
          }))}
          activeIndex={aberta}
          onToggle={(index) => setAberta(aberta === index ? null : index)}
          bordered={false}
        />
      </section>
    </div>
  );
}
