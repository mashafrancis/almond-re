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

const rootNode = document.getElementById('root');

render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  rootNode,
);
