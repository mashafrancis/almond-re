// react libraries
import * as React from 'react';

// third party libraries
// import * as fs from 'fs';
import * as path from 'path';
import * as queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import * as firebase from "firebase";
import { Connector } from 'mqtt-hooks';

const KEY = process.env.KEY as string;
const CERT = process.env.CERT as string;
const TRUSTED_CA = process.env.TRUSTED_CA as string;

// components
import {
  firebaseConfig,
  reactReduxFirebaseConfig
} from "@utils/helpers/firebase";
import store from "../store";
import ErrorBoundary from '@components/ErrorBoundary';
import SnackBar from '@components/SnackBar';
import Routes from '../routes';
import LinearProgressBar from "@components/LinearProgressBar";
import { Transition } from 'react-transition-group';
import { Fade } from "@material-ui/core";

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
    loading: 'idle',
    isAdmin: false,
  });
  const timerRef = React.useRef<number>();

  const {
    user,
    loading
  } = props;

  useEffectAsync(async () => {
    firebase.initializeApp(firebaseConfig);
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

  const bufferKey = Buffer.from(KEY, 'utf-8');
  const bufferCert = Buffer.from(CERT, 'utf-8');
  const bufferCA = Buffer.from(TRUSTED_CA, 'utf-8');

  const options = {
    port: 8083,
    host: process.env.MQTT_HOST,
    user: process.env.MQTT_USER,
    protocol: process.env.MQTT_PROTOCOL,
    password: process.env.MQTT_PASSWORD,
    key: bufferKey,
    cert: bufferCert,
    ca: bufferCA,
    rejectUnauthorized: true
  };

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
    <ReactReduxFirebaseProvider
      firebase={firebaseConfig}
      config={reactReduxFirebaseConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
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
            <Connector opts={options}>
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
            </Connector>
          </ViewportProvider>
        </MenuProvider>
      </UserContext.Provider>
    </ReactReduxFirebaseProvider>
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
