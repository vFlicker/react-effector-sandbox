import { combine, createEvent, restore } from 'effector';
import { useStore } from 'effector-react';

import { todoTypes } from '@/entities/todo';

import { searchTodoModel } from '../search-todo';
import { FilterType } from './config';

const getFilteredTodo = (todoList: todoTypes.TodoList, filterType: string): todoTypes.TodoList => {
  switch (filterType) {
    case FilterType.Done:
      return todoList.filter((todo) => todo.done);
    case FilterType.Active:
      return todoList.filter((todo) => !todo.done);
    default:
      return todoList;
  }
};

export const changeFilter = createEvent<string>();

const $currentFilter = restore(changeFilter, FilterType.All);

const $filteredTodoList = combine(
  searchTodoModel.$searchedTodo,
  $currentFilter,
  (searchedTodo, currentFilter) => getFilteredTodo(searchedTodo, currentFilter),
);

export const selectors = {
  useCurrentFilter: () => useStore($currentFilter),
  useFilteredTodoList: () => useStore($filteredTodoList),
};
