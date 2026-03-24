import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  children?: ReactNode;
}

export function Card({ title, description, image, children }: CardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
      {image && <img src={image} alt={title} className="h-44 w-full object-cover" />}
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-bold text-dark">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
        {children}
      </div>
    </article>
  );
}
