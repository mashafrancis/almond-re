// react libraries
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// third party packages
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// components
import App from './App/index';
import * as serviceWorker from './serviceWorker';

// helper functions
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') || document.createElement('div')
);

serviceWorker.register();
