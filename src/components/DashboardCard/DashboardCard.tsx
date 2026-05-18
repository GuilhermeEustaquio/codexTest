interface Props { title: string; value: number; }
export function DashboardCard({ title, value }: Props) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">{title}</p><p className="mt-1 text-2xl font-bold text-slate-900">{value}</p></div>;
}
