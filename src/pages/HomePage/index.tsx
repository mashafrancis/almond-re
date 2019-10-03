import * as React from 'react';
import { connect } from 'react-redux';

// thunks
import { displaySnackMessage } from '../../store/modules/snack';
import {
  socialAuthentication,
  socialAuthSuccess
} from '../../store/modules/socialAuth';

// third party apps
import { NavLink } from 'react-router-dom';

// interfaces
import { HomePageProps, HomePageState } from './interfaces';

// utils
import { auth, GoogleProvider } from '../../utils/firebase';

// types
import { SOCIAL_GOOGLE_PROVIDER } from '../../store/modules/socialAuth/types';

// helpers
import { authService } from '../../utils/auth';

// styles
import './HomePage.scss';

const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
  const [state, setState] = React.useState<HomePageState>({
    isLoading: false,
  });

  const getSocialAuthData = () => {
    auth
      .signInWithPopup(GoogleProvider)
      .then(response => ({
        type: SOCIAL_GOOGLE_PROVIDER,
        payload: {
          authData: {
            provider: 'google-oauth2',
            accessToken: response.credential.accessToken,
            accessSecret: response.credential.secret,
            idToken: response.credential.idToken,
            refreshToken: response.user.refreshToken,
          },
          userDetails: {
            name: response.user.displayName,
            photo: response.user.photoURL,
            email: response.user.email,
            isNewUser: response.additionalUserInfo.isNewUser,
          },
        },
      }))
      .then((response) => {
        const { authData } = response.payload;
        const { userDetails } = response.payload;

        const tokenPayload: any = {};
        tokenPayload.provider = authData.provider;
        tokenPayload.id_token = authData.idToken;

        const payload: any = {};
        payload.authData = tokenPayload;
        payload.userDetails = userDetails;
        if (response.payload.userDetails.isNewUser) {
          props.socialAuthentication(payload);
        }
        authService.saveToken(authData.idToken);
        props.displaySnackMessage('You have successfully logged in.');
        window.location.replace('/water-cycles');
      })
      .catch((error) => {
        const errorMessage = error.message;
        props.displaySnackMessage(errorMessage);
      });
  };

  const renderGoToDashboard = () => (
    <React.Fragment>
      {authService.isAuthenticated()
      ?
        <NavLink to={'/water-cycles'}>
          <button className="mdc-button mdc-button--raised">
            <span className="mdc-button__label">Go to dashboard</span>
          </button>
        </NavLink>
      :
        <button className="mdc-button mdc-button--raised" onClick={getSocialAuthData}>
          <span className="mdc-button__label">Login with Google</span>
        </button>
      }
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <main className="home-cover">
        <section className="logo">
          <img src="https://res.cloudinary.com/almondgreen/image/upload/v1569118232/Almond/logo1_ifvhvk.png"
               alt="Logo"/>
        </section>
        <section className="home-image">
          <div className="image-wrapper">
            <img src="https://res.cloudinary.com/almondgreen/image/upload/v1569235553/Almond/analyze_dqyrcp.svg"
                 alt="Almond Image"/>
          </div>
        </section>
        <section id="hero">
          <div className="hero-container">
            <div className="hero-info">
              <h1>We have an idea!</h1>
              <h1>Grow hydroponically.</h1>
              <h2>Focusing on the safe production of fresh produce.</h2>
              {renderGoToDashboard()}
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export const mapStateToProps = state => ({
  isLoading: state.isLoading,
});

export const mapDispatchToProps = dispatch => ({
  socialAuthentication: payload => dispatch(socialAuthentication(payload)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
