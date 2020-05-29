// react libraries
import * as React from 'react';

// third party libraries
import * as queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// components
import ErrorBoundary from '@components/ErrorBoundary';
import SnackBar from '@components/SnackBar';
import Routes from '../routes';
import LinearProgressBar from "@components/LinearProgressBar";
import { Transition } from 'react-transition-group';

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
import { Fade } from "@material-ui/core";

const useEffectAsync = (effect, inputs) => {
  React.useEffect(() => {
    effect()
  }, inputs)
}

export const App: React.FunctionComponent<AppProps> = (props) => {
  const [state, setState] = React.useState<AppState>({
    isUserAuthenticated: authService.isAuthenticated(),
    loading: 'idle',
    isAdmin: false,
  });
  const timerRef = React.useRef<number>();

  const {
    user,
    loading
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
        setState({ ...state, loading: 'error' })
      }
    }
  }, []);

  React.useEffect(() => {
    const { location: { search } } = props;
    const { socialToken } = queryString.parse(search);
    if (socialToken) {
      authService.saveToken(socialToken);
      window.location.replace(process.env.PUBLIC_URL as string);
    }
  }, []);

  React.useEffect(() => () => {
    clearTimeout(timerRef.current);
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

  return (
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
                {
                  <React.Suspense fallback={
                    <Fade
                      in={props.loading === 'requesting'}
                      style={{ transitionDelay: props.loading === 'requesting' ? '800ms' : '0ms' }}
                      unmountOnExit
                    >
                      <LinearProgressBar />
                    </Fade>
                  }>
                    <Routes/>
                  </React.Suspense>
                  }
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
  loading: state.loading,
});

export const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails()),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
