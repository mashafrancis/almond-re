// react libraries
import * as React from 'react';

// third party libraries
import * as queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// components
import ErrorBoundary from '@components/ErrorBoundary';
import Loader from '@components/Loader';
import SnackBar from '@components/SnackBar';
import Routes from '../routes';
import LinearProgressBar from "@components/LinearProgressBar";

// thunk action creators
import { getUserDetails } from '@modules/user';

// interfaces
import { AppProps, AppState } from './interfaces';

// helper functions
import { authService } from '@utils/auth';
import checkUserRole from '@utils/helpers/checkUserRole';
import { initializeGA, logPageView } from '@utils/helpers/googleAnalytics';

// context
import { UserContext } from '@utils/context';
import { ViewportProvider } from "@context/ViewportContext";
import { MenuProvider } from "@context/MenuContext";

// styles
import './App.scss';

const useEffectAsync = (effect, inputs) => {
  React.useEffect(() => {
    effect()
  }, inputs)
}

export const App: React.FunctionComponent<AppProps> = (props) => {
  const [state, setState] = React.useState<AppState>({
    isUserAuthenticated: authService.isAuthenticated(),
    isFetchingUserDetails: true,
    isAdmin: false,
  });

  const {
    user,
    isFetchingUserDetails
  } = props;

  useEffectAsync(async () => {
    initializeGA();
    logPageView(window.location.pathname);
    if (state.isUserAuthenticated) {
      try {
        await props.getUserDetails()
          .then(response => {
            setState({
              ...state,
              isAdmin: !checkUserRole(response.userDetails.currentRole.title, 'User') })
          });
      } catch {
        setState({ ...state, isFetchingUserDetails: false })
      }
    }
  }, []);

  React.useEffect(() => {
    const { location: { search } } = props;
    const { socialToken } = queryString.parse(search);
    if (socialToken) {
      authService.saveToken(socialToken);
      window.location.replace(process.env.PUBLIC_URL ?? 'http://froyo.almond.com:3000/');
    }
  }, []);

  const checkUserDetailsAndAuthentication = (
    isFetchingUserDetails: boolean,
    isUserAuthenticated: boolean) => (isFetchingUserDetails && isUserAuthenticated);

  const { isUserAuthenticated, isAdmin } = state;
  const {
    _id,
    name,
    email,
    photo,
    isVerified,
    devices,
    activeDevice,
  } = user;

  return (checkUserDetailsAndAuthentication(isFetchingUserDetails, isUserAuthenticated) ?
    <LinearProgressBar /> :
    <UserContext.Provider
      value={{
        _id,
        name,
        email,
        photo,
        isVerified,
        devices,
        activeDevice,
        isAdmin,
      }}
    >
      <MenuProvider>
        <ViewportProvider>
          <ErrorBoundary>
            <React.Fragment>
              <SnackBar/>
              <>
                {
                  location.pathname !== '/'
                  && isUserAuthenticated
                }
                {<Routes/>}
              </>
            </React.Fragment>
          </ErrorBoundary>
        </ViewportProvider>
      </MenuProvider>
    </UserContext.Provider>
  );
}

export const mapStateToProps = state => ({
  serverError: state.internalServerError,
  user: state.user,
  isFetchingUserDetails: state.user.isFetchingUserDetails,
});

export const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails()),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
