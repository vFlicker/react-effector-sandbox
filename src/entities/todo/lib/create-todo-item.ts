import { TodoItem } from '../types';

const id = 1;

export const createTodoItem = (label: string): TodoItem => ({
  id: id + 1,
  label,
  important: false,
  done: false,
});
