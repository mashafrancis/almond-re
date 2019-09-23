// react libraries
import * as React from 'react';

// components
import Routes from '../routes';

// interfaces
import { AppProps, AppState } from './interfaces';

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <React.Fragment>
      <Routes/>
    </React.Fragment>
  );
};

export default (App);
