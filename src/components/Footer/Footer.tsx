import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <img src="/imagem/logo-turma-do-bem.png" alt="Turma do Bem" className="footer-logo" />
          <p>Central do Bem – Plataforma interna desenvolvida para modernizar e integrar a comunicação da Turma do Bem.</p>
        </div>

        <div className="footer-links">
          <h4>Navegação</h4>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/integrantes">Quem Somos</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre o Projeto</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/contato">Contato</Link>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contato</h4>
          <p>
            Email Integrantes do Grupo:
            <br />
            <a href="mailto:guilhermepeustaquio@gmail.com">guilhermepeustaquio@gmail.com</a>
            <br />
            <a href="mailto:caiocc2006@gmail.com">caiocc2006@gmail.com</a>
            <br />
            <a href="mailto:matheustavares1356@gmail.com">matheustavares1356@gmail.com</a>
          </p>
          <p>
            Conheça a TdB:
            <br />
            <a href="https://turmadobem.org.br/" target="_blank" rel="noreferrer">
              www.turmadobem.org
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Central do Bem. Projeto acadêmico - FIAP | Challenge Turma do Bem</p>
      </div>
    </footer>
  );
}
