// react libraries
import * as React from 'react';

// third party
import { Link, NavLink } from 'react-router-dom';

// styles
import './InternalServerError.scss';

const InternalServerErrorMessage: (props) => any = (props) => {
  return (
    <div id="internal-server-error">
      <div className="server-error">
        <div className="server-error-500"/>
        <h1>500</h1>
        <h2>Sorry. It is not you. It is us.</h2>
        <p>We are experiencing an internal server problem.</p>
        <p>Please try again later or contact support <span className="mail">almond.froyo@gmail.com</span></p>
        <NavLink to={'/'}>
          <button className="mdc-button mdc-button--raised">
            <span className="mdc-button__label">Back to homepage</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default InternalServerErrorMessage;
