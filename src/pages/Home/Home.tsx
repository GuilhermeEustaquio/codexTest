import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { solutions } from '../../assets/data';

export function Home() {
  const navigate = useNavigate();
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setContador((anterior) => (anterior >= 82000 ? 82000 : anterior + 1000));
    }, 40);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <span className="text-sm font-medium uppercase tracking-wide">Comunicação integrada para a TdB</span>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">Central do Bem</h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base">
          Plataforma pensada para conectar voluntários, coordenadores e beneficiários com uma experiência moderna, humanizada e orientada por dados.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => navigate('/sobre')}>Conheça a solução</Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate('/solucao')}>
            Explorar módulos
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Jovens atendidos" description="Atendimentos gratuitos realizados em toda rede TdB.">
          <p className="text-2xl font-extrabold text-primary">{contador.toLocaleString('pt-BR')}+</p>
        </Card>
        <Card title="Dentistas voluntários" description="Profissionais ativos na jornada de cuidado.">
          <p className="text-2xl font-extrabold text-primary">18.000+</p>
        </Card>
        <Card title="Mulheres acolhidas" description="Apolônias do Bem com apoio odontológico.">
          <p className="text-2xl font-extrabold text-primary">1.100+</p>
        </Card>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-dark">Frentes de solução</h2>
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
