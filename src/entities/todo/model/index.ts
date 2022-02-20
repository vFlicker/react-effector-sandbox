import { createEvent, restore } from 'effector';
import { useStore } from 'effector-react';

import { createTodoItem } from '../lib';
import { TodoList } from '../types';

const initialState = [
  createTodoItem('Breakfast'),
  createTodoItem('Drink coffee'),
  createTodoItem('Learn React'),
];

export const setTodoList = createEvent<TodoList>();

const $todoList = restore<TodoList>(setTodoList, initialState);

export const selectors = {
  useTodoList: () => useStore($todoList),
};
