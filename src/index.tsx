// react libraries
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// third party packages
import * as Sentry from '@sentry/browser';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// components
import App from './App';
import * as serviceWorker from './serviceWorker';

// helper functions
import store from './store';

const RELEASE = '0.1.0';
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://cffb9ca2b0b24bb1bef9ca6d4a038571@sentry.io/1807584',
    release: RELEASE,
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') || document.createElement('div')
);

serviceWorker.register();
