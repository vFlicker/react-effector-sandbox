import React, { PropsWithChildren } from 'react';

type H1Props = PropsWithChildren<{
  className?: string
}>

export function H1({ className = '', children }: H1Props): JSX.Element {
  return (
    <h1 className={className}>{children}</h1>
  );
}
