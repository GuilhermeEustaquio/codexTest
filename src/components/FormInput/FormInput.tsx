import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
interface Props { label: string; type?: string; registration: UseFormRegisterReturn; error?: FieldError; }
export function FormInput({ label, type = 'text', registration, error }: Props) { return <div><label className="text-sm font-semibold text-slate-700">{label}</label><input type={type} {...registration} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"/>{error && <small className="text-xs text-rose-600">{error.message}</small>}</div>; }
