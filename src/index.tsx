// react libraries
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// third party packages
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// components
import App from './App';

// helper functions
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') || document.createElement('div')
);
