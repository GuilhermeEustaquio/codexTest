export function ConfirmDialog({ open, onCancel, onConfirm, message }: { open:boolean; onCancel:()=>void; onConfirm:()=>void; message:string }) {
  if (!open) return null;
  return <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'><div className='w-full max-w-md rounded-2xl bg-white p-6'><p className='text-slate-700'>{message}</p><div className='mt-4 flex justify-end gap-2'><button className='rounded-lg border px-3 py-2' onClick={onCancel}>Cancelar</button><button className='rounded-lg bg-rose-600 px-3 py-2 text-white' onClick={onConfirm}>Sim, excluir</button></div></div></div>;
}
