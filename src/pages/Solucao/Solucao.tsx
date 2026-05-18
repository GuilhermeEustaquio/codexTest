import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { CrudModal } from '../../components/CrudModal/CrudModal';
import { CrudTabs } from '../../components/CrudTabs/CrudTabs';
import { DashboardCard } from '../../components/DashboardCard/DashboardCard';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormSelect } from '../../components/FormSelect/FormSelect';
import { FormTextarea } from '../../components/FormTextarea/FormTextarea';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { beneficiarioService } from '../../services/beneficiarioService';
import { dentistaService } from '../../services/dentistaService';
import { doacaoService } from '../../services/doacaoService';
import { doadorService } from '../../services/doadorService';
import { triagemService } from '../../services/triagemService';
import { voluntarioService } from '../../services/voluntarioService';
import { isApiEnabled } from '../../services/api';
import type { Beneficiario, DashboardResumo, Dentista, Doacao, Doador, Triagem, Voluntario } from '../../types';
import { resetStorageKey } from '../../utils/storage';

type TabKey = 'beneficiarios' | 'dentistas' | 'doadores' | 'doacoes' | 'voluntarios' | 'triagens';
type AnyEntity = Beneficiario | Dentista | Doador | Doacao | Voluntario | Triagem;

function EntityRow({ tab, item }: { tab: TabKey; item: any }) {
  const label = (() => {
    switch (tab) {
      case 'beneficiarios': return item.nome;
      case 'dentistas': return item.nome;
      case 'doadores': return item.nome;
      case 'doacoes': return `Doação #${item.id ?? '—'} — Doador ID ${item.doadorId}`;
      case 'voluntarios': return item.nome;
      case 'triagens': return `Triagem #${item.id ?? '—'} — Benef. ID ${item.beneficiarioId}`;
    }
  })();

  const details = (() => {
    switch (tab) {
      case 'beneficiarios':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>CPF: {item.cpf}</span>
            {item.idade && <span>Idade: {item.idade}</span>}
            <span>{item.email}</span>
            <span>{item.telefone}</span>
          </div>
        );
      case 'dentistas':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>CRO: {item.cro}</span>
            <span>{item.especialidade}</span>
            <span>{item.email}</span>
            <span>{item.telefone}</span>
          </div>
        );
      case 'doadores':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>CPF/CNPJ: {item.cpfCnpj}</span>
            <span>{item.email}</span>
            <span>{item.telefone}</span>
          </div>
        );
      case 'doacoes':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>Valor: R$ {Number(item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            <span>Data: {item.data}</span>
            <span>Finalidade: {item.finalidade}</span>
          </div>
        );
      case 'voluntarios':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>Área: {item.areaAtuacao}</span>
            <span>{item.email}</span>
            <span>{item.telefone}</span>
          </div>
        );
      case 'triagens':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>Voluntário ID: {item.voluntarioId}</span>
            <span>Data: {item.dataTriagem}</span>
            {item.encaminhamento && <span>Encam.: {item.encaminhamento}</span>}
          </div>
        );
    }
  })();

  const badge = (() => {
    if (item.status) return <StatusBadge text={item.status} />;
    if (item.prioridade) return <StatusBadge text={item.prioridade} />;
    if (tab === 'dentistas') return <StatusBadge text={item.disponivel === true || item.disponivel === 'true' ? 'DISPONIVEL' : 'INDISPONIVEL'} />;
    if (tab === 'voluntarios') return <StatusBadge text={item.ativo === true || item.ativo === 'true' ? 'ATIVO' : 'INATIVO'} />;
    if (tab === 'doadores') return <StatusBadge text={item.tipo} />;
    return null;
  })();

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-primary/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-slate-800">{label}</p>
          {badge}
        </div>
        {details}
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={() => (window as any).__onEdit?.(item)}
          className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600"
        >
          Editar
        </button>
        <button
          onClick={() => (window as any).__onDelete?.(item)}
          className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export function Solucao() {
  const [tab, setTab] = useState<TabKey>('beneficiarios');
  const [busca, setBusca] = useState('');
  const [data, setData] = useState<Record<TabKey, AnyEntity[]>>({
    beneficiarios: [], dentistas: [], doadores: [], doacoes: [], voluntarios: [], triagens: [],
  });
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<AnyEntity | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AnyEntity | null>(null);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<any>();
  const apiAtiva = isApiEnabled();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      beneficiarioService.listar(),
      dentistaService.listar(),
      doadorService.listar(),
      doacaoService.listar(),
      voluntarioService.listar(),
      triagemService.listar(),
    ])
      .then(([beneficiarios, dentistas, doadores, doacoes, voluntarios, triagens]) => {
        setData({ beneficiarios, dentistas, doadores, doacoes, voluntarios, triagens });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 4000);
    return () => clearTimeout(id);
  }, [msg]);

  const tabs = [
    { key: 'beneficiarios', label: 'Beneficiários' },
    { key: 'dentistas', label: 'Dentistas' },
    { key: 'doadores', label: 'Doadores' },
    { key: 'doacoes', label: 'Doações' },
    { key: 'voluntarios', label: 'Voluntários' },
    { key: 'triagens', label: 'Triagens' },
  ] as const;

  const filtered = useMemo(
    () => data[tab].filter((item) => JSON.stringify(item).toLowerCase().includes(busca.toLowerCase())),
    [busca, data, tab],
  );

  const dashboard: DashboardResumo = useMemo(() => ({
    totalBeneficiarios: data.beneficiarios.length,
    totalDentistas: data.dentistas.length,
    totalDoadores: data.doadores.length,
    totalDoacoes: data.doacoes.length,
    totalVoluntarios: data.voluntarios.length,
    totalTriagens: data.triagens.length,
    beneficiariosAguardandoTriagem: data.beneficiarios.filter((b: any) => b.status === 'AGUARDANDO_TRIAGEM').length,
    beneficiariosEmAtendimento: data.beneficiarios.filter((b: any) => b.status === 'EM_ATENDIMENTO').length,
  }), [data]);

  const restaurarDados = async () => {
    ['centraldobem_beneficiarios', 'centraldobem_dentistas', 'centraldobem_doadores', 'centraldobem_doacoes', 'centraldobem_voluntarios', 'centraldobem_triagens'].forEach(resetStorageKey);
    const [beneficiarios, dentistas, doadores, doacoes, voluntarios, triagens] = await Promise.all([
      beneficiarioService.listar(), dentistaService.listar(), doadorService.listar(),
      doacaoService.listar(), voluntarioService.listar(), triagemService.listar(),
    ]);
    setData({ beneficiarios, dentistas, doadores, doacoes, voluntarios, triagens });
    setMsg({ text: 'Dados de exemplo restaurados com sucesso!', type: 'success' });
  };

  const onAdd = () => { setEditing(null); reset({}); setOpenModal(true); };
  const onEdit = (item: AnyEntity) => { setEditing(item); reset(item); setOpenModal(true); };

  // Expose handlers to EntityRow via window refs (avoids prop drilling through the component)
  (window as any).__onEdit = onEdit;
  (window as any).__onDelete = (item: AnyEntity) => setDeleteTarget(item);

  const save = async (values: any) => {
    const serviceMap: any = {
      beneficiarios: beneficiarioService, dentistas: dentistaService, doadores: doadorService,
      doacoes: doacaoService, voluntarios: voluntarioService, triagens: triagemService,
    };
    const service = serviceMap[tab];
    try {
      if (editing && 'id' in editing && editing.id) {
        const updated = await service.atualizar(editing.id, { ...editing, ...values });
        setData((p) => ({ ...p, [tab]: p[tab].map((x: any) => x.id === editing.id ? updated : x) }));
        setMsg({ text: 'Registro atualizado com sucesso!', type: 'success' });
      } else {
        const created = await service.criar(values);
        setData((p) => ({ ...p, [tab]: [...p[tab], created] }));
        setMsg({ text: 'Registro adicionado com sucesso!', type: 'success' });
      }
      setOpenModal(false);
    } catch {
      setMsg({ text: 'Ocorreu um erro ao salvar. Tente novamente.', type: 'error' });
    }
  };

  const onDelete = async () => {
    if (!deleteTarget || !('id' in deleteTarget) || !deleteTarget.id) return;
    const serviceMap: any = {
      beneficiarios: beneficiarioService, dentistas: dentistaService, doadores: doadorService,
      doacoes: doacaoService, voluntarios: voluntarioService, triagens: triagemService,
    };
    try {
      await serviceMap[tab].remover(deleteTarget.id);
      setData((p) => ({ ...p, [tab]: p[tab].filter((x: any) => x.id !== deleteTarget.id) }));
      setMsg({ text: 'Registro excluído com sucesso!', type: 'success' });
    } catch {
      setMsg({ text: 'Ocorreu um erro ao excluir. Tente novamente.', type: 'error' });
    }
    setDeleteTarget(null);
  };

  const isEditing = Boolean(editing);
  const disabled = (field: string) =>
    isEditing && (
      (tab === 'beneficiarios' && ['nome', 'cpf'].includes(field)) ||
      (tab === 'dentistas' && ['nome', 'cro'].includes(field)) ||
      (tab === 'doadores' && ['nome', 'cpfCnpj'].includes(field)) ||
      (tab === 'doacoes' && ['doadorId'].includes(field)) ||
      (tab === 'voluntarios' && ['nome'].includes(field)) ||
      (tab === 'triagens' && ['beneficiarioId'].includes(field))
    );

  const currentTabLabel = tabs.find((t) => t.key === tab)?.label ?? '';
  const singularLabel = currentTabLabel.endsWith('s') ? currentTabLabel.slice(0, -1) : currentTabLabel;

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {msg && (
        <div
          className={`fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-xl px-5 py-3 shadow-lg text-sm font-medium transition-all ${
            msg.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-rose-600 text-white'
          }`}
        >
          <span>{msg.type === 'success' ? '✓' : '✕'}</span>
          {msg.text}
        </div>
      )}

      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white shadow-lg">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <h1 className="relative text-2xl font-bold md:text-3xl">Central do Bem — Área de Gestão</h1>
        <p className="relative mt-2 max-w-xl text-cyan-50 text-sm md:text-base">
          Gestão de beneficiários, dentistas, doadores, doações, voluntários e triagens, integrada ao backend Java/Quarkus.
        </p>
        {!apiAtiva && (
          <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Modo offline — dados locais
          </span>
        )}
      </section>

      {/* Dashboard Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Beneficiários" value={dashboard.totalBeneficiarios} icon="👤" color="teal" />
        <DashboardCard title="Dentistas" value={dashboard.totalDentistas} icon="🦷" color="cyan" />
        <DashboardCard title="Doadores" value={dashboard.totalDoadores} icon="💚" color="green" />
        <DashboardCard title="Doações" value={dashboard.totalDoacoes} icon="💰" color="emerald" />
        <DashboardCard title="Voluntários" value={dashboard.totalVoluntarios} icon="🤝" color="teal" />
        <DashboardCard title="Triagens" value={dashboard.totalTriagens} icon="📋" color="cyan" />
        <DashboardCard title="Aguard. Triagem" value={dashboard.beneficiariosAguardandoTriagem} icon="⏳" color="amber" />
        <DashboardCard title="Em Atendimento" value={dashboard.beneficiariosEmAtendimento} icon="⚕️" color="blue" />
      </section>

      {/* Tabs */}
      <CrudTabs tabs={tabs.map((t) => ({ key: t.key, label: t.label }))} active={tab} onChange={(k) => { setTab(k as TabKey); setBusca(''); }} />

      {/* List section */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3a6 6 0 100 12A6 6 0 009 3zM1 9a8 8 0 1114.32 4.906l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387A8 8 0 011 9z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder={`Buscar em ${currentTabLabel}...`}
            />
          </div>
          <div className="flex gap-2">
            {!apiAtiva && (
              <button
                onClick={restaurarDados}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Restaurar exemplos
              </button>
            )}
            <button
              onClick={onAdd}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              <span className="text-base leading-none">+</span>
              Adicionar {singularLabel}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-slate-400">
            <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Carregando dados...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-slate-400">
            <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current opacity-30" aria-hidden="true">
              <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
            </svg>
            <p className="text-sm font-medium">Nenhum registro encontrado</p>
            {busca && <p className="text-xs">Tente remover o filtro de busca</p>}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((item: any) => (
              <EntityRow key={item.id} tab={tab} item={item} />
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <p className="mt-3 text-right text-xs text-slate-400">
            {filtered.length} registro{filtered.length !== 1 ? 's' : ''}
            {busca ? ` encontrado${filtered.length !== 1 ? 's' : ''}` : ''}
          </p>
        )}
      </section>

      {/* CRUD Modal */}
      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`${isEditing ? 'Editar' : 'Adicionar'} ${singularLabel}`}
      >
        <form onSubmit={handleSubmit(save)} className="grid gap-3 md:grid-cols-2">
          {tab === 'beneficiarios' && <>
            <FormInput label="Nome" registration={register('nome', { required: 'Obrigatório' })} error={errors.nome} disabled={disabled('nome')} />
            <FormInput label="CPF" registration={register('cpf', { required: 'Obrigatório' })} error={errors.cpf} disabled={disabled('cpf')} />
            <FormInput label="Idade" type="number" registration={register('idade', { valueAsNumber: true, min: { value: 1, message: 'Idade deve ser positiva' } })} error={errors.idade} />
            <FormInput label="Telefone" registration={register('telefone', { required: 'Obrigatório' })} error={errors.telefone} />
            <FormInput label="E-mail" type="email" registration={register('email', { required: 'Obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' } })} error={errors.email} />
            <FormSelect label="Status" registration={register('status')} options={[{ label: 'Aguardando triagem', value: 'AGUARDANDO_TRIAGEM' }, { label: 'Em atendimento', value: 'EM_ATENDIMENTO' }, { label: 'Finalizado', value: 'FINALIZADO' }]} />
          </>}
          {tab === 'dentistas' && <>
            <FormInput label="Nome" registration={register('nome', { required: 'Obrigatório' })} error={errors.nome} disabled={disabled('nome')} />
            <FormInput label="CRO" registration={register('cro', { required: 'Obrigatório' })} error={errors.cro} disabled={disabled('cro')} />
            <FormInput label="Especialidade" registration={register('especialidade', { required: 'Obrigatório' })} error={errors.especialidade} />
            <FormInput label="Telefone" registration={register('telefone', { required: 'Obrigatório' })} error={errors.telefone} />
            <FormInput label="E-mail" type="email" registration={register('email', { required: 'Obrigatório' })} error={errors.email} />
            <FormSelect label="Disponível" registration={register('disponivel')} options={[{ label: 'Sim', value: 'true' }, { label: 'Não', value: 'false' }]} />
          </>}
          {tab === 'doadores' && <>
            <FormInput label="Nome" registration={register('nome', { required: 'Obrigatório' })} error={errors.nome} disabled={disabled('nome')} />
            <FormInput label="CPF/CNPJ" registration={register('cpfCnpj', { required: 'Obrigatório' })} error={errors.cpfCnpj} disabled={disabled('cpfCnpj')} />
            <FormInput label="Telefone" registration={register('telefone', { required: 'Obrigatório' })} error={errors.telefone} />
            <FormInput label="E-mail" type="email" registration={register('email', { required: 'Obrigatório' })} error={errors.email} />
            <FormSelect label="Tipo" registration={register('tipo')} options={[{ label: 'Pessoa Física', value: 'PESSOA_FISICA' }, { label: 'Pessoa Jurídica', value: 'PESSOA_JURIDICA' }]} />
          </>}
          {tab === 'doacoes' && <>
            <FormInput label="ID do doador" type="number" disabled={disabled('doadorId')} registration={register('doadorId', { valueAsNumber: true, required: 'Obrigatório' })} error={errors.doadorId} />
            <FormInput label="Valor (R$)" type="number" registration={register('valor', { valueAsNumber: true, min: { value: 0.01, message: 'Valor deve ser positivo' } })} error={errors.valor} />
            <FormInput label="Data" type="date" registration={register('data', { required: 'Obrigatório' })} error={errors.data} />
            <FormInput label="Finalidade" registration={register('finalidade', { required: 'Obrigatório' })} error={errors.finalidade} />
          </>}
          {tab === 'voluntarios' && <>
            <FormInput label="Nome" registration={register('nome', { required: 'Obrigatório' })} error={errors.nome} disabled={disabled('nome')} />
            <FormInput label="Área de atuação" registration={register('areaAtuacao', { required: 'Obrigatório' })} error={errors.areaAtuacao} />
            <FormInput label="Telefone" registration={register('telefone', { required: 'Obrigatório' })} error={errors.telefone} />
            <FormInput label="E-mail" type="email" registration={register('email', { required: 'Obrigatório' })} error={errors.email} />
            <FormSelect label="Ativo" registration={register('ativo')} options={[{ label: 'Sim', value: 'true' }, { label: 'Não', value: 'false' }]} />
          </>}
          {tab === 'triagens' && <>
            <FormInput label="ID do beneficiário" type="number" disabled={disabled('beneficiarioId')} registration={register('beneficiarioId', { valueAsNumber: true, required: 'Obrigatório' })} error={errors.beneficiarioId} />
            <FormInput label="ID do voluntário" type="number" registration={register('voluntarioId', { valueAsNumber: true, required: 'Obrigatório' })} error={errors.voluntarioId} />
            <FormInput label="Data da triagem" type="date" registration={register('dataTriagem', { required: 'Obrigatório' })} error={errors.dataTriagem} />
            <FormSelect label="Prioridade" registration={register('prioridade')} options={[{ label: 'Baixa', value: 'BAIXA' }, { label: 'Média', value: 'MEDIA' }, { label: 'Alta', value: 'ALTA' }]} />
            <FormTextarea label="Observação" registration={register('observacao', { required: 'Obrigatório' })} error={errors.observacao} />
            <FormTextarea label="Encaminhamento" registration={register('encaminhamento', { required: 'Obrigatório' })} error={errors.encaminhamento} />
          </>}
          <div className="flex justify-end gap-2 md:col-span-2">
            <button type="button" onClick={() => setOpenModal(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
            >
              {isSubmitting && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {isEditing ? 'Salvar alterações' : 'Salvar'}
            </button>
          </div>
        </form>
      </CrudModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={onDelete}
        message="Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita."
      />
    </div>
  );
}
