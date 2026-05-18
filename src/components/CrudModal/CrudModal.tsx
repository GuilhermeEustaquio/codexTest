import type { ReactNode } from 'react';
export function CrudModal({ open, title, children, onClose }: { open:boolean; title:string; children:ReactNode; onClose:()=>void }) {
  if (!open) return null;
  return <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'><div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl'><div className='mb-4 flex items-center justify-between'><h3 className='text-xl font-bold'>{title}</h3><button onClick={onClose} className='text-slate-500'>✕</button></div>{children}</div></div>;
}
