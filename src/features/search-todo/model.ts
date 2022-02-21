import { combine, createEvent, restore } from 'effector';
import { useStore } from 'effector-react';

import { todoModel, todoTypes } from '@/entities/todo';

const getSearchedTodo = (todoList: todoTypes.TodoList, searchText: string) => {
  if (searchText.length === 0) {
    return todoList;
  }

  return todoList.filter((todo) => todo.label
    .toLowerCase()
    .startsWith(searchText.toLowerCase()));
};

export const setSearchText = createEvent<string>();

const $searchText = restore(setSearchText, '');

export const $searchedTodo = combine(todoModel.$todoList, $searchText, (todoList, searchText) => (
  getSearchedTodo(todoList, searchText)
));

export const selectors = {
  useSearchText: () => useStore($searchText),
  useSearchedTodo: () => useStore($searchedTodo),
};
