import React from 'react';

import { AddTodo } from '@/features/add-todo';
import { SearchTodo } from '@/features/search-todo';
import { TodoFilters, todoFiltersModel } from '@/features/todo-filters';
import { TodoList } from '@/entities/todo';

import { Header } from './header';

import './styles.css';

export function TodoApp(): JSX.Element {
  const visibleItems = todoFiltersModel.selectors.useFilteredTodoList();

  const doneCount = visibleItems.filter((todo) => todo.done).length;
  const todoCount = visibleItems.length - doneCount;

  return (
    <div className="todo-app">
      <Header todo={todoCount} done={doneCount} />
      <div className="search-panel d-flex">
        <SearchTodo />
        <TodoFilters />
      </div>
      <TodoList todoList={visibleItems} />
      <AddTodo />
    </div>
  );
}
