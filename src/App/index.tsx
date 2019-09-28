// react libraries
import * as React from 'react';

// third party libraries
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// components
import InternalServerErrorMessage from '../components/InternalServerErrorMessage';
import SnackBar from '../components/SnackBar';
import Routes from '../routes';

// interfaces
import { AppProps, AppState } from './interfaces';

// styles
import './App.scss';

const App: React.FunctionComponent<AppProps> = (props) => {
  return (
    <React.Fragment>
      <SnackBar />
      { props.serverError.error ? <InternalServerErrorMessage /> : <Routes /> }
    </React.Fragment>
  );
};

export const mapStateToProps = state => ({
  serverError: state.internalServerError,
});

export default compose(withRouter, connect(mapStateToProps))(App);
