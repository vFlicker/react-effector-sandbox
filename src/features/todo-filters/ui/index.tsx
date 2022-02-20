import React from 'react';

import { FilterType } from '../config';
import { changeFilter, selectors } from '../model';

const buttons = [
  { name: FilterType.All, label: 'All' },
  { name: FilterType.Active, label: 'Active' },
  { name: FilterType.Done, label: 'Done' },
];

export function TodoFilters(): JSX.Element {
  const currentFilter = selectors.useCurrentFilter();

  return (
    <div className="btn-group">
      {buttons.map(({ name, label }) => {
        const isActive = currentFilter === name;
        const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

        return (
          <button
            type="button"
            className={`btn ${clazz}`}
            onClick={() => changeFilter(name)}
            key={name}
          >
            { label }
          </button>
        );
      })}
    </div>
  );
}
