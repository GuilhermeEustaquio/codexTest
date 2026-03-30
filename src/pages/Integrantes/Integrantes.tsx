import { teamMembers } from '../../assets/data';

export function Integrantes() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Nossa equipe</h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          Conheça os estudantes responsáveis pelo desenvolvimento da Central do Bem. Somos um time multidisciplinar comprometido em
          transformar a experiência de voluntários, beneficiários e parceiros da Turma do Bem.
        </p>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((membro) => (
          <div key={membro.rm} className="group [perspective:1000px]">
            <div className="relative h-80 w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm [backface-visibility:hidden]">
                <img src={membro.foto} alt={membro.nome} className="h-28 w-28 rounded-full object-cover ring-4 ring-teal-100" />
                <h3 className="mt-4 text-xl font-bold text-slate-900">{membro.nome.split(' ')[0]}</h3>
                <p className="mt-1 text-sm text-slate-500">Passe o mouse para ver mais</p>
              </div>

              <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-teal-700 bg-gradient-to-b from-teal-700 to-emerald-800 p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="space-y-1 text-sm">
                  <p>Turma: {membro.turma}</p>
                  <p>RM: {membro.rm}</p>
                  <p className="font-semibold">{membro.nome}</p>
                </div>

                <div className="grid gap-2">
                  <a href={membro.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/25">
                    <img src="/imagem/icon/linkedin.png" className="h-4 w-4" alt="" /> LinkedIn
                  </a>
                  <a href={membro.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900/30 px-3 py-2 text-sm font-semibold hover:bg-slate-900/45">
                    <img src="/imagem/icon/github.png" className="h-4 w-4" alt="" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
