import React from 'react';

import './styles.css';

type TodoItemProps = {
  done: boolean
  important: boolean
  label: string

  onDeleteClick: () => void
  onToggleDoneClick: () => void
  onToggleImportantClick: () => void
}

export function TodoItem({
  done,
  important,
  label,

  onDeleteClick,
  onToggleDoneClick,
  onToggleImportantClick,
}: TodoItemProps): JSX.Element {
  let classNames = 'todo-item';

  if (done) {
    classNames += ' done';
  }

  if (important) {
    classNames += ' important';
  }

  return (
    <span className={classNames}>
      <span className="todo-item-label">{label}</span>

      <button
        type="button"
        className="btn btn-outline-success btn-sm float-right"
        onClick={onToggleImportantClick}
      >
        <i className="fa fa-exclamation" />
      </button>

      <button
        type="button"
        className="btn btn-outline-danger btn-sm float-right"
        onClick={onDeleteClick}
      >
        <i className="fa fa-trash-o" />
      </button>

      <button
        type="button"
        className="btn btn-outline-success btn-sm float-right"
        onClick={onToggleDoneClick}
      >
        <i className="fa fa-exclamation" />
      </button>
    </span>
  );
}
