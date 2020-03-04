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
import { ViewportProvider } from '../hooks';
import Routes from '../routes';

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

// styles
import './App.scss';

export class App extends React.Component<AppProps, AppState> {
  state = {
    isUserAuthenticated: authService.isAuthenticated(),
    isFetchingUserDetails: true,
    isAdmin: false,
  };

  async componentDidMount() {
    initializeGA();
    logPageView(window.location.pathname);

    if (this.state.isUserAuthenticated) {
      try {
        await this.props.getUserDetails();
        this.setState({ isFetchingUserDetails: false });

      } catch {
        this.setState({
          isFetchingUserDetails: false,
        });
      }
    }

    const { location: { search } } = this.props;
    const { socialToken } = queryString.parse(search);
    if (socialToken) {
      authService.saveToken(socialToken);
      window.location.replace(process.env.PUBLIC_URL);
    }

    this.setState({ isAdmin: !checkUserRole(this.props.user.currentRole.title, 'User') });
  }

  render() {
    const checkUserDetailsAndAuthentication = (
      hasFetchedUserDetails: boolean,
      isUserAuthenticated: boolean) => (hasFetchedUserDetails && isUserAuthenticated);

    const { isUserAuthenticated, isFetchingUserDetails, isAdmin } = this.state;
    const {
      _id,
      name,
      email,
      photo,
      isVerified,
      devices,
      activeDevice,
    } = this.props.user;

    return (checkUserDetailsAndAuthentication(isFetchingUserDetails, isUserAuthenticated) ? <Loader/> :
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
      </UserContext.Provider>
    );
  }
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
