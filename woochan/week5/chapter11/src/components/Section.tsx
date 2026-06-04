import type { ReactNode } from 'react';

interface ISectionProps {
  children: ReactNode;
  tint?: string;
  align?: 'left' | 'center' | 'right';
}

export const Section = ({ children, tint = 'transparent', align = 'center' }: ISectionProps) => (
  <section className="section" style={{ backgroundColor: tint }}>
    <div className={`section__inner section__inner--${align}`}>{children}</div>
  </section>
);
