import React, { ChangeEvent, useState } from 'react';

import { todoModel } from '@/entities/todo';

import './styles.css';

export function AddTodo(): JSX.Element {
  const [label, setLabel] = useState('');

  const handleSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    todoModel.addTask(label);
    setLabel('');
  };

  return (
    <form className="bottom-panel d-flex" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control new-todo-label"
        placeholder="What needs to be done"
        onChange={(evt) => setLabel(evt.target.value)}
        value={label}
      />

      <button type="submit" className="btn btn-outline-secondary">Add</button>
    </form>
  );
}
