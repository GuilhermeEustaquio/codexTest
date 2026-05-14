import type { UseFormRegisterReturn } from 'react-hook-form';
export function FormTextarea({ label, registration, error }: { label:string; registration:UseFormRegisterReturn; error?: any }) {
  return <div><label className='text-sm font-semibold text-slate-700'>{label}</label><textarea {...registration} rows={3} className='mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm'/>{error && <small className='text-xs text-rose-600'>{error.message}</small>}</div>;
}
