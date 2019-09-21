import * as React from 'react';

// interfaces
import { HomePageProps, HomePageState } from './interfaces';

// styles
import './HomePage.scss';

export class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h2>Welcome to Almond</h2>
      </React.Fragment>
    );
  }
}

export default HomePage;
