import { createEvent, createStore } from 'effector-logger';
import { useStore } from 'effector-react';

import { createTodoItem } from '../lib';
import { TodoList } from '../types';

const initialState = [
  createTodoItem('Breakfast'),
  createTodoItem('Drink coffee'),
  createTodoItem('Learn React'),
];

const toggleProperty = (todoList: TodoList, id: number, propName: 'important' | 'done') => {
  const index = todoList.findIndex((todo) => todo.id === id);
  const oldTodo = todoList[index];
  const newTodo = { ...oldTodo, [propName]: !oldTodo[propName] };

  return [
    ...todoList.slice(0, index),
    newTodo,
    ...todoList.slice(index + 1),
  ];
};

export const addTask = createEvent<string>();
export const toggleDoneTask = createEvent<number>();
export const toggleImportantTask = createEvent<number>();
export const deleteTask = createEvent<number>();

const $todoList = createStore<TodoList>(initialState)
  .on(addTask, (todoList, label) => {
    const newTodo = createTodoItem(label);
    return [...todoList, newTodo];
  })
  .on(toggleDoneTask, (todoList, id) => toggleProperty(todoList, id, 'done'))
  .on(toggleImportantTask, (todoList, id) => toggleProperty(todoList, id, 'important'))
  .on(deleteTask, (todoList, id) => todoList.filter((todoItem) => !(todoItem.id === id)));

export const selectors = {
  useTodoList: () => useStore($todoList),
};
