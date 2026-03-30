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
    <>
      <section className="page-hero">
        <h1 className="highlight-title">FAQ Central do Bem</h1>
        <p className="page-intro">
          Conheça os detalhes do CRM Inteligente desenvolvido para a Turma do Bem. Reunimos as perguntas mais frequentes e explicamos
          como a solução transforma a rotina de atendimento e gestão.
        </p>
      </section>

      <section className="faq-section">
        {perguntas.map((item, indice) => {
          const abertaAtual = aberta === indice;
          return (
            <article className={`faq-card ${abertaAtual ? 'is-open' : ''}`} key={item.pergunta}>
              <div className="faq-question">
                <img className="faq-avatar" src="/imagem/semfoto.png" alt="Ícone de pergunta" />
                <button className="faq-toggle" type="button" aria-expanded={abertaAtual} onClick={() => setAberta(abertaAtual ? null : indice)}>
                  <span className="faq-toggle-text">{item.pergunta}</span>
                  <span className="faq-toggle-icon" aria-hidden="true" />
                </button>
              </div>
              {abertaAtual && (
                <div className="faq-answer">
                  <img className="faq-avatar" src={item.foto} alt={item.nome} />
                  <div>
                    <p>{item.resposta}</p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </>
  );
}
