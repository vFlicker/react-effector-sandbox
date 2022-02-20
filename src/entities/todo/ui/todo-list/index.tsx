import React from 'react';

import { deleteTask, toggleDoneTask, toggleImportantTask } from '../../model';

import { TodoList } from '../../types';
import { TodoItem } from '../todo-item';

import './styles.css';

type TodoListProps = {
  todoList: TodoList
}

export function TodoList({ todoList }: TodoListProps) {
  return (
    <ul className="todo-list list-group">
      {todoList.map(({ id, ...todoItem }) => (
        <li className="list-group-item" key={id}>
          <TodoItem
            {...todoItem}
            onDeleteClick={() => deleteTask(id)}
            onToggleDoneClick={() => toggleDoneTask(id)}
            onToggleImportantClick={() => toggleImportantTask(id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
