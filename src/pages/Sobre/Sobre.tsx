export function Sobre() {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-dark">Sobre a Central do Bem</h1>
        <p className="text-slate-700">
          O projeto foi criado para resolver a comunicação fragmentada da Turma do Bem com um CRM social, escalável e centrado em impacto.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold">Visão geral</h2>
          <p className="mt-2 text-slate-600">
            Centralização das triagens, atendimentos e interações em uma única plataforma com histórico completo e rastreável.
          </p>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold">Pilares</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
            <li>Hub de relacionamento omnicanal.</li>
            <li>Gestão de atendimentos com priorização.</li>
            <li>Painel analítico para decisão estratégica.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
