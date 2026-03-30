import { useState } from 'react';

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
      <section className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">FAQ Central do Bem</h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          Conheça os detalhes do CRM Inteligente desenvolvido para a Turma do Bem. Reunimos as perguntas mais frequentes e explicamos
          como a solução transforma a rotina de atendimento e gestão.
        </p>
      </section>

      <section className="space-y-4">
        {perguntas.map((item, indice) => {
          const abertaAtual = aberta === indice;
          return (
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" key={item.pergunta}>
              <div className="flex items-center gap-3">
                <img className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100" src="/imagem/semfoto.png" alt="Ícone de pergunta" />
                <button
                  className="flex w-full items-center justify-between gap-3 text-left"
                  type="button"
                  aria-expanded={abertaAtual}
                  onClick={() => setAberta(abertaAtual ? null : indice)}
                >
                  <span className="text-sm font-semibold text-slate-800 md:text-base">{item.pergunta}</span>
                  <span className="text-xl text-teal-700">{abertaAtual ? '−' : '+'}</span>
                </button>
              </div>
              {abertaAtual && (
                <div className="mt-4 flex items-start gap-3 border-t border-slate-100 pt-4">
                  <img className="h-12 w-12 rounded-full object-cover ring-2 ring-teal-100" src={item.foto} alt={item.nome} />
                  <div>
                    <p className="text-sm text-slate-600 md:text-base">{item.resposta}</p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
