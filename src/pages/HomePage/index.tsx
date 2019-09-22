import * as React from 'react';

// interfaces
import { HomePageProps, HomePageState } from './interfaces';

// styles
import './HomePage.scss';

const HomePage: React.FunctionComponent<HomePageProps> = () => {
  return (
    <React.Fragment>
      <main className="cover">
        {/*<div className="top-component"/>*/}
        {/*<div className="bottom-component"/>*/}
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
              <button className="mdc-button mdc-button--raised">
                <span className="mdc-button__label">Go to dashboard</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default HomePage;
