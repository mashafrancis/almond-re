// react library
import * as React from 'react';

// third-party libraries
import { Link, NavLink } from 'react-router-dom';

// styles
import './PageNotFound.scss';

// Interfaces
import { PageNotFoundProps } from './interfaces';

/**
 * Renders the page not found error message
 *
 * @returns {JSX}
 */
const PageNotFound: React.SFC<PageNotFoundProps> = () =>  (
  <div id="notfound">
    <div className="notfound">
      <div className="notfound-404"/>
      <h1>404</h1>
      <h2>Oops! Page Not Be Found</h2>
      <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily
        unavailable</p>
      <NavLink to={'/'}>
        <button className="mdc-button mdc-button--raised">
          <span className="mdc-button__label">Back to homepage</span>
        </button>
      </NavLink>
    </div>
  </div>
);

export default PageNotFound;
