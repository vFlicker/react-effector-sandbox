import React, { useState } from 'react';

import { AddTodo, SearchTodo, TodoFilters } from '@/features';
import { FilterType } from '@/features/todo-filters';

import {
  TodoList,
  todoModel,
  todoTypes,
} from '@/entities/todo';
import { Header } from './header';

import './styles.css';

const getFilteredTodo = (todoList: todoTypes.TodoList, filterType: string) => {
  switch (filterType) {
    case FilterType.DONE:
      return todoList.filter((todo) => todo.done);
    case FilterType.ACTIVE:
      return todoList.filter((todo) => !todo.done);
    default:
      return todoList;
  }
};

const getSearchedTodo = (todoList: todoTypes.TodoList, searchText: string) => {
  if (searchText.length === 0) {
    return todoList;
  }

  return todoList.filter((todo) => todo.label
    .toLowerCase()
    .startsWith(searchText.toLowerCase()));
};

export function TodoApp(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [currentFilter, setCurrentFilter] = useState(FilterType.ALL);

  const todoList = todoModel.selectors.useTodoList();

  const handleSearchChange = (searchText: string) => {
    setSearchText(searchText);
  };

  const visibleItems = getFilteredTodo(
    getSearchedTodo(todoList, searchText),
    currentFilter,
  );

  const doneCount = visibleItems.filter((todo) => todo.done).length;
  const todoCount = visibleItems.length - doneCount;

  return (
    <div className="todo-app">
      <Header todo={todoCount} done={doneCount} />
      <div className="search-panel d-flex">
        <SearchTodo onSearchChange={handleSearchChange} />
        <TodoFilters
          onFilterChange={() => setCurrentFilter}
          filter={currentFilter}
        />
      </div>
      <TodoList todoList={visibleItems} />
      <AddTodo />
    </div>
  );
}
