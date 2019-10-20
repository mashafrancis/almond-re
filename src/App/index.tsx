// react libraries
import * as React from 'react';

// third party libraries
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// components
import InternalServerErrorMessage from 'components/InternalServerErrorMessage';
import Loader from 'components/Loader';
import SnackBar from 'components/SnackBar';
import Routes from '../routes';

// thunk action creators
import { getUserDetails } from 'modules/user';

// interfaces
import { AppProps, AppState } from './interfaces';

// helper functions
import { authService } from 'utils/auth';
import { initializeGA, logPageView } from 'utils/helpers/googleAnalytics';
import { initializeGTM } from 'utils/helpers/googleTagManager';
import * as Hooks from 'utils/hooks';

// styles
import './App.scss';

const App: React.FunctionComponent<AppProps> = (props) => {
  const [state, setState] = React.useState<AppState>({
    isUserAuthenticated: authService.isAuthenticated(),
    users: [],
  });

  Hooks.useAsyncEffect(function* () {
    initializeGTM();
    initializeGA();
    logPageView(window.location.pathname);
    const user = authService.getUser();

    if (state.isUserAuthenticated) {
      try {
        yield props.getUserDetails(user.email);
      } catch {
        setState({ ...state, isUserAuthenticated: true });
      }
    }
  },                   []);

  const checkUserDetailsAndAuthentication = (
    isGettingUserDetails: boolean,
    isUserAuthenticated: boolean) => (isGettingUserDetails && isUserAuthenticated);

  const { isUserAuthenticated } = state;
  const { isGettingUserDetails } = props;

  return checkUserDetailsAndAuthentication(isGettingUserDetails, isUserAuthenticated)
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
  isGettingUserDetails: state.user.isGettingUserDetails,
});

export const mapDispatchToProps = dispatch => ({
  getUserDetails: userId => dispatch(getUserDetails(userId)),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
