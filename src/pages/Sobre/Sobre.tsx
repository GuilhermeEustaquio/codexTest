import { useState } from 'react';

const pilares = [
  {
    titulo: 'Hub de relacionamento',
    texto:
      'Centraliza e-mails, mensagens e ligações em uma linha do tempo única. Equipes conseguem retomar conversas com contexto completo, sem perder histórico durante trocas de plantão.',
  },
  {
    titulo: 'Gestão de atendimentos',
    texto:
      'Organiza fluxos de triagens, marcações e acompanhamentos com regras de prioridade configuráveis. Cada caso recebe responsáveis definidos e alertas automáticos.',
  },
  {
    titulo: 'Insights e aprendizado',
    texto:
      'Dashboards analíticos alimentam líderes com dados de desempenho, enquanto o chatbot oferece respostas consistentes baseadas em casos reais e protocolos atualizados.',
  },
];

export function Sobre() {
  const [ativo, setAtivo] = useState(0);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-700 p-8 text-white shadow-lg" aria-labelledby="about-title">
        <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200">
          Nossa proposta
        </span>
        <h1 id="about-title" className="mt-3 text-3xl font-bold md:text-5xl">Sobre a Central do Bem</h1>
        <p className="mt-3 max-w-3xl text-sm text-emerald-50 md:text-base">
          Conheça os pilares da solução desenvolvida para modernizar processos, fortalecer a comunicação e gerar inteligência para a
          Turma do Bem.
        </p>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[0.7fr_1.3fr]" id="visao-geral" aria-labelledby="visao-title">
        <div className="flex items-center justify-center rounded-2xl bg-emerald-50 p-6">
          <img src="/imagem/logo-turma-do-bem.png" alt="Logotipo da Central do Bem" className="h-48 w-auto" />
        </div>
        <div className="space-y-4">
          <h2 id="visao-title" className="text-2xl font-bold text-slate-900">Visão geral da solução</h2>
          <p className="text-slate-600">
            A Central do Bem é um CRM inteligente desenhado para integrar toda a operação da Turma do Bem em um único ambiente digital.
            Ele nasce para resolver desafios como comunicação fragmentada, perda de informações e falta de métricas confiáveis para
            decisões estratégicas.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 md:text-base">
            <li><strong className="text-slate-800">Comunicação unificada:</strong> triagens, atendimentos e interações são conectados por meio de um hub que organiza demandas por urgência e tema.</li>
            <li><strong className="text-slate-800">Base de conhecimento inteligente:</strong> protocolos, documentos e históricos solucionados ficam disponíveis em buscas rápidas.</li>
            <li><strong className="text-slate-800">Métricas em tempo real:</strong> dashboards acompanhados por lideranças mostram atendimentos, tempo de resposta e projeções de demanda.</li>
            <li><strong className="text-slate-800">Escalabilidade:</strong> arquitetura pensada para expansão nacional e internacional, permitindo integrar novos parceiros com agilidade.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="pilares-title">
        <header className="space-y-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Como funciona</span>
          <h2 id="pilares-title" className="text-2xl font-bold text-slate-900">Pilares da Central do Bem</h2>
        </header>

        <div className="grid gap-3">
          {pilares.map((item, index) => {
            const expanded = ativo === index;
            return (
              <article className="rounded-2xl border border-slate-200 bg-slate-50" key={item.titulo}>
                <button
                  className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-slate-800 md:text-base"
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setAtivo(index)}
                >
                  <span>{item.titulo}</span>
                  <span className="text-lg text-teal-700">{expanded ? '−' : '+'}</span>
                </button>
                {expanded && (
                  <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600 md:text-base">
                    <p>{item.texto}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Indicadores consolidados">
        {[
          { valor: '82.000', label: 'jovens atendidos' },
          { valor: '1.100', label: 'mulheres acolhidas' },
          { valor: '18.000', label: 'dentistas voluntários' },
          { valor: '23', label: 'países com atuação' },
        ].map((item) => (
          <article key={item.label} className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-white to-emerald-50 p-5 text-center shadow-sm">
            <strong className="text-3xl font-extrabold text-emerald-800">{item.valor}</strong>
            <span className="mt-1 block text-sm text-emerald-900/80">{item.label}</span>
          </article>
        ))}
      </section>
    </div>
  );
}
