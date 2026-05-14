import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
interface Option { label: string; value: string; }
interface Props { label: string; registration: UseFormRegisterReturn; options: Option[]; error?: FieldError; }
export function FormSelect({ label, registration, options, error }: Props) { return <div><label className="text-sm font-semibold text-slate-700">{label}</label><select {...registration} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>{error && <small className="text-xs text-rose-600">{error.message}</small>}</div>; }
