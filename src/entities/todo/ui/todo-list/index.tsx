import React from 'react';

import { TodoList } from '../../types';
import { TodoItem } from '../todo-item';

import './styles.css';

type TodoListProps = {
  todoList: TodoList

  onDeleteClick: () => void
  onToggleDoneClick: () => void
  onToggleImportantClick: () => void
}

export function TodoList({
  todoList,

  onDeleteClick,
  onToggleDoneClick,
  onToggleImportantClick,
}: TodoListProps) {
  return (
    <ul className="todo-list list-group">
      {todoList.map(({ id, ...todoItem }) => (
        <li className="list-group-item" key={id}>
          <TodoItem
            {...todoItem}
            onDeleteClick={onDeleteClick}
            onToggleDoneClick={onToggleDoneClick}
            onToggleImportantClick={onToggleImportantClick}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
