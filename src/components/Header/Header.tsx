import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { label: 'Home', path: '/home', icon: '/imagem/icon/home.png' },
  { label: 'Quem Somos', path: '/integrantes', icon: '/imagem/icon/equipe.png' },
  { label: 'Sobre', path: '/sobre', icon: '/imagem/icon/sobre.png' },
  { label: 'FAQ', path: '/faq', icon: '/imagem/icon/faq.png' },
  { label: 'Contato', path: '/contato', icon: '/imagem/icon/contato.png' },
  { label: 'Solução', path: '/solucao', icon: '/imagem/icon/sobre.png' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 shadow-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
        <NavLink to="/home" className="shrink-0" aria-label="Voltar para a página inicial" onClick={() => setIsOpen(false)}>
          <img src="/imagem/logo-turma-do-bem.png" alt="Logo da Turma do Bem" className="h-12 w-auto md:h-14" />
        </NavLink>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-amber-300 transition hover:bg-white/10 md:hidden"
          aria-label="Abrir menu de navegação"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-xl leading-none">☰</span>
        </button>

        <nav
          className={`${isOpen ? 'flex' : 'hidden'} absolute left-4 right-4 top-[74px] rounded-2xl border border-white/20 bg-emerald-900/95 p-3 shadow-xl md:static md:flex md:flex-1 md:items-center md:justify-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <ul className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive ? 'bg-white/20 text-white' : 'text-amber-300 hover:bg-white/15 hover:text-white'
                    }`
                  }
                >
                  <img className="h-4 w-4" src={item.icon} alt="" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink to="/home" className="hidden shrink-0 md:block" aria-label="Conheça a Central do Bem" onClick={() => setIsOpen(false)}>
          <img src="/imagem/logocdb.png" alt="Logo Central do Bem" className="h-11 w-auto" />
        </NavLink>
      </div>
    </header>
  );
}
