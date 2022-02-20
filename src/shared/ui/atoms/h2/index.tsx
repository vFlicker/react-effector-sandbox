import React, { PropsWithChildren } from 'react';

type H2Props = PropsWithChildren<{
  className?: string
}>

export function H2({ className = '', children }: H2Props): JSX.Element {
  return (
    <h2 className={className}>{children}</h2>
  );
}
