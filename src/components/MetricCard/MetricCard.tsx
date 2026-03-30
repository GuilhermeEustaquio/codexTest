interface MetricCardProps {
  value: string;
  label: string;
  className?: string;
}

export function MetricCard({ value, label, className = '' }: MetricCardProps) {
  return (
    <article className={`rounded-2xl border border-emerald-200 bg-gradient-to-b from-white to-emerald-50 p-5 text-center shadow-sm ${className}`.trim()}>
      <strong className="text-3xl font-extrabold text-emerald-800">{value}</strong>
      <span className="mt-1 block text-sm text-emerald-900/80">{label}</span>
    </article>
  );
}
