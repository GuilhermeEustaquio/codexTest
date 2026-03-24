import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { solutions } from '../../assets/data';

export function Solucao() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');

  const filtradas = useMemo(
    () =>
      solutions.filter(
        (item) =>
          item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
          item.descricao.toLowerCase().includes(busca.toLowerCase()),
      ),
    [busca],
  );

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-dark">Solução</h1>
      <p className="text-slate-700">Conheça os módulos da Central do Bem e como cada um gera impacto no atendimento.</p>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor="busca-solucao" className="mb-2 block text-sm font-semibold text-dark">
          Buscar módulo
        </label>
        <input
          id="busca-solucao"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Ex: inteligência, jornada, comunicação"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtradas.map((item) => (
          <Card key={item.id} title={item.titulo} description={item.descricao} image={item.imagem}>
            <Button onClick={() => navigate(`/solucao/${item.id}`)}>Acessar página</Button>
          </Card>
        ))}
      </div>

      {filtradas.length === 0 && (
        <p className="rounded-xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">
          Nenhum módulo encontrado para “{busca}”.
        </p>
      )}
    </section>
  );
}
