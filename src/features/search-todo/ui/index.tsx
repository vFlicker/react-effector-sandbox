import React, { ChangeEvent, useState } from 'react';

import { searchTodoModel } from '..';

import './styles.css';

export function SearchTodo(): JSX.Element {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value);
    searchTodoModel.setSearchText(searchText);
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
