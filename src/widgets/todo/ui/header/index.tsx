import React from 'react';
import { H1, H2 } from '@/shared/ui';
import './styles.css';

type HeaderProps = {
  todo: number
  done: number
}

export function Header({ todo, done }: HeaderProps): JSX.Element {
  return (
    <div className="header d-flex">
      <H1>Todo List</H1>
      <H2>
        {todo}
        {' '}
        more to do,
        {' '}
        {done}
        {' '}
        done
      </H2>
    </div>
  );
}
