import { Card } from '../../components/Card/Card';
import { teamMembers } from '../../assets/data';

export function Integrantes() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-dark">Integrantes</h1>
      <p className="text-slate-700">Equipe responsável pelo desenvolvimento da Central do Bem.</p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((integrante) => (
          <Card
            key={integrante.rm}
            title={integrante.nome}
            description={`RM: ${integrante.rm} • Turma: ${integrante.turma}`}
            image={integrante.foto}
          >
            <div className="flex gap-3">
              <a href={integrante.github} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary hover:underline">
                GitHub
              </a>
              <a href={integrante.linkedin} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary hover:underline">
                LinkedIn
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
