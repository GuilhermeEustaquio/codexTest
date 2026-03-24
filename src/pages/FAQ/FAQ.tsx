import { useState } from 'react';

const perguntas = [
  {
    pergunta: 'Qual problema o CRM Inteligente resolve dentro da Turma do Bem?',
    resposta:
      'Resolve comunicação fragmentada, perda de dados e baixa visibilidade operacional ao centralizar os canais de atendimento.',
  },
  {
    pergunta: 'Como o CRM organiza a comunicação entre equipe, dentistas e pacientes?',
    resposta:
      'Com um hub unificado que registra mensagens, e-mails e histórico de casos para reduzir retrabalho e melhorar o contexto.',
  },
  {
    pergunta: 'O CRM oferece inteligência para apoiar decisões estratégicas?',
    resposta:
      'Sim. Dashboards de performance em tempo real ajudam líderes a priorizar demandas e distribuir recursos com assertividade.',
  },
];

export function FAQ() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-dark">FAQ Central do Bem</h1>
      <p className="text-slate-700">Perguntas frequentes sobre a solução de CRM social para a Turma do Bem.</p>

      <div className="space-y-3">
        {perguntas.map((item, indice) => {
          const ativa = aberta === indice;
          return (
            <article key={item.pergunta} className="rounded-xl bg-white p-4 shadow ring-1 ring-slate-200">
              <button className="flex w-full items-center justify-between text-left" onClick={() => setAberta(ativa ? null : indice)} type="button">
                <span className="font-semibold text-dark">{item.pergunta}</span>
                <span className="text-primary">{ativa ? '−' : '+'}</span>
              </button>
              {ativa && <p className="mt-3 text-sm text-slate-600">{item.resposta}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
