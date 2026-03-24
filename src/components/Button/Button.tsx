import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export function Button({ children, className = '', variant = 'primary', ...rest }: PropsWithChildren<ButtonProps>) {
  const baseClasses = 'rounded-xl px-4 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-primary text-white hover:bg-teal-700 focus:ring-primary',
    outline: 'border border-primary text-primary hover:bg-primary/10 focus:ring-primary',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
