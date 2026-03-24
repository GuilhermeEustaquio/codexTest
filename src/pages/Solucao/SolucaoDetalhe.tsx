import { Link, useParams } from 'react-router-dom';
import { solutions } from '../../assets/data';

export function SolucaoDetalhe() {
  const { id } = useParams();
  const detalhe = solutions.find((item) => item.id === id);

  if (!detalhe) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-dark">Solução não encontrada</h1>
        <Link className="font-semibold text-primary hover:underline" to="/solucao">
          Voltar para a lista de soluções
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <img src={detalhe.imagem} alt={detalhe.titulo} className="h-64 w-full rounded-2xl object-cover" />
      <h1 className="text-3xl font-bold text-dark">{detalhe.titulo}</h1>
      <p className="text-slate-700">{detalhe.descricao}</p>
      <div className="rounded-xl bg-white p-4 shadow ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold">Objetivo acadêmico</h2>
        <p className="mt-2 text-slate-600">{detalhe.objetivo}</p>
      </div>
      <Link className="font-semibold text-primary hover:underline" to="/solucao">
        ← Voltar para soluções
      </Link>
    </section>
  );
}
