import React, { ChangeEvent, useState } from 'react';
import './styles.css';

type SearchTodoProps = {
  onSearchChange: (searchText: string) => void
}

export function SearchTodo({ onSearchChange }: SearchTodoProps): JSX.Element {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value);
    onSearchChange(searchText);
  };

  return (
    <input
      type="text"
      id="search-input"
      className="form-control search-input"
      placeholder="type to search"
      onChange={handleInputChange}
      value={searchText}
    />
  );
}
