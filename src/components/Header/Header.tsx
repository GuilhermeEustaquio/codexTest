import { NavLink } from 'react-router-dom';
import { useId, useState } from 'react';

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
  const navId = useId();

  return (
    <header className="site-header">
      <div className="header-content">
        <NavLink to="/home" className="brand" aria-label="Voltar para a página inicial">
          <img src="/imagem/logo-turma-do-bem.png" alt="Logo da Turma do Bem" />
        </NavLink>

        <input
          type="checkbox"
          id={navId}
          className="nav-toggle"
          aria-label="Abrir menu de navegação"
          checked={isOpen}
          onChange={(event) => setIsOpen(event.target.checked)}
        />
        <label htmlFor={navId} className="nav-toggle-label">
          <span />
        </label>

        <nav className="site-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} onClick={() => setIsOpen(false)}>
                  <img className="nav-icon" src={item.icon} alt="" /> {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink to="/home" className="brand brand-secondary" aria-label="Conheça a Central do Bem">
          <img src="/imagem/logocdb.png" alt="Logo Central do Bem" />
        </NavLink>
      </div>
    </header>
  );
}
