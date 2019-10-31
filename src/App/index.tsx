// react libraries
import * as React from 'react';

// third party libraries
import * as queryString from 'query-string';
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
import * as Hooks from 'utils/hooks';

// styles
import './App.scss';

const App: React.FunctionComponent<AppProps> = (props) => {
  initializeGA();
  logPageView(window.location.pathname);

  const [state, setState] = React.useState<AppState>({
    isUserAuthenticated: authService.isAuthenticated(),
    users: [],
  });

  React.useEffect(() => {
    const { location: { search } } = props;
    const { socialToken } = queryString.parse(search);
    if (socialToken) {
      authService.saveToken(socialToken);
      window.location.replace(process.env.PUBLIC_URL);
    }
  },              []);

  Hooks.useAsyncEffect(function* () {
    if (state.isUserAuthenticated) {
      try {
        yield props.getUserDetails();
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
  getUserDetails: () => dispatch(getUserDetails()),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
