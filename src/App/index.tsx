// react libraries
import * as React from 'react';

// third party libraries
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
  });

  React.useEffect(() => {
    const user = authService.getUser();

    if (state.isUserAuthenticated) {
      try {
        props.getUserDetails(user.userdata.id)
          .then(() => setState({ ...state, isGettingUserDetails: false }));
      } catch {
        setState({ ...state, isGettingUserDetails: false });
      }
    }
  },              []);

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
  user: state.user,
});

export const mapDispatchToProps = dispatch => ({
  getUserDetails: userId => dispatch(getUserDetails(userId)),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
