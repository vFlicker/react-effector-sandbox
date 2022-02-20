import { createEvent, restore } from 'effector';
import { useStore } from 'effector-react';

import { FilterType } from './config';

export const changeFilter = createEvent<string>();

const $currentFilter = restore(changeFilter, FilterType.All);

export const selectors = {
  useCurrentFilter: () => useStore($currentFilter),
};
