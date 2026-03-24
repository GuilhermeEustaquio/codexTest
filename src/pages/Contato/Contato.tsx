import { useForm } from 'react-hook-form';
import type { ContactFormValues } from '../../types';
import { Button } from '../../components/Button/Button';

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
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-dark">Contato</h1>
      <p className="text-slate-700">Fale com a equipe da Central do Bem.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="nome">Nome completo</label>
          <input id="nome" className="w-full rounded-lg border border-slate-300 px-3 py-2" {...register('nome', { required: 'Nome é obrigatório.' })} />
          {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="email">E-mail</label>
          <input
            id="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            {...register('email', {
              required: 'E-mail é obrigatório.',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Informe um e-mail válido.' },
            })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="telefone">Telefone</label>
          <input id="telefone" className="w-full rounded-lg border border-slate-300 px-3 py-2" {...register('telefone')} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="mensagem">Mensagem</label>
          <textarea
            id="mensagem"
            className="min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2"
            {...register('mensagem', { required: 'Mensagem é obrigatória.' })}
          />
          {errors.mensagem && <p className="mt-1 text-sm text-red-600">{errors.mensagem.message}</p>}
        </div>

        <Button type="submit">Enviar mensagem</Button>
        {isSubmitSuccessful && <p className="text-sm font-semibold text-primary">Mensagem enviada com sucesso!</p>}
      </form>
    </section>
  );
}
