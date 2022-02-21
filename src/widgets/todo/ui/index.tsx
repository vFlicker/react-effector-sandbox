import React from 'react';

import { AddTodo } from '@/features/add-todo';
import { SearchTodo, searchTodoModel } from '@/features/search-todo';
import { TodoFilters, todoFiltersConfig, todoFiltersModel } from '@/features/todo-filters';
import { TodoList, todoTypes } from '@/entities/todo';

import { Header } from './header';

import './styles.css';

const getFilteredTodo = (todoList: todoTypes.TodoList, filterType: string) => {
  switch (filterType) {
    case todoFiltersConfig.FilterType.Done:
      return todoList.filter((todo) => todo.done);
    case todoFiltersConfig.FilterType.Active:
      return todoList.filter((todo) => !todo.done);
    default:
      return todoList;
  }
};

export function TodoApp(): JSX.Element {
  const currentFilter = todoFiltersModel.selectors.useCurrentFilter();
  const searchedTodo = searchTodoModel.selectors.useSearchedTodo();

  const visibleItems = getFilteredTodo(
    searchedTodo,
    currentFilter,
  );

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
