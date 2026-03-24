import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { solutions } from '../../assets/data';

export function Solucao() {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-dark">Solução</h1>
      <p className="text-slate-700">Conheça os módulos da Central do Bem e como cada um gera impacto no atendimento.</p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((item) => (
          <Card key={item.id} title={item.titulo} description={item.descricao} image={item.imagem}>
            <Button onClick={() => navigate(`/solucao/${item.id}`)}>Acessar página</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
