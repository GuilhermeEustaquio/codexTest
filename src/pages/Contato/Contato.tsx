import { useForm } from 'react-hook-form';
import type { ContactFormValues } from '../../types';

export function Contato() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormValues>();

  const onSubmit = (data: ContactFormValues) => {
    console.log('Contato enviado:', data);
    reset();
  };

  return (
    <div className="contact-page">
      <section className="contact-hero full-bleed" aria-labelledby="contact-title">
        <div className="layout-wrapper contact-hero-content">
          <span className="section-tag">Contato</span>
          <h1 id="contact-title">Converse com a Central do Bem</h1>
          <p>
            Estamos disponíveis para apoiar voluntários, parceiros e beneficiários da Turma do Bem. Envie uma mensagem pelo formulário
            ou escolha o canal que melhor funciona para você.
          </p>
        </div>
      </section>

      <section className="contact-grid" id="contact-form">
        <div className="contact-card">
          <h2>Envie uma mensagem</h2>
          <p>Compartilhe suas dúvidas, sugestões ou necessidades. Nossa equipe responde em até 2 dias úteis.</p>
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="txtNome">Nome completo</label>
              <input
                type="text"
                id="txtNome"
                placeholder="Como devemos te chamar?"
                {...register('nome', { required: 'Nome é obrigatório' })}
              />
              {errors.nome && <small>{errors.nome.message}</small>}
            </div>

            <div>
              <label htmlFor="txtEmail">E-mail</label>
              <input
                type="email"
                id="txtEmail"
                placeholder="nome@email.com"
                {...register('email', { required: 'E-mail é obrigatório' })}
              />
              {errors.email && <small>{errors.email.message}</small>}
            </div>

            <div>
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" placeholder="(00) 00000-0000" {...register('telefone')} />
            </div>

            <div>
              <label htmlFor="txtMsg">Mensagem</label>
              <textarea id="txtMsg" placeholder="Conte como podemos ajudar" {...register('mensagem', { required: true })} />
            </div>

            <button type="submit" className="primary-button">
              Enviar mensagem
            </button>
            {isSubmitSuccessful && <p>Mensagem enviada com sucesso!</p>}
          </form>
        </div>

        <aside className="contact-info">
          <h2>Outros canais</h2>
          <p>Se preferir, você também pode falar com o time por e-mail ou explorar outros materiais da Turma do Bem.</p>

          <div className="contact-list">
            <div className="contact-item">
              <div className="contact-badge">📧</div>
              <div>
                <strong>E-mail da equipe</strong>
                <p>
                  <a href="mailto:guilhermepeustaquio@gmail.com">guilhermepeustaquio@gmail.com</a>
                  <br />
                  <a href="mailto:caiocc2006@gmail.com">caiocc2006@gmail.com</a>
                  <br />
                  <a href="mailto:matheustavares1356@gmail.com">matheustavares1356@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-badge">🌐</div>
              <div>
                <strong>Conheça a Turma do Bem</strong>
                <p>
                  <a href="https://turmadobem.org.br/" target="_blank" rel="noreferrer">
                    www.turmadobem.org.br
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-badge">⏰</div>
              <div>
                <strong>Horário de atendimento</strong>
                <p>Segunda a sexta-feira, das 9h às 18h.</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-badge">🤝</div>
              <div>
                <strong>Parcerias e voluntariado</strong>
                <p>Envie seu interesse pelo formulário e retornaremos com as próximas etapas.</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
