// react libraries
import React, { useEffect, useState, StrictMode, DependencyList, Suspense } from 'react';

// third party libraries
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Connector } from 'mqtt-hooks';

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
import checkUserRole from '@utils/checkUserRole';
import { initializeGA, logPageView } from '@utils/googleAnalytics';
import minimumDelay from '@utils/MinimumDelay';

// context
import { UserContext } from '@context/UserContext';
import { ViewportProvider } from '@context/ViewportContext';
import { ComponentProvider } from '@context/ComponentContext';

// styles
import './App.scss';

const useEffectAsync = (effect: any, inputs: DependencyList | undefined) => {
  useEffect(() => {
    effect();
  }, inputs);
};

export const App: React.FunctionComponent<AppProps> = props => {
  const [state, setState] = useState<AppState>({
    isUserAuthenticated: authService.isAuthenticated(),
    loading: 'idle',
    isAdmin: false,
  });
  const timerRef = React.useRef<number>();

  const { user, snack } = props;

  useEffect(() => {
    initializeGA();
    logPageView(window.location.pathname);
  }, []);

  useEffectAsync(async () => {
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

  useEffect(() => {
    const { location: { search } } = props;
    const { socialToken } = queryString.parse(search);
    if (socialToken) {
      authService.saveToken(socialToken);
      window.location.replace(process.env.PUBLIC_URL as string);
    }
  }, []);

  useEffect(() => () => {
    clearTimeout(timerRef.current);
  }, []);

  const bufferKey = Buffer.from(`${process.env.KEY}`).toString('utf-8');
  const bufferCert = Buffer.from(`${process.env.CERT}`).toString('utf-8');
  const bufferCA = Buffer.from(`${process.env.TRUSTED_CA}`).toString('utf-8');

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

  const userDetailsOnProvider = {
    _id,
    name,
    email,
    photo,
    devices,
    isVerified,
    activeDevice,
    isAdmin,
  };

  const options = {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD,
    keepalive: 30,
    clientId: 'almond',
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: false,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'almond/lastWill',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false,
    },
    // key: bufferKey,
    // cert: bufferCert,
    // ca: bufferCA,
    rejectUnauthorized: false,
  };

  return (
    // <ErrorBoundary>
      <Connector brokerUrl={`mqtts://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`} opts={options}>
        <UserContext.Provider value={userDetailsOnProvider}>
          <ComponentProvider>
            <ViewportProvider>
              <StrictMode>
                <SnackBar snack={snack} />
                { window.location.pathname !== '/' && isUserAuthenticated }
                <Suspense fallback={minimumDelay(import('@components/LinearProgressBar'), 500)}>
                  <Routes />
                </Suspense>
              </StrictMode>
            </ViewportProvider>
          </ComponentProvider>
        </UserContext.Provider>
      </Connector>
    // </ErrorBoundary>
  );
};

export const mapStateToProps = (state: any) => ({
  serverError: state.internalServerError,
  user: state.user.userDetails,
  loading: state.loading,
  snack: state.snack || { message: '' },
});

export const mapDispatchToProps = (dispatch: any) => ({
  getUserDetails: () => dispatch(getUserDetails()),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
