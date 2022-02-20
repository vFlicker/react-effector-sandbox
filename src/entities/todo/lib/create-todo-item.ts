import { TodoItem } from '../types';

let id = 1;

export const createTodoItem = (label: string): TodoItem => ({
  // eslint-disable-next-line no-plusplus
  id: id++,
  label,
  important: false,
  done: false,
});
