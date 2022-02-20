import React, { useState } from 'react';

import { AddTodo, SearchTodo, TodoFilters } from '@/features';
import { FilterType } from '@/features/todo-filters';

import {
  createTodoItem,
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

const toggleProperty = (todoList: todoTypes.TodoList, id: number, propName: 'important' | 'done') => {
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
  const [searchText, setSearchText] = useState('');
  const [currentFilter, setCurrentFilter] = useState(FilterType.ALL);

  const todoList = todoModel.selectors.useTodoList();

  const handleDeleteClick = (id: number) => {
    todoModel.setTodoList(todoList.filter((todoItem) => !(todoItem.id === id)));
  };

  const handleSearchChange = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleTodoSubmit = (label: string) => {
    const newTodo = createTodoItem(label);
    todoModel.setTodoList([...todoList, newTodo]);
  };

  const handleToggleDoneClick = (id: number) => {
    todoModel.setTodoList(toggleProperty(todoList, id, 'done'));
  };

  const handleToggleImportantClick = (id: number) => {
    todoModel.setTodoList(toggleProperty(todoList, id, 'important'));
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
