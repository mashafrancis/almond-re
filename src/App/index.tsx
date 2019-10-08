// react libraries
import * as React from 'react';

// third party libraries
import useAsyncEffect from '@n1ru4l/use-async-effect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// components
import InternalServerErrorMessage from '../components/InternalServerErrorMessage';
import Loader from '../components/Loader';
import SnackBar from '../components/SnackBar';
import Routes from '../routes';

// thunk action creators
import { getUserDetails } from '../store/modules/user';

// interfaces
import { AppProps, AppState } from './interfaces';

// helper functions
import { authService } from '../utils/auth';

// styles
import './App.scss';

const App: React.FunctionComponent<AppProps> = (props) => {
  const [state, setState] = React.useState<AppState>({
    isUserAuthenticated: authService.isAuthenticated(),
    isGettingUserDetails: true,
    users: [],
  });

  useAsyncEffect(function* () {
    const user = authService.getUser();

    if (state.isUserAuthenticated) {
      props.getUserDetails(user.email);
      setState({ ...state, isGettingUserDetails: false });
    }
  },             []);

  const { isUserAuthenticated, isGettingUserDetails } = state;

  return isGettingUserDetails && isUserAuthenticated
      ? <Loader />
      : <React.Fragment>
        <SnackBar />
        <>
          {
            location.pathname !== '/'
            && isUserAuthenticated
          }
          { props.serverError.error ? <InternalServerErrorMessage /> : <Routes /> }
        </>
      </React.Fragment>;
};

export const mapStateToProps = state => ({
  serverError: state.internalServerError,
  user: state.user.user,
});

export const mapDispatchToProps = dispatch => ({
  getUserDetails: userId => dispatch(getUserDetails(userId)),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
