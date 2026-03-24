export function Footer() {
  return (
    <footer className="mt-12 bg-dark text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <img src="/imagem/logo-turma-do-bem.png" alt="Turma do Bem" className="mb-3 h-10 w-auto" />
          <p className="text-sm text-slate-300">
            Central do Bem é um projeto acadêmico para integrar comunicação, dados e atendimento da Turma do Bem.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Contato</h3>
          <p className="text-sm text-slate-300">guilhermepeustaquio@gmail.com</p>
          <p className="text-sm text-slate-300">caiocc2006@gmail.com</p>
          <p className="text-sm text-slate-300">matheustavares1356@gmail.com</p>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Site oficial</h3>
          <a className="text-sm text-cyan-300 hover:text-cyan-200" href="https://turmadobem.org.br/" target="_blank" rel="noreferrer">
            turmadobem.org.br
          </a>
        </div>
      </div>
      <div className="border-t border-slate-700 py-3 text-center text-xs text-slate-400">
        © 2026 Central do Bem • Sprint 03 Front-End FIAP
      </div>
    </footer>
  );
}
