import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardCard } from '../../components/DashboardCard/DashboardCard';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { LoadingState } from '../../components/LoadingState/LoadingState';
import { ModuleCard } from '../../components/ModuleCard/ModuleCard';
import { dashboardService } from '../../services/dashboardService';
import type { DashboardResumo } from '../../types';

export function Solucao() {
  const navigate = useNavigate();
  const [resumo, setResumo] = useState<DashboardResumo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    dashboardService.resumo().then(setResumo).catch((e: Error) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  const cards = resumo
    ? [
        ['Total de beneficiários', resumo.totalBeneficiarios],
        ['Total de dentistas', resumo.totalDentistas],
        ['Total de voluntários', resumo.totalVoluntarios],
        ['Total de doadores', resumo.totalDoadores],
        ['Total de doações', resumo.totalDoacoes],
        ['Total de triagens', resumo.totalTriagens],
        ['Beneficiários aguardando triagem', resumo.beneficiariosAguardandoTriagem],
        ['Beneficiários em atendimento', resumo.beneficiariosEmAtendimento],
      ] as const
    : [];

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h1 className="text-3xl font-bold">Central do Bem | Centro operacional da Turma do Bem</h1>
        <p className="mt-3 text-cyan-50">
          Esta área conecta o fluxo do sistema Java: cadastro de beneficiários, triagem inicial, encaminhamento para dentistas,
          mobilização de voluntários e sustentabilidade por doações e doadores.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Fluxo integrado com o backend Java/Quarkus</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-600">
          <li>Beneficiário é cadastrado e entra em aguardando triagem.</li>
          <li>Voluntário realiza triagem, define prioridade e encaminhamento.</li>
          <li>Dentista assume atendimento clínico conforme especialidade/disponibilidade.</li>
          <li>Doadores e doações sustentam a operação e campanhas da Central do Bem.</li>
        </ol>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
        {loading && <LoadingState text="Carregando resumo operacional..." />}
        {error && <ErrorState message={error} />}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([title, value]) => (
            <DashboardCard key={title} title={title} value={value} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Módulos funcionais</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ModuleCard title="Beneficiários" description="Cadastro e acompanhamento do público atendido." onAccess={() => navigate('/solucao/beneficiarios')} />
          <ModuleCard title="Dentistas" description="Gestão de CRO, especialidade e disponibilidade clínica." onAccess={() => navigate('/solucao/dentistas')} />
          <ModuleCard title="Doadores" description="Cadastro de pessoa física e jurídica apoiadora." onAccess={() => navigate('/solucao/doadores')} />
          <ModuleCard title="Doações" description="Registro financeiro por finalidade da Central do Bem." onAccess={() => navigate('/solucao/doacoes')} />
          <ModuleCard title="Voluntários" description="Acompanhamento da rede voluntária por área de atuação." onAccess={() => navigate('/solucao/voluntarios')} />
          <ModuleCard title="Triagens" description="Priorização e encaminhamento para atendimento odontológico." onAccess={() => navigate('/solucao/triagens')} />
        </div>
      </section>
    </div>
  );
}
