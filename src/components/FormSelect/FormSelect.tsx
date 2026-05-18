import type { UseFormRegisterReturn } from 'react-hook-form';
interface Option { label: string; value: string; }
interface Props { label: string; registration: UseFormRegisterReturn; options: Option[]; error?: any; disabled?: boolean; }
export function FormSelect({ label, registration, options, error, disabled }: Props) { return <div><label className="text-sm font-semibold text-slate-700">{label}</label><select {...registration} disabled={disabled} className={`mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm ${disabled ? 'bg-slate-100 text-slate-500' : ''}`}>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>{error && <small className="text-xs text-rose-600">{error.message}</small>}</div>; }
