import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../assets/data';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <NavLink to="/home" className="flex items-center gap-3">
          <img src="/imagem/logo-turma-do-bem.png" alt="Turma do Bem" className="h-10 w-auto" />
          <span className="hidden text-sm font-semibold text-dark sm:block">Central do Bem</span>
        </NavLink>

        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          Menu
        </button>

        <nav className={`${isOpen ? 'block' : 'hidden'} absolute left-0 top-full w-full bg-white p-4 md:static md:block md:w-auto md:bg-transparent md:p-0`}>
          <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-100'}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
