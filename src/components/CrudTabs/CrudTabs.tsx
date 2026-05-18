interface TabItem { key: string; label: string }
interface Props { tabs: TabItem[]; active: string; onChange: (key: string)=>void }
export function CrudTabs({ tabs, active, onChange }: Props) {
  return <div className='flex flex-wrap gap-2'>{tabs.map(t => <button key={t.key} onClick={()=>onChange(t.key)} className={`rounded-full px-4 py-2 text-sm font-semibold ${active===t.key?'bg-primary text-white':'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{t.label}</button>)}</div>;
}
