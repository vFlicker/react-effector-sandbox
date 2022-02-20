import React, { InputHTMLAttributes } from 'react';

type InputProps = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps): JSX.Element {
  return (
    <input className="input" type="text" {...props} />
  );
}
