// react libraries
import * as React from 'react';

// third party libraries
import * as queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
// import { Connector } from 'mqtt-hooks';

// components
import ErrorBoundary from '@components/ErrorBoundary';
import SnackBar from '@components/SnackBar';
import Routes from '../routes';

// thunk action creators
import { getUserDetails } from '@modules/user';

// interfaces
import { AppProps, AppState } from './interfaces';

// helper functions
import { authService } from '@utils/auth';
import checkUserRole from '@utils/helpers/checkUserRole';
import { initializeGA, logPageView } from '@utils/helpers/googleAnalytics';
import minimumDelay from '@utils/helpers/MinimumDelay';

// context
import { UserContext } from '@context/UserContext';
import { ViewportProvider } from '@context/ViewportContext';
import { MenuProvider } from '@context/MenuContext';

// styles
import './App.scss';

const useEffectAsync = (
  effect: any,
  inputs: React.DependencyList | undefined,
) => {
  React.useEffect(() => {
    effect();
  }, inputs);
};

export const App: React.FunctionComponent<AppProps> = props => {
  const [state, setState] = React.useState<AppState>({
    isUserAuthenticated: authService.isAuthenticated(),
    loading: 'idle',
    isAdmin: false,
  });
  const timerRef = React.useRef<number>();

  const { user } = props;

  useEffectAsync(async () => {
    initializeGA();
    logPageView(window.location.pathname);
    if (state.isUserAuthenticated) {
      try {
        await props.getUserDetails()
          .then(response => {
            setState({
              ...state,
              isAdmin: !checkUserRole(response.userDetails.currentRole.title, 'User'),
            });
          });
      } catch {
        setState({ ...state, loading: 'error' });
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

  // const bufferKey = Buffer.from(`${process.env.KEY}`).toString('utf-8');
  // const bufferCert = Buffer.from(`${process.env.CERT}`).toString('utf-8');
  // const bufferCA = Buffer.from(`${process.env.TRUSTED_CA}`).toString('utf-8');

  // const options = {
  //   port: 8000,
  //   host: process.env.MQTT_HOST,
  //   user: process.env.MQTT_USER,
  //   protocol: process.env.MQTT_PROTOCOL,
  //   password: process.env.MQTT_PASSWORD,
  //   // key: bufferKey,
  //   // cert: bufferCert,
  //   // ca: bufferCA,
  //   rejectUnauthorized: true,
  // };

  const { isUserAuthenticated, isAdmin } = state;
  const {
    _id,
    name,
    email,
    photo,
    devices,
    isVerified,
    activeDevice,
  } = user;

  return (
    // <ReactReduxFirebaseProvider
    //   firebase={firebaseConfig}
    //   config={reactReduxFirebaseConfig}
    //   dispatch={store.dispatch}
    //   createFirestoreInstance={createFirestoreInstance}
    // >
    <UserContext.Provider
      value={{
        _id,
        name,
        email,
        photo,
        devices,
        isVerified,
        activeDevice,
        isAdmin,
      }}>
      <MenuProvider>
        <ViewportProvider>
          {/*<Connector brokerUrl="mqtts://masha:froyogreen@broker.mqttdashboard.com:8000">*/}
            <ErrorBoundary>
              <>
                <SnackBar/>
                <>
                  {
                    location.pathname !== '/'
                    && isUserAuthenticated
                  }
                  <React.Suspense fallback={minimumDelay(import('@components/LinearProgressBar'), 500)}>
                    <Routes/>
                  </React.Suspense>
                </>
              </>
            </ErrorBoundary>
          {/*</Connector>*/}
        </ViewportProvider>
      </MenuProvider>
    </UserContext.Provider>
    // </ReactReduxFirebaseProvider>
  );
};

export const mapStateToProps = (state: { internalServerError: any; user: any; loading: any; }) => ({
  serverError: state.internalServerError,
  user: state.user.userDetails,
  loading: state.loading,
});

export const mapDispatchToProps = (dispatch: any) => ({
  getUserDetails: () => dispatch(getUserDetails()),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
