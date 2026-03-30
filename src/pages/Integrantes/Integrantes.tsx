import { teamMembers } from '../../assets/data';

export function Integrantes() {
  return (
    <>
      <section className="page-hero">
        <h1 className="highlight-title">Nossa equipe</h1>
        <p className="page-intro">
          Conheça os estudantes responsáveis pelo desenvolvimento da Central do Bem. Somos um time multidisciplinar comprometido em
          transformar a experiência de voluntários, beneficiários e parceiros da Turma do Bem.
        </p>
      </section>

      <div className="container_equipe">
        {teamMembers.map((membro) => (
          <div className="card-equipe" key={membro.rm}>
            <div className="card-inner">
              <div className="card-front">
                <img src={membro.foto} alt={membro.nome} />
                <h3>{membro.nome.split(' ')[0]}</h3>
              </div>

              <div className="card-back">
                <p>Turma: {membro.turma}</p>
                <p>RM: {membro.rm}</p>
                <p>{membro.nome}</p>

                <div className="card-buttons">
                  <a href={membro.linkedin} target="_blank" rel="noreferrer" className="btn-linkedin">
                    <img src="/imagem/icon/linkedin.png" className="social-icon" alt="" /> LinkedIn
                  </a>
                  <a href={membro.github} target="_blank" rel="noreferrer" className="btn-github">
                    <img src="/imagem/icon/github.png" className="social-icon" alt="" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
