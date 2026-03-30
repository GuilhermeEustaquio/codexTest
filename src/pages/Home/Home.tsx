import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { solutions } from '../../assets/data';

const indicadores = [
  { titulo: 'Jovens atendidos', valor: 82000, descricao: 'Atendimentos gratuitos realizados em toda rede TdB.' },
  { titulo: 'Dentistas voluntários', valor: 18000, descricao: 'Profissionais ativos na jornada de cuidado.' },
  { titulo: 'Mulheres acolhidas', valor: 1100, descricao: 'Apolônias do Bem com apoio odontológico.' },
];

export function Home() {
  const navigate = useNavigate();
  const [contador, setContador] = useState(0);
  const [novosVoluntarios, setNovosVoluntarios] = useState(10);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setContador((anterior) => (anterior >= 82000 ? 82000 : anterior + 1000));
    }, 40);

    return () => clearInterval(intervalo);
  }, []);

  const estimativa = useMemo(() => {
    const jovensImpactados = novosVoluntarios * 18;
    const triagensMes = novosVoluntarios * 27;

    return { jovensImpactados, triagensMes };
  }, [novosVoluntarios]);

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-teal-700 to-secondary p-8 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <span className="relative text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">Comunicação integrada para a TdB</span>
        <h1 className="relative mt-2 text-3xl font-bold md:text-5xl">Central do Bem</h1>
        <p className="relative mt-3 max-w-2xl text-sm text-cyan-50 md:text-base">
          Plataforma pensada para conectar voluntários, coordenadores e beneficiários com uma experiência moderna,
          humanizada e orientada por dados.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Button onClick={() => navigate('/sobre')}>Conheça a solução</Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate('/solucao')}>
            Explorar módulos
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {indicadores.map((indicador) => (
          <Card key={indicador.titulo} title={indicador.titulo} description={indicador.descricao}>
            <p className="text-2xl font-extrabold text-primary">
              {indicador.titulo === 'Jovens atendidos' ? contador.toLocaleString('pt-BR') : indicador.valor.toLocaleString('pt-BR')}+
            </p>
          </Card>
        ))}
      </div>

      <section className="grid gap-5 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-dark">Simulador de impacto social</h2>
          <p className="text-sm text-slate-600">
            Estime rapidamente o alcance do projeto com base em novos dentistas voluntários entrando na rede.
          </p>
          <label htmlFor="voluntarios" className="text-sm font-semibold text-dark">
            Novos voluntários por ciclo: <span className="text-primary">{novosVoluntarios}</span>
          </label>
          <input
            id="voluntarios"
            type="range"
            min={5}
            max={80}
            step={5}
            value={novosVoluntarios}
            onChange={(event) => setNovosVoluntarios(Number(event.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <article className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Jovens impactados</p>
            <p className="mt-1 text-2xl font-bold text-primary">{estimativa.jovensImpactados.toLocaleString('pt-BR')}</p>
          </article>
          <article className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Triagens estimadas / mês</p>
            <p className="mt-1 text-2xl font-bold text-secondary">{estimativa.triagensMes.toLocaleString('pt-BR')}</p>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-dark">Frentes de solução</h2>
          <Button variant="outline" onClick={() => navigate('/solucao')}>
            Ver tudo
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solucao) => (
            <Card key={solucao.id} title={solucao.titulo} description={solucao.descricao} image={solucao.imagem}>
              <Button onClick={() => navigate(`/solucao/${solucao.id}`)}>Ver detalhes</Button>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}
