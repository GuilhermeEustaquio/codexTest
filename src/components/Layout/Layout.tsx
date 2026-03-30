import type { PropsWithChildren } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
