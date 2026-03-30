import type { ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  leading?: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  activeIndex: number | null;
  onToggle: (index: number) => void;
  bordered?: boolean;
}

export function Accordion({ items, activeIndex, onToggle, bordered = true }: AccordionProps) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;

        return (
          <article className="rounded-2xl border border-slate-200 bg-slate-50" key={item.id}>
            <div className="flex items-center gap-3 px-4 py-3">
              {item.leading}
              <button
                className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-slate-800 md:text-base"
                type="button"
                aria-expanded={isOpen}
                onClick={() => onToggle(index)}
              >
                <span>{item.title}</span>
                <span className="text-xl text-teal-700">{isOpen ? '−' : '+'}</span>
              </button>
            </div>
            {isOpen && (
              <div className={`${bordered ? 'border-t border-slate-200 ' : ''}px-4 py-3 text-sm text-slate-600 md:text-base`}>
                {item.content}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
