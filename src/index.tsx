// react libraries
import React from 'react';
import { render } from 'react-dom';

// third party packages
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// components
import App from './App';

// helper functions
import store from './store';

render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root') || document.createElement('div'),
);
