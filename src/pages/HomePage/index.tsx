import * as React from 'react';
import { connect } from 'react-redux';

// thunks
import { displaySnackMessage } from 'modules/snack';

// third party apps
import { NavLink } from 'react-router-dom';

// interfaces
import { HomePageProps} from './interfaces';

// helpers
import { authService } from 'utils/auth';

// styles
import './HomePage.scss';

const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
  const handleLogin = () => {
    window.location.replace(process.env.SOCIAL_AUTH_URL);
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
        <button className="mdc-button mdc-button--raised" onClick={handleLogin}>
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
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
