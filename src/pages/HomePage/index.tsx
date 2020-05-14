import { UserContext } from '@utils/context/Context';
import * as React from 'react';

// thunks
import { displaySnackMessage } from '@modules/snack';

// third party apps
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// interfaces
import { HomePageProps } from './interfaces';

// helpers
import { authService } from '@utils/auth';
import isArrayNotNull from "@utils/helpers/checkArrayEmpty";

// styles
import './HomePage.scss';
import Logo from "@components/Logo";

const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
  const user = React.useContext(UserContext);
  const { devices } = user;
  const handleLogin = () => window.location.replace(`${process.env.ALMOND_API}/auth/google`);

  const renderGoToDashboard = () => (
    <React.Fragment>
      {authService.isAuthenticated()
      ?
        <NavLink to={isArrayNotNull(devices) ? '/dashboard' : '/my-device'}>
          <button className="mdc-button mdc-button--raised">
            <span className="mdc-button__label">Go to dashboard</span>
          </button>
        </NavLink>
      :
        <button className="mdc-button mdc-button--raised" onClick={handleLogin}>
          <span className="mdc-button__label">Login with Google</span>
        </button>
      }
    </React.Fragment>
  );

  return (
    <div className="background-cover">
      <main className="home-cover">
        <section className="logo">
          <Logo />
        </section>
        <section className="home-image">
          <div className="image-wrapper">
            <img src="https://res.cloudinary.com/almondgreen/image/upload/v1576510738/Almond/homepage_e7ugfb.svg"
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
    </div>
  );
};

export const mapStateToProps = state => ({
  isLoading: state.isLoading,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
