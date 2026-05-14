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
import type { Beneficiario, DashboardResumo, Dentista, Doacao, Doador, Triagem, Voluntario } from '../../types';
import { resetStorageKey } from '../../utils/storage';

type TabKey = 'beneficiarios'|'dentistas'|'doadores'|'doacoes'|'voluntarios'|'triagens';
type AnyEntity = Beneficiario | Dentista | Doador | Doacao | Voluntario | Triagem;

export function Solucao() {
  const [tab, setTab] = useState<TabKey>('beneficiarios');
    const [busca, setBusca] = useState('');
  const [data, setData] = useState<Record<TabKey, AnyEntity[]>>({ beneficiarios:[], dentistas:[], doadores:[], doacoes:[], voluntarios:[], triagens:[] });
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<AnyEntity | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AnyEntity | null>(null);
  const [msg, setMsg] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

  useEffect(() => {
    Promise.all([beneficiarioService.listar(), dentistaService.listar(), doadorService.listar(), doacaoService.listar(), voluntarioService.listar(), triagemService.listar()])
      .then(([beneficiarios, dentistas, doadores, doacoes, voluntarios, triagens]) => {
        setData({ beneficiarios, dentistas, doadores, doacoes, voluntarios, triagens });
      });
  }, []);

  const tabs = [
    { key: 'beneficiarios', label: 'Beneficiários' }, { key: 'dentistas', label: 'Dentistas' }, { key: 'doadores', label: 'Doadores' },
    { key: 'doacoes', label: 'Doações' }, { key: 'voluntarios', label: 'Voluntários' }, { key: 'triagens', label: 'Triagens' },
  ] as const;

  const filtered = useMemo(() => data[tab].filter((item) => JSON.stringify(item).toLowerCase().includes(busca.toLowerCase())), [busca, data, tab]);
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
    ['centraldobem_beneficiarios','centraldobem_dentistas','centraldobem_doadores','centraldobem_doacoes','centraldobem_voluntarios','centraldobem_triagens'].forEach(resetStorageKey);
    const [beneficiarios, dentistas, doadores, doacoes, voluntarios, triagens] = await Promise.all([beneficiarioService.listar(), dentistaService.listar(), doadorService.listar(), doacaoService.listar(), voluntarioService.listar(), triagemService.listar()]);
    setData({ beneficiarios, dentistas, doadores, doacoes, voluntarios, triagens });
    setMsg('Dados de exemplo restaurados com sucesso!');
  };


  const onAdd = () => { setEditing(null); reset({}); setOpenModal(true); };
  const onEdit = (item: AnyEntity) => { setEditing(item); reset(item); setOpenModal(true); };

  const save = async (values: any) => {
    const serviceMap:any = { beneficiarios:beneficiarioService, dentistas:dentistaService, doadores:doadorService, doacoes:doacaoService, voluntarios:voluntarioService, triagens:triagemService };
    const service = serviceMap[tab];
    if (editing && 'id' in editing && editing.id) {
      const updated = await service.atualizar(editing.id, { ...editing, ...values });
      setData((p) => ({ ...p, [tab]: p[tab].map((x:any)=>x.id===editing.id?updated:x) }));
      setMsg('Registro atualizado com sucesso!');
    } else {
      const created = await service.criar(values);
      setData((p) => ({ ...p, [tab]: [...p[tab], created] }));
      setMsg('Registro adicionado com sucesso!');
    }
    setOpenModal(false);
  };

  const onDelete = async () => {
    if (!deleteTarget || !('id' in deleteTarget) || !deleteTarget.id) return;
    const serviceMap:any = { beneficiarios:beneficiarioService, dentistas:dentistaService, doadores:doadorService, doacoes:doacaoService, voluntarios:voluntarioService, triagens:triagemService };
    await serviceMap[tab].remover(deleteTarget.id);
    setData((p) => ({ ...p, [tab]: p[tab].filter((x:any)=>x.id!==deleteTarget.id) }));
    setMsg('Registro excluído com sucesso!');
    setDeleteTarget(null);
  };

  const isEditing = Boolean(editing);
  const disabled = (field: string) => isEditing && ((tab==='beneficiarios' && ['nome','cpf'].includes(field)) || (tab==='dentistas' && ['nome','cro'].includes(field)) || (tab==='doadores' && ['nome','cpfCnpj'].includes(field)) || (tab==='doacoes' && ['doadorId'].includes(field)) || (tab==='voluntarios' && ['nome'].includes(field)) || (tab==='triagens' && ['beneficiarioId'].includes(field)));

  return <div className='space-y-6'>
    <section className='rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white'>
      <h1 className='text-3xl font-bold'>Central do Bem - Área de Gestão da Solução</h1>
      <p className='mt-2'>Gestão de beneficiários, dentistas, doadores, doações, voluntários e triagens, alinhada às tabelas do backend Java/Quarkus.</p>
    </section>

    <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      <DashboardCard title='Total de Beneficiários' value={dashboard.totalBeneficiarios} />
      <DashboardCard title='Total de Dentistas' value={dashboard.totalDentistas} />
      <DashboardCard title='Total de Doadores' value={dashboard.totalDoadores} />
      <DashboardCard title='Total de Doações' value={dashboard.totalDoacoes} />
      <DashboardCard title='Total de Voluntários' value={dashboard.totalVoluntarios} />
      <DashboardCard title='Total de Triagens' value={dashboard.totalTriagens} />
    </section>

    <CrudTabs tabs={tabs.map(t=>({key:t.key,label:t.label}))} active={tab} onChange={(k)=>setTab(k as TabKey)} />

    <section className='rounded-2xl border border-slate-200 bg-white p-5'>
      <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <input value={busca} onChange={(e)=>setBusca(e.target.value)} className='rounded-xl border px-3 py-2 text-sm' placeholder='Buscar por texto...' />
        <div className='flex gap-2'><button onClick={restaurarDados} className='rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600'>Restaurar dados de exemplo</button><button onClick={onAdd} className='rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white'>+ Adicionar {tabs.find(t=>t.key===tab)?.label.slice(0,-1)}</button></div>
      </div>
      <div className='space-y-2'>
        {filtered.map((item:any)=><div key={item.id} className='flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between'><div className='text-sm text-slate-700'><p className='font-semibold'>{item.nome ?? `Registro #${item.id}`}</p><p>{JSON.stringify(item)}</p>{item.status && <StatusBadge text={item.status} />}</div><div className='flex gap-2'><button onClick={()=>onEdit(item)} className='rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white'>Atualizar</button><button onClick={()=>setDeleteTarget(item)} className='rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white'>Deletar</button></div></div>)}
      </div>
    </section>

    <CrudModal open={openModal} onClose={()=>setOpenModal(false)} title={`${isEditing ? 'Atualizar' : 'Adicionar'} ${tabs.find(t=>t.key===tab)?.label.slice(0,-1)}`}>
      <form onSubmit={handleSubmit(save)} className='grid gap-3 md:grid-cols-2'>
        {(tab==='beneficiarios') && <>
          <FormInput label='Nome' registration={register('nome',{required:'Obrigatório'})} error={errors.nome} disabled={disabled('nome')} />
          <FormInput label='CPF' registration={register('cpf',{required:'Obrigatório'})} error={errors.cpf} disabled={disabled('cpf')} />
          <FormInput label='Idade' type='number' registration={register('idade',{valueAsNumber:true,min:{value:1,message:'Idade deve ser positiva'}})} error={errors.idade} />
          <FormInput label='Telefone' registration={register('telefone',{required:'Obrigatório'})} error={errors.telefone} />
          <FormInput label='E-mail' type='email' registration={register('email',{required:'Obrigatório',pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:'E-mail inválido'}})} error={errors.email} />
          <FormSelect label='Status' registration={register('status')} options={[{label:'Aguardando triagem',value:'AGUARDANDO_TRIAGEM'},{label:'Em atendimento',value:'EM_ATENDIMENTO'},{label:'Finalizado',value:'FINALIZADO'}]} />
        </>}
        {tab==='dentistas' && <><FormInput label='Nome' registration={register('nome',{required:'Obrigatório'})} error={errors.nome}/><FormInput label='CRO' registration={register('cro',{required:'Obrigatório'})} error={errors.cro} disabled={disabled('cro')}/><FormInput label='Especialidade' registration={register('especialidade',{required:'Obrigatório'})} error={errors.especialidade}/><FormInput label='Telefone' registration={register('telefone',{required:'Obrigatório'})} error={errors.telefone}/><FormInput label='E-mail' type='email' registration={register('email',{required:'Obrigatório'})} error={errors.email}/><FormSelect label='Disponível' registration={register('disponivel')} options={[{label:'Sim',value:'true'},{label:'Não',value:'false'}]} /></>}
        {tab==='doadores' && <><FormInput label='Nome' registration={register('nome',{required:'Obrigatório'})} error={errors.nome}/><FormInput label='CPF/CNPJ' registration={register('cpfCnpj',{required:'Obrigatório'})} error={errors.cpfCnpj} disabled={disabled('cpfCnpj')}/><FormInput label='Telefone' registration={register('telefone',{required:'Obrigatório'})} error={errors.telefone}/><FormInput label='E-mail' type='email' registration={register('email',{required:'Obrigatório'})} error={errors.email}/><FormSelect label='Tipo' registration={register('tipo')} options={[{label:'Pessoa Física',value:'PESSOA_FISICA'},{label:'Pessoa Jurídica',value:'PESSOA_JURIDICA'}]} /></>}
        {tab==='doacoes' && <><FormInput label='ID doador' type='number' disabled={disabled('doadorId')} registration={register('doadorId',{valueAsNumber:true,required:'Obrigatório'})} error={errors.doadorId}/><FormInput label='Valor' type='number' registration={register('valor',{valueAsNumber:true,min:{value:0.01,message:'Valor positivo'}})} error={errors.valor}/><FormInput label='Data' type='date' registration={register('data',{required:'Obrigatório'})} error={errors.data}/><FormInput label='Finalidade' registration={register('finalidade',{required:'Obrigatório'})} error={errors.finalidade}/></>}
        {tab==='voluntarios' && <><FormInput label='Nome' registration={register('nome',{required:'Obrigatório'})} error={errors.nome} disabled={disabled('nome')}/><FormInput label='Área de atuação' registration={register('areaAtuacao',{required:'Obrigatório'})} error={errors.areaAtuacao}/><FormInput label='Telefone' registration={register('telefone',{required:'Obrigatório'})} error={errors.telefone}/><FormInput label='E-mail' type='email' registration={register('email',{required:'Obrigatório'})} error={errors.email}/><FormSelect label='Ativo' registration={register('ativo')} options={[{label:'Sim',value:'true'},{label:'Não',value:'false'}]} /></>}
        {tab==='triagens' && <><FormInput label='ID beneficiário' type='number' disabled={disabled('beneficiarioId')} registration={register('beneficiarioId',{valueAsNumber:true,required:'Obrigatório'})} error={errors.beneficiarioId}/><FormInput label='ID voluntário' type='number' registration={register('voluntarioId',{valueAsNumber:true,required:'Obrigatório'})} error={errors.voluntarioId}/><FormInput label='Data triagem' type='date' registration={register('dataTriagem',{required:'Obrigatório'})} error={errors.dataTriagem}/><FormSelect label='Prioridade' registration={register('prioridade')} options={[{label:'Baixa',value:'BAIXA'},{label:'Média',value:'MEDIA'},{label:'Alta',value:'ALTA'}]} /><FormTextarea label='Observação' registration={register('observacao',{required:'Obrigatório'})} error={errors.observacao}/><FormTextarea label='Encaminhamento' registration={register('encaminhamento',{required:'Obrigatório'})} error={errors.encaminhamento}/></>}
        <div className='md:col-span-2 flex justify-end gap-2'><button type='button' onClick={()=>setOpenModal(false)} className='rounded-lg border px-4 py-2'>Cancelar</button><button className='rounded-lg bg-primary px-4 py-2 text-white'>{isEditing?'Salvar alterações':'Salvar'}</button></div>
      </form>
    </CrudModal>

    <ConfirmDialog open={Boolean(deleteTarget)} onCancel={()=>setDeleteTarget(null)} onConfirm={onDelete} message='Tem certeza que deseja excluir este registro?' />
    {msg && <p className='rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700'>{msg}</p>}
  </div>;
}
