import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';

const initialState = {
  firstName: '',
  lastName: '',
};

const from = restore

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
