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
    <div className="about-main">
      <section className="about-hero full-bleed" aria-labelledby="about-title">
        <div className="layout-wrapper about-hero-content">
          <span className="section-tag">Nossa proposta</span>
          <h1 id="about-title" className="highlight-title">
            Sobre a Central do Bem
          </h1>
          <p className="page-intro about-hero-intro">
            Conheça os pilares da solução desenvolvida para modernizar processos, fortalecer a comunicação e gerar inteligência para a
            Turma do Bem.
          </p>
        </div>
      </section>

      <section className="overview-grid" id="visao-geral" aria-labelledby="visao-title">
        <div className="overview-media">
          <img src="/imagem/logo-turma-do-bem.png" alt="Logotipo da Central do Bem" />
        </div>
        <div className="overview-content">
          <h2 id="visao-title">Visão geral da solução</h2>
          <p>
            A Central do Bem é um CRM inteligente desenhado para integrar toda a operação da Turma do Bem em um único ambiente digital.
            Ele nasce para resolver desafios como comunicação fragmentada, perda de informações e falta de métricas confiáveis para
            decisões estratégicas.
          </p>
          <ul className="overview-list">
            <li>
              <strong>Comunicação unificada:</strong> triagens, atendimentos e interações são conectados por meio de um hub que organiza
              demandas por urgência e tema.
            </li>
            <li>
              <strong>Base de conhecimento inteligente:</strong> protocolos, documentos e históricos solucionados ficam disponíveis em
              buscas rápidas.
            </li>
            <li>
              <strong>Métricas em tempo real:</strong> dashboards acompanhados por lideranças mostram atendimentos, tempo de resposta e
              projeções de demanda.
            </li>
            <li>
              <strong>Escalabilidade:</strong> arquitetura pensada para expansão nacional e internacional, permitindo integrar novos
              parceiros com agilidade.
            </li>
          </ul>
        </div>
      </section>

      <section className="solution-accordion" aria-labelledby="pilares-title">
        <div className="layout-wrapper">
          <header className="section-header">
            <span className="section-tag">Como funciona</span>
            <h2 id="pilares-title">Pilares da Central do Bem</h2>
          </header>

          <div className="accordion-grid">
            {pilares.map((item, index) => {
              const expanded = ativo === index;
              return (
                <article className="accordion-item" key={item.titulo}>
                  <button className="accordion-button" type="button" aria-expanded={expanded} onClick={() => setAtivo(index)}>
                    <span>{item.titulo}</span>
                    <span className="accordion-icon" aria-hidden="true" />
                  </button>
                  {expanded && (
                    <div className="accordion-panel">
                      <p>{item.texto}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-metrics" aria-label="Indicadores consolidados">
        <div className="layout-wrapper metric-grid">
          <article className="metric-card">
            <strong className="metric-counter">82.000</strong>
            <span>jovens atendidos</span>
          </article>
          <article className="metric-card">
            <strong className="metric-counter">1.100</strong>
            <span>mulheres acolhidas</span>
          </article>
          <article className="metric-card">
            <strong className="metric-counter">18.000</strong>
            <span>dentistas voluntários</span>
          </article>
          <article className="metric-card">
            <strong className="metric-counter">23</strong>
            <span>países com atuação</span>
          </article>
        </div>
      </section>
    </div>
  );
}
