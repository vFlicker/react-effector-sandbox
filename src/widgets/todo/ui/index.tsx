import React, { useState } from 'react';

import { AddTodo, SearchTodo, TodoFilters } from '@/features';
import { FilterType } from '@/features/todo-filters';

import { TodoList, TodoTypes } from '@/entities/todo';
import { Header } from './header';

import './styles.css';

let id = 1;

const createTodoItem = (label: string): TodoTypes.TodoItem => ({
  // eslint-disable-next-line no-plusplus
  id: id++,
  label,
  important: false,
  done: false,
});

const getFilteredTodo = (todoList: TodoTypes.TodoList, filterType: string) => {
  switch (filterType) {
    case FilterType.DONE:
      return todoList.filter((todo) => todo.done);
    case FilterType.ACTIVE:
      return todoList.filter((todo) => !todo.done);
    default:
      return todoList;
  }
};

const getSearchedTodo = (todoList: TodoTypes.TodoList, searchText: string) => {
  if (searchText.length === 0) {
    return todoList;
  }

  return todoList.filter((todo) => todo.label
    .toLowerCase()
    .startsWith(searchText.toLowerCase()));
};

const toggleProperty = (todoList: TodoTypes.TodoList, id: number, propName: 'important' | 'done') => {
  const index = todoList.findIndex((todo) => todo.id === id);
  const oldTodo = todoList[index];
  const newTodo = { ...oldTodo, [propName]: !oldTodo[propName] };

  return [
    ...todoList.slice(0, index),
    newTodo,
    ...todoList.slice(index + 1),
  ];
};

export function TodoApp(): JSX.Element {
  const [todoList, setTodoList] = useState([
    createTodoItem('Breakfast'),
    createTodoItem('Drink coffee'),
    createTodoItem('Learn React'),
  ]);

  const [searchText, setSearchText] = useState('');

  const [currentFilter, setCurrentFilter] = useState(FilterType.ALL);

  const handleDeleteClick = (id: number) => {
    setTodoList(todoList.filter((todoItem) => !(todoItem.id === id)));
  };

  const handleSearchChange = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleTodoSubmit = (label: string) => {
    const newTodo = createTodoItem(label);
    setTodoList([...todoList, newTodo]);
  };

  const handleToggleDoneClick = (id: number) => {
    setTodoList(toggleProperty(todoList, id, 'done'));
  };

  const handleToggleImportantClick = (id: number) => {
    setTodoList(toggleProperty(todoList, id, 'important'));
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
      <TodoList
        todoList={visibleItems}
        onDeleteClick={() => handleDeleteClick}
        onToggleDoneClick={() => handleToggleDoneClick}
        onToggleImportantClick={() => handleToggleImportantClick}
      />
      <AddTodo onTodoSubmit={handleTodoSubmit} />
    </div>
  );
}
