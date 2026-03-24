import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../assets/data';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <NavLink to="/home" className="group flex items-center gap-3">
          <img src="/imagem/logo-turma-do-bem.png" alt="Turma do Bem" className="h-10 w-auto transition-transform group-hover:scale-105" />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Turma do Bem</p>
            <span className="text-sm font-semibold text-dark">Central do Bem</span>
          </div>
        </NavLink>

        <button
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-primary hover:text-primary md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
          aria-expanded={isOpen}
          aria-label="Abrir menu de navegação"
        >
          Menu
        </button>

        <nav
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute left-0 top-full w-full border-b border-slate-200 bg-white p-4 md:static md:block md:w-auto md:border-none md:bg-transparent md:p-0`}
        >
          <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-dark'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-1 md:pl-2 md:pt-0">
              <a
                href="https://turmadobem.org.br/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl bg-secondary px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                Site oficial
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
