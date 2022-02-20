import React from 'react';

type TodoFilters = {
  filter: string
  onFilterChange: () => void
}

export const FilterType = {
  ALL: 'all',
  ACTIVE: 'active',
  DONE: 'done',
};

const buttons = [
  { name: FilterType.ALL, label: 'All' },
  { name: FilterType.ACTIVE, label: 'Active' },
  { name: FilterType.DONE, label: 'Done' },
];

export function TodoFilters({
  filter,

  onFilterChange,
}: TodoFilters): JSX.Element {
  return (
    <div className="btn-group">
      {buttons.map(({ name, label }) => {
        const isActive = filter === name;
        const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

        return (
          <button
            type="button"
            className={`btn ${clazz}`}
            onClick={onFilterChange.bind(null, name)}
            key={name}
          >
            { label }
          </button>
        );
      })}
    </div>
  );
}
